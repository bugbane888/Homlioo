import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Button from "../../components/common/Button";
import PageTransition from "../../components/common/PageTransition";

import { Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result?.success) {
      showToast(`Welcome back, ${result.name}!`, "success");
      navigate(result.role === "admin" ? "/admin" : "/");
    } else {
      showToast(result?.error || "Invalid credentials. Please check your email and password.", "error");
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
              Welcome Back
            </span>
            <h1 className="text-5xl lg:text-6xl font-[900] mb-6 leading-tight tracking-tighter">
              Manage your <br/> <span className="text-brand-purple">sanctuaries.</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg leading-relaxed">
              Log in to access your personalized dashboard, manage property listings, and track student enquiries in real-time.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 text-slate-500 text-sm font-bold">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0F2133] bg-slate-800 flex items-center justify-center text-xs text-white">
                  {i === 1 ? '👨' : i === 2 ? '👩' : '🧑'}
                </div>
              ))}
            </div>
            <p>Join 10,000+ happy students & owners.</p>
          </div>
        </div>

        {/* RIGHT COLUMN - FORM */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
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
                Sign In to HOMLiOO
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Enter your credentials to access your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-purple transition-colors" size={20} />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-[1.25rem] border border-slate-100 dark:border-slate-700 outline-none focus:border-brand-purple dark:focus:border-brand-purple focus:ring-4 ring-brand-purple/10 font-bold text-sm transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-purple transition-colors" size={20} />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-[1.25rem] border border-slate-100 dark:border-slate-700 outline-none focus:border-brand-purple dark:focus:border-brand-purple focus:ring-4 ring-brand-purple/10 font-bold text-sm transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-end -mt-2">
                <Link to="/forgot-password" className="text-xs font-black text-brand-purple hover:text-brand-navy dark:hover:text-white transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" variant="primary" className="w-full py-4 text-sm font-black rounded-[1.25rem]" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In Securely"}
              </Button>
            </form>



            <div className="mt-8 flex flex-col gap-4 text-center lg:text-left">
              <p className="text-sm text-slate-500 font-medium">
                Don't have an account?{" "}
                <Link to="/signup" className="text-brand-purple font-[900] hover:underline">
                  Create one now
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

export default Login;
