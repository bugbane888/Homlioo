import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Button from "../../components/common/Button";
import PageTransition from "../../components/common/PageTransition";

import { User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

const Signup = () => {
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return showToast("Passwords do not match.", "error");
    }
    if (formData.password.length < 6) {
      return showToast("Password must be at least 6 characters.", "error");
    }

    setIsLoading(true);
    const result = await signup(formData.email, formData.password, formData.name);
    setIsLoading(false);

    if (result?.success) {
      showToast("Registration successful! Please check your email to verify your account.", "success");
      navigate("/login");
    } else {
      const errorMsg = result?.error?.toLowerCase() || "";
      if (errorMsg.includes("already registered") || errorMsg.includes("already exists")) {
        showToast("This email is already registered. Please log in instead.", "error");
        setTimeout(() => navigate("/login"), 2500);
      } else {
        showToast(result?.error || "Registration failed. Please try again.", "error");
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-white dark:bg-slate-900 transition-colors">
        
        {/* LEFT COLUMN - BRANDING (Hidden on Mobile) */}
        <div className="hidden lg:flex w-1/2 bg-[#0F2133] text-white flex-col justify-between p-12 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-purple rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-amber rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-3">
            <Link to="/" className="inline-block hover:scale-105 transition-transform">
              <div className="flex flex-col items-center gap-2">
                <img src="/homlioo-logo.png" alt="HOMLiOO" className="w-28 h-28 object-contain drop-shadow-2xl" />
                <span className="text-3xl font-[900] tracking-tight leading-none">
                  <span className="text-blue-400">HOM</span><span className="text-green-400">LiOO</span>
                </span>
                <span className="text-white/50 text-xs font-bold tracking-widest uppercase">Smart PG Search</span>
              </div>
            </Link>
          </div>

          <div className="relative z-10 max-w-lg mb-20">
            <span className="text-brand-amber text-xs font-black uppercase tracking-[0.4em] mb-4 block">
              Join The Community
            </span>
            <h1 className="text-5xl lg:text-6xl font-[900] mb-6 leading-tight tracking-tighter">
              Find your next <br/> <span className="text-brand-purple">sanctuary.</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg leading-relaxed">
              Create an account to save favorite properties, contact PG owners directly, and seamlessly manage your living experience.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-6 text-slate-400 text-sm font-bold">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-purple"><ShieldCheck size={16} /></div>
              <span>100% physically verified listings.</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-amber"><ShieldCheck size={16} /></div>
              <span>Zero brokerage or hidden fees.</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - FORM */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
          <div className="max-w-md w-full">
            
            {/* Mobile Logo Only */}
            <div className="lg:hidden flex flex-col items-center gap-1 mb-10">
              <img src="/homlioo-logo.png" alt="HOMLiOO" className="w-16 h-16 object-contain drop-shadow-md" />
              <span className="text-2xl font-[900] tracking-tight">
                <span className="text-blue-700">HOM</span><span className="text-green-500">LiOO</span>
              </span>
            </div>

            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-[900] text-brand-navy dark:text-white mb-2 tracking-tight">
                Create Account
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Enter your details to get started.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-purple transition-colors" size={20} />
                <input
                  required
                  placeholder="Full Name"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-[1.25rem] border border-slate-100 dark:border-slate-700 outline-none focus:border-brand-purple dark:focus:border-brand-purple focus:ring-4 ring-brand-purple/10 font-bold text-sm transition-all"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-purple transition-colors" size={20} />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-[1.25rem] border border-slate-100 dark:border-slate-700 outline-none focus:border-brand-purple dark:focus:border-brand-purple focus:ring-4 ring-brand-purple/10 font-bold text-sm transition-all"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-purple transition-colors" size={20} />
                <input
                  type="password"
                  required
                  placeholder="Password (Min 6 chars)"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-[1.25rem] border border-slate-100 dark:border-slate-700 outline-none focus:border-brand-purple dark:focus:border-brand-purple focus:ring-4 ring-brand-purple/10 font-bold text-sm transition-all"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-purple transition-colors" size={20} />
                <input
                  type="password"
                  required
                  placeholder="Confirm Password"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-[1.25rem] border border-slate-100 dark:border-slate-700 outline-none focus:border-brand-purple dark:focus:border-brand-purple focus:ring-4 ring-brand-purple/10 font-bold text-sm transition-all"
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full py-4 text-sm font-black rounded-[1.25rem]" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create My Account"}
                </Button>
              </div>
            </form>

            <div className="mt-8 flex flex-col gap-4 text-center lg:text-left">
              <p className="text-sm text-slate-500 font-medium">
                Already have an account?{" "}
                <Link to="/login" className="text-brand-purple font-[900] hover:underline">
                  Log in
                </Link>
              </p>
              <button onClick={() => navigate("/")} className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] hover:text-brand-navy dark:hover:text-white transition-colors lg:justify-start flex items-center justify-center gap-1">
                Skip for now <ArrowRight size={12} />
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Signup;
