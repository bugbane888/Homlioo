import React, { useEffect } from "react";
import PageTransition from "../../components/common/PageTransition";
import Logo from "../../components/common/Logo";

const TermsAndConditions = () => {
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
            <h1 className="text-3xl font-[900] tracking-tight relative z-10">TERMS & CONDITIONS</h1>
            <p className="text-brand-amber font-bold tracking-widest uppercase text-xs mt-4 relative z-10">
              Platform Usage Agreement
            </p>
          </div>

          <div className="p-8 sm:p-12 text-slate-600 dark:text-slate-300 space-y-6 text-sm leading-relaxed">
            <p className="font-bold text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              Welcome to HOMLiOO. By accessing our platform, you agree to these Terms and Conditions. Please read them carefully.
            </p>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">1. General Overview</h2>
              <p>HOMLiOO is a verified PG discovery platform. We do not own or manage the properties listed. We connect students with PG owners.</p>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">2. User Responsibilities</h2>
              <p>Users must provide accurate information when registering and must not misuse platform data. PG owners are responsible for the accuracy of their property listings and availability.</p>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">3. Disclaimers</h2>
              <p>While HOMLiOO verifies properties visually during onboarding, we are not responsible for any disputes, financial transactions, or agreements made directly between the student and PG owner outside the platform.</p>
            </section>

            <section>
              <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-4">4. Governing Law</h2>
              <p>These terms are governed by the laws of India. Disputes will be handled in Greater Noida, Uttar Pradesh.</p>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TermsAndConditions;
