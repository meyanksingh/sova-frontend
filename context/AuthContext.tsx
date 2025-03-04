"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout, brokerLogin as apiBrokerLogin } from '@/lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  isBrokerAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  brokerLogin: (brokerId: string) => void;
  brokerLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isBrokerAuthenticated, setIsBrokerAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const brokerId = localStorage.getItem('brokerId');
    setIsAuthenticated(!!token);
    setIsBrokerAuthenticated(!!brokerId);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);
      console.log(response)
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await apiRegister(name, email, password);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    apiLogout();
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const brokerLogin = async () => {
    const response = await apiBrokerLogin();
    console.log(response)
    localStorage.setItem('interactive-token', response.data.result.token);
    localStorage.setItem('userID', response.data.result.userID);
    setIsBrokerAuthenticated(true);
  };

  const brokerLogout = () => {
    localStorage.removeItem('interactive-token');
    localStorage.removeItem('userID');
    setIsBrokerAuthenticated(false);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        isBrokerAuthenticated,
        isLoading, 
        login,
        register,
        logout,
        brokerLogin,
        brokerLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};