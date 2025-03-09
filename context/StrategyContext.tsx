"use client"
import React, { createContext, useContext, useState } from 'react';

// Match the structure from your mockStrategies data
export interface Strategy {
  id: string;
  name: string;
  description: string;
  category: string;
  is_active: boolean;
  three_months_return: number;
  three_months_volatility: number;
  three_months_sharpe: number;
  three_months_max_drawdown: number;
  three_months_sortino: number;
  three_months_calmar: number;
  six_months_return: number;
  six_months_volatility: number;
  six_months_sharpe: number;
  six_months_max_drawdown: number;
  six_months_sortino: number;
  six_months_calmar: number;
  one_year_return: number;
  one_year_volatility: number;
  one_year_sharpe: number;
  one_year_max_drawdown: number;
  one_year_sortino: number;
  one_year_calmar: number;
  created_at: string;
  updated_at: string;
}

interface StrategyContextType {
  selectedStrategy: Strategy | null;
  setSelectedStrategy: (strategy: Strategy | null) => void;
}

const StrategyContext = createContext<StrategyContextType | undefined>(undefined);

export const StrategyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);

  return (
    <StrategyContext.Provider
      value={{
        selectedStrategy,
        setSelectedStrategy
      }}
    >
      {children}
    </StrategyContext.Provider>
  );
};

export const useStrategy = () => {
  const context = useContext(StrategyContext);
  if (!context) {
    throw new Error('useStrategy must be used within a StrategyProvider');
  }
  return context;
}; 