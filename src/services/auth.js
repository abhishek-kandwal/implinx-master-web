/**
 * ImPlinx Authentication Service
 * Wraps Supabase Auth and provides safe fallbacks for demo/local evaluation.
 */

import { supabase, isSupabaseConfigured } from './supabase';

const DEMO_USER_KEY = 'implinx_demo_user';

export const authService = {
  isConfigured: () => isSupabaseConfigured,

  /**
   * Get current authenticated session
   */
  async getSession() {
    if (!isSupabaseConfigured) {
      const demoData = localStorage.getItem(DEMO_USER_KEY);
      if (demoData) {
        try {
          const user = JSON.parse(demoData);
          return { session: { user, access_token: 'demo-token' }, error: null };
        } catch (e) {
          localStorage.removeItem(DEMO_USER_KEY);
        }
      }
      return { session: null, error: null };
    }

    try {
      const { data, error } = await supabase.auth.getSession();
      return { session: data?.session, error };
    } catch (err) {
      return { session: null, error: err };
    }
  },

  /**
   * Sign in with Email and Password
   */
  async signInWithPassword(email, password) {
    if (!isSupabaseConfigured) {
      // Local demo account
      const demoUser = {
        id: 'usr_demo_8823',
        email,
        user_metadata: {
          full_name: email.split('@')[0] || 'Demo Explorer',
          avatar_url: ''
        },
        plan: 'free',
        is_demo: true,
        created_at: new Date().toISOString()
      };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
      return { user: demoUser, session: { user: demoUser, access_token: 'demo-token' }, error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { user: data?.user, session: data?.session, error };
  },

  /**
   * Sign up new user
   */
  async signUp(email, password, fullName = '') {
    if (!isSupabaseConfigured) {
      const demoUser = {
        id: 'usr_demo_' + Math.random().toString(36).substring(2, 9),
        email,
        user_metadata: {
          full_name: fullName || email.split('@')[0],
          avatar_url: ''
        },
        plan: 'free',
        is_demo: true,
        created_at: new Date().toISOString()
      };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
      return { user: demoUser, session: { user: demoUser, access_token: 'demo-token' }, error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });
    return { user: data?.user, session: data?.session, error };
  },

  /**
   * Continue with Google OAuth
   */
  async signInWithGoogle() {
    if (!isSupabaseConfigured) {
      const demoUser = {
        id: 'usr_google_demo',
        email: 'alex.chen@example.com',
        user_metadata: {
          full_name: 'Alex Chen',
          avatar_url: ''
        },
        plan: 'pro',
        is_demo: true,
        created_at: new Date().toISOString()
      };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
      return { user: demoUser, session: { user: demoUser, access_token: 'demo-token' }, error: null };
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/app/dashboard`
      }
    });
    return { data, error };
  },

  /**
   * Sign out
   */
  async signOut() {
    localStorage.removeItem(DEMO_USER_KEY);
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    return { error: null };
  },

  /**
   * Password Reset Request
   */
  async requestPasswordReset(email) {
    if (!isSupabaseConfigured) {
      return { error: null };
    }
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    return { data, error };
  },

  /**
   * Reset / Update Password
   */
  async updatePassword(newPassword) {
    if (!isSupabaseConfigured) {
      return { error: null };
    }
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    return { data, error };
  },

  /**
   * Login as Interactive Demo Account for effortless evaluator testing
   */
  loginAsDemoUser(plan = 'pro') {
    const demoUser = {
      id: 'usr_demo_implinx',
      email: 'alex.chen@example.com',
      user_metadata: {
        full_name: 'Alex Chen',
        avatar_url: ''
      },
      plan: plan,
      is_demo: true,
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    return demoUser;
  }
};
