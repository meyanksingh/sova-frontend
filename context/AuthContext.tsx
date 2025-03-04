"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isBrokerAuthenticated: boolean;
  isLoading: boolean;
  login: (user: string) => void;
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
    const user = localStorage.getItem('user');
    const brokerId = localStorage.getItem('brokerId');
    console.log('AuthContext: Checking localStorage for user:', user);
    console.log('AuthContext: Checking localStorage for broker:', brokerId);
    setIsAuthenticated(!!user);
    setIsBrokerAuthenticated(!!brokerId);
    console.log('AuthContext: Setting isAuthenticated to:', !!user);
    console.log('AuthContext: Setting isBrokerAuthenticated to:', !!brokerId);
    setIsLoading(false);
  }, []);

  const login = (user: string) => {
    console.log('AuthContext: Logging in user:', user);
    localStorage.setItem('user', user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log('AuthContext: Logging out user');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  const brokerLogin = (brokerId: string) => {
    console.log('AuthContext: Logging in broker:', brokerId);
    localStorage.setItem('brokerId', brokerId);
    setIsBrokerAuthenticated(true);
  };

  const brokerLogout = () => {
    console.log('AuthContext: Logging out broker');
    localStorage.removeItem('brokerId');
    setIsBrokerAuthenticated(false);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        isBrokerAuthenticated,
        isLoading, 
        login, 
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