import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase credentials. Please add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to your .env file and restart the development server.'
  );
}

// Fallback to a dummy URL to prevent `createClient` from throwing a fatal synchronous error
// that crashes the entire React application before it can even mount.
const safeUrl = supabaseUrl || 'https://dummy-url-to-prevent-crash.supabase.co';
const safeKey = supabaseAnonKey || 'dummy-key';

// Global timeout (ms) for every Supabase network request.
// If Supabase does not respond within this time, the request is aborted
// and a clear error is thrown instead of hanging the UI indefinitely.
const SUPABASE_TIMEOUT_MS = 10000;

/**
 * Custom fetch wrapper that aborts the request after SUPABASE_TIMEOUT_MS.
 * This covers ALL Supabase calls: auth (login/signup), DB queries,
 * storage uploads, and RPC functions — no per-service patching needed.
 */
const fetchWithTimeout = (url, options = {}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SUPABASE_TIMEOUT_MS);

  return fetch(url, { ...options, signal: controller.signal })
    .then((response) => {
      clearTimeout(timer);
      return response;
    })
    .catch((err) => {
      clearTimeout(timer);
      if (err.name === 'AbortError') {
        throw new Error(
          'Request timed out. The server is taking too long to respond. Please try again.'
        );
      }
      throw err;
    });
};

export const supabase = createClient(safeUrl, safeKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: fetchWithTimeout,
  },
});

export default supabase;
