import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import PageTransition from "../../components/common/PageTransition";

const Callback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Parse both query params and hash fragment
        const urlParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(
          window.location.hash.replace("#", "?")
        );

        const code = urlParams.get("code");
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const errorParam = urlParams.get("error") || hashParams.get("error");
        const errorDescription =
          urlParams.get("error_description") ||
          hashParams.get("error_description");
        const next = urlParams.get("next") || "/";

        // Case 1: Supabase returned an explicit error in the URL
        if (errorParam) {
          throw new Error(errorDescription || errorParam);
        }

        // Case 2: PKCE flow — code in query params (most common for email confirmation)
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          setStatus("success");
          setTimeout(() => navigate(next), 1500);
          return;
        }

        // Case 3: Implicit/token flow — tokens in hash fragment
        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;
          setStatus("success");
          setTimeout(() => navigate(next), 1500);
          return;
        }

        // Case 4: No code or token — check if Supabase already set a session
        // (can happen if the SDK auto-processed the hash before we did)
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setStatus("success");
          setTimeout(() => navigate(next), 1500);
          return;
        }

        // If we reach here, something unexpected happened
        throw new Error(
          "Verification link is invalid or has expired. Please request a new one."
        );
      } catch (err) {
        console.error("Auth callback error:", err);
        setErrorMsg(err.message);
        setStatus("error");
        setTimeout(() => navigate("/login"), 4000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-2xl max-w-md w-full text-center border border-slate-100 dark:border-slate-700">
          {status === "error" ? (
            <>
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-[900] text-red-500 mb-2">Verification Failed</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{errorMsg}</p>
              <p className="text-xs mt-6 text-slate-400 font-bold uppercase tracking-wider">
                Redirecting to login...
              </p>
            </>
          ) : status === "success" ? (
            <>
              <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-[900] text-emerald-600 mb-2">Email Verified!</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Your account is confirmed. Redirecting you to HOMLiOO...
              </p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-2">
                Verifying your email
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Please wait while we confirm your account...
              </p>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Callback;
