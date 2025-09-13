import React, { createContext, useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

interface AuthContextType {
  token: string | null;
  role: string | null;
  login: (token: string) => void;
  logout: () => void;
  authFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface DecodedToken {
  role: string;
  exp: number;
  [key: string]: any;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      handleToken(stored);
    }
  }, []);

  const handleToken = (t: string) => {
    setToken(t);
    localStorage.setItem('token', t);
    try {
      const decoded: DecodedToken = jwtDecode(t);
      setRole(decoded.role);
    } catch {
      setRole(null);
    }
  };

  const login = (t: string) => handleToken(t);

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
  };

  const authFetch = async (input: RequestInfo, init: RequestInit = {}) => {
    const headers = new Headers(init.headers);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    const response = await fetch(input, { ...init, headers });
    if (response.status === 401 || response.status === 403) {
      logout();
    }
    return response;
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
