"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";

interface MarketData {
  name: string;
  value: number;
  change: number;
}

interface MarketUpdate {
  type: string;
  data: {
    MessageCode: number;
    ExchangeInstrumentID: number;
    LastTradedPrice: number;
    PercentChange: number;
  };
}

interface WebSocketMessage {
  action: string;
  room: string;
}

const INSTRUMENT_MAP: { [key: number]: string } = {
  26000: "NIFTY",
  26001: "BANKNIFTY",
  26034: "FINNIFTY",
  26003: "NIFTY IT",
};

interface MarketDataContextType {
  marketData: MarketData[];
  isConnected: boolean;
  setMarketData: React.Dispatch<React.SetStateAction<MarketData[]>>;
}

const MarketDataContext = createContext<MarketDataContextType>({
  marketData: [],
  isConnected: false,
  setMarketData: () => {},
});

export function MarketDataProvider({ children }: { children: ReactNode }) {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { name: "NIFTY", value: 0.00, change: 0.00 },
    { name: "BANKNIFTY", value: 0.00, change: 0.00 },
    { name: "FINNIFTY", value: 0.00, change: 0.00 },
    { name: "NIFTY IT", value: 0.00, change: 0.00 },
  ]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  const processMarketUpdate = (update: MarketUpdate) => {
    if (update.data.MessageCode === 1512) {
      const indexName = INSTRUMENT_MAP[update.data.ExchangeInstrumentID];
      if (indexName) {
        setMarketData(prevData =>
          prevData.map(item =>
            item.name === indexName
              ? {
                  ...item,
                  value: update.data.LastTradedPrice,
                  change: update.data.PercentChange
                }
              : item
          )
        );
      }
    }
  };

  const connectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
    }

    const ws = new WebSocket("ws://api.meyank.me/");
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      console.log("Websocket Connected")
      ws.send(JSON.stringify({ action: "join", room: "market-data" }));
    };

    ws.onmessage = (event) => {
      try {
        const data: MarketUpdate = JSON.parse(event.data);
        processMarketUpdate(data);
      } catch (error) {
        console.error("WebSocket data processing error:", error);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      wsRef.current = null;
    };
  };

  useEffect(() => {
    connectWebSocket();
    const reconnectInterval = setInterval(() => {
      if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
        connectWebSocket();
      }
    }, 5000);

    return () => {
      clearInterval(reconnectInterval);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <MarketDataContext.Provider value={{ marketData, isConnected, setMarketData }}>
      {children}
    </MarketDataContext.Provider>
  );
}

export const useMarketData = () => {
  const context = useContext(MarketDataContext);
  if (!context) {
    throw new Error("useMarketData must be used within a MarketDataProvider");
  }
  return context;
};
