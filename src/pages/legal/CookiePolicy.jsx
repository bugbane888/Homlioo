import React, { useEffect } from "react";
import PageTransition from "../../components/common/PageTransition";
import Logo from "../../components/common/Logo";

const CookiePolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="bg-[#F8F7F4] dark:bg-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700">
          
          <div className="bg-brand-navy p-10 text-white text-center relative overflow-hidden">
            <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-brand-purple rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
            <div className="relative z-10 flex justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-3xl font-[900] tracking-tight relative z-10">COOKIE POLICY</h1>
            <p className="text-brand-amber font-bold tracking-widest uppercase text-xs mt-4 relative z-10">
              How we use cookies
            </p>
          </div>

          <div className="p-8 sm:p-12 text-slate-600 dark:text-slate-300 space-y-6 text-sm leading-relaxed">
            <p className="font-bold text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              HOMLiOO uses cookies and similar technologies to improve your browsing experience.
            </p>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">1. What are Cookies?</h2>
              <p>Cookies are small text files placed on your device to help the site remember your preferences and activities over time.</p>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">2. Essential Cookies</h2>
              <p>We use essential cookies for platform security, user authentication (Supabase), and maintaining your active session. These cannot be disabled.</p>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">3. Analytics & Preferences</h2>
              <p>We may use cookies to remember your location preferences, recent searches, and compare lists to make your subsequent visits faster and more relevant.</p>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CookiePolicy;
