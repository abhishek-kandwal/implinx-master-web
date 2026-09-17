import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import { authService } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const { session: currentSession } = await authService.getSession();
        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user || null);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    initAuth();

    // If Supabase is connected, listen to state changes
    let subscription = null;
    if (isSupabaseConfigured && supabase) {
      const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
        if (mounted) {
          setSession(newSession);
          setUser(newSession?.user || null);
          setIsLoading(false);
        }
      });
      subscription = data?.subscription;
    }

    return () => {
      mounted = false;
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await authService.signInWithPassword(email, password);
      if (res.user) {
        setUser(res.user);
        setSession(res.session);
      }
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email, password, fullName) => {
    setIsLoading(true);
    try {
      const res = await authService.signUp(email, password, fullName);
      if (res.user) {
        setUser(res.user);
        setSession(res.session);
      }
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    return authService.signInWithGoogle();
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.signOut();
      setUser(null);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = (plan = 'pro') => {
    const demoUser = authService.loginAsDemoUser(plan);
    setUser(demoUser);
    setSession({ user: demoUser, access_token: 'demo-token' });
    return demoUser;
  };

  const updateUserPlan = (newPlan) => {
    if (!user) return;
    const updated = { ...user, plan: newPlan };
    setUser(updated);
    if (user.is_demo) {
      localStorage.setItem('implinx_demo_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated: Boolean(user),
        isConfigured: isSupabaseConfigured,
        isDemo: Boolean(user?.is_demo),
        login,
        signup,
        loginWithGoogle,
        logout,
        loginAsDemo,
        updateUserPlan
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
