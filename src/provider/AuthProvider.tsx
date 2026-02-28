import { useState, type ReactNode } from 'react';
import type { AuthContextType, User } from '../types/user';
import { AuthContext } from './AuthContext';
import { useDispatch } from 'react-redux';
import { clearAuth, setAuth } from '../store/userSlice';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const dispatch = useDispatch();

  const login = async (email: string, password: string) => {
    const response = await fetch(import.meta.env.VITE_API_KEY + '/me/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    const actualData = data.data;
    localStorage.setItem('token', actualData.token);

    const userData: User = {
      id: actualData.id,
      name: actualData.name,
      email: actualData.email,
      role: actualData.role,
      token: actualData.token,
    };

    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    dispatch(setAuth({ user: userData, token: actualData.token }));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    dispatch(clearAuth());
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
    isAdmin: user?.role === 'admin',
    token: user?.token || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
