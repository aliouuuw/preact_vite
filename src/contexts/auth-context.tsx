import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSession, logout, login } from '@/lib/auth-client';
import { router } from '@/app/router';

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: (formData: FormData) => Promise<any>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const session = await getSession();
      if (session?.user) {
        setUser(session.user);
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.navigate({ to: '/' });
  };

  const handleLogin = async (formData: FormData) => {
    const result = await login(formData);
    if (result.success && result.user) {
      setUser(result.user);
    }
    return result;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      logout: handleLogout,
      login: handleLogin,
      refreshUser: loadUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useRequireAuth(role?: 'admin') {
  const { user, loading } = useAuth();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.navigate({ 
          to: '/login',
          search: { unauthorized: true }
        });
        return;
      }
      
      if (role === 'admin' && user.role !== 'admin') {
        router.navigate({ to: '/' });
        return;
      }
      
      setAuthorized(true);
    }
  }, [user, loading, role]);

  return { loading, authorized };
} 