/**
 * Supabase Client Initializer
 * Connects to Supabase using public anonymous credentials.
 * Automatically detects whether live credentials have been configured.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null;

if (!isSupabaseConfigured && process.env.NODE_ENV !== 'production') {
  console.info(
    'ℹ️ [ImPlinx] Live Supabase environment variables not configured. The app will run in Interactive Demo / Preview Mode. Add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to .env for production database sync.'
  );
}
