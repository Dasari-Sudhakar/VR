import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import apiClient from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('vr_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser({ id: decoded.id, role: decoded.role, name: decoded.name });
        } else {
          localStorage.removeItem('vr_token');
        }
      } catch (_error) {
        localStorage.removeItem('vr_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (payload) => {
    const { data } = await apiClient.post('/auth/login', payload);
    localStorage.setItem('vr_token', data.token);
    setUser(data.user);
  };

  const signup = async (payload) => {
    const { data } = await apiClient.post('/auth/register', payload);
    localStorage.setItem('vr_token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('vr_token');
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, signup, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
