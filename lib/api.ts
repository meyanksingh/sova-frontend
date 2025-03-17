import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (token) {
      config.headers["Authorization"] = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token")
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  },
)

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password })
    localStorage.setItem("token", response.data.token)
    return response.data
  } catch (error) {
    throw error
  }
}

export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post("/auth/register", { name, email, password })
    return response.data
  } catch (error) {
    throw error
  }
}

export const logout = () => {
  localStorage.removeItem("token")
}

export const getStrategies = async () => {
  try {
    const response = await api.get("/user/strategy")
    // Handle the nested response structure
    if (response.data?.data?.data) {
      return response.data.data.data
    }
    return []
  } catch (error) {
    console.error("Error fetching strategies:", error)
    throw error
  }
} 

export const getNews = async () => {
  try {
    const response = await api.get("/user/latest-news")
    return response.data
  } catch (error) {
    console.error("Error fetching news:", error)
    throw error
  }
}

export const getFiiData = async () => {
  try {
    const response = await api.get("/user/fii-data")
    return response.data
  } catch (error) {
    console.error("Error fetching FII data:", error)
    throw error
  }
}

// now these are endpoint required broker login and broker token

export const brokerLogin = async () => {
  try {
    const response = await api.post("/broker/interactivelogin", { 
      secretKey: "Jlrj383@p3",
      appKey: "4537b277296cacff1e6542",
      source: "WebAPI"
    })
    return response.data
  } catch (error) {
    throw error
  }
}

// now i need to create broker endpoint which requuired interactive token in the header first is getpositions
export const getPositions = async () => {
  try {
    const interactiveToken = localStorage.getItem("interactive-token");
    const authToken = localStorage.getItem("token");

    if (!interactiveToken || !authToken) {
      throw new Error("Missing authentication tokens");
    }

    const response = await api.get("/user/positions", {
      headers: {
        "interactive-token": interactiveToken,
        "Authorization": `${authToken}`, 
      },
    });

    return response.data
  } catch (error) {
    console.error("Error fetching positions:", error);
    throw error; 
  }
};

export const getOrderBook = async () => {
  try {
    const authToken = localStorage.getItem("token");
    const interactiveToken = localStorage.getItem("interactive-token");
    const response = await api.get("/user/orderbook", {
      headers: {
        "Authorization": `${authToken}`,
        "interactive-token": interactiveToken,
      },
    });
    return response.data
  } catch (error) {
    throw error
  }
}


export const getMargin = async () => {
  try {
    const authToken = localStorage.getItem("token");
    const interactiveToken = localStorage.getItem("interactive-token");
    const response = await api.get("/user/funds", {
      headers: {
        "Authorization": `${authToken}`,
        "interactive-token": interactiveToken,
      },
    });
    return response.data
  } catch (error) {
    throw error
  }
}

export const getHoldings = async () => {
  try {
    const authToken = localStorage.getItem("token");
    const interactiveToken = localStorage.getItem("interactive-token");
    const response = await api.get("/user/holdings", { 
      headers: {
        "Authorization": `${authToken}`,
        "interactive-token": interactiveToken,
      },
    });
    return response.data
  } catch (error) {
    throw error
  } 
}



export const deployStrategy = async (strategy_id: string) => {
  try {
    const authToken = localStorage.getItem("token");
    const interactiveToken = localStorage.getItem("interactive-token");
    const response = await api.post("/user/deploy", {
      strategy_id: strategy_id,
    }, {
      headers: {
        "Authorization": `${authToken}`,
        "interactive-token": interactiveToken,
      },
    });
    return response.data
  } catch (error) {
    console.error("Error deploying strategy:", error);
    throw error;
  }
}

export default api

