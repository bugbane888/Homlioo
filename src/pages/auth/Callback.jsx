import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import PageTransition from "../../components/common/PageTransition";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      // 1. Extract the code query parameter from the URL
      const code = searchParams.get("code");
      
      if (code) {
        try {
          // 2. Complete the OAuth / Email PKCE flow
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          // 3. Redirect to next path or home on success
          const next = searchParams.get("next") || "/";
          navigate(next);
        } catch (err) {
          console.error("Auth callback error:", err);
          setError(err.message);
          // 4. Redirect to login on failure
          setTimeout(() => navigate("/login?error=auth_failed"), 3000);
        }
      } else {
        // If there's no code, it might be an implicit flow hash fragment (e.g. #access_token)
        // which Supabase JS handles automatically. We can safely redirect.
        const next = searchParams.get("next") || "/";
        setTimeout(() => navigate(next), 1500);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-2xl max-w-md w-full text-center border border-slate-100 dark:border-slate-700">
          {error ? (
            <>
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-[900] text-red-500 mb-2">Authentication Error</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">{error}</p>
              <p className="text-xs mt-6 text-slate-400 font-bold uppercase tracking-wider">Redirecting to login...</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-2">Verifying your email</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Please wait while we complete your authentication...</p>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Callback;
