import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Button from "../../components/common/Button";
import PageTransition from "../../components/common/PageTransition";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

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

    // Call the global login function
    const result = await login(email, password);

    setIsLoading(false);

    if (result?.success) {
      showToast(`Welcome back, ${result.name}!`, "success");
      // Redirect based on the role returned by AuthContext
      navigate(result.role === "admin" ? "/admin" : "/");
    } else {
      showToast(result?.error || "Invalid credentials. Please check your email and password.", "error");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F8F7F4] dark:bg-slate-900 flex items-center justify-center p-6 transition-colors">
        <div className="max-w-md w-full">
          {/* --- LOGIN CARD --- */}
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl p-10 lg:p-12 border border-slate-100 dark:border-slate-700 relative overflow-hidden"
          >
            {/* Brand Logo */}
            <div className="bg-brand-navy dark:bg-brand-purple text-brand-amber dark:text-white w-14 h-14 rounded-2xl flex items-center justify-center font-[900] text-2xl mx-auto mb-8 shadow-xl">
              H
            </div>

            <div className="text-center mb-10">
              <h1 className="text-3xl font-[900] text-brand-navy dark:text-white mb-2 tracking-tighter">
                Access HOMLiOO
              </h1>
              <p className="text-slate-400 text-sm font-medium">
                Sign in to manage your PG sanctuaries.
              </p>
            </div>

            <div className="space-y-5">
              {/* Email Field */}
              <div className="relative group">
                <Mail
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-purple transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl border-none outline-none focus:ring-4 ring-brand-purple/5 font-bold text-sm transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div className="relative group">
                <Lock
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-purple transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  required
                  placeholder="Access Key"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl border-none outline-none focus:ring-4 ring-brand-purple/5 font-bold text-sm transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                variant="secondary"
                className="w-full py-4 text-sm font-black shadow-xl shadow-navy-900/10"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In to Dashboard"}
              </Button>
            </div>

            {/* --- INFO BOX --- */}
            <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/10 rounded-[2rem] border border-purple-100 dark:border-purple-800/30">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={16} className="text-brand-purple" />
                <span className="text-xs font-black uppercase tracking-widest text-brand-purple">
                  Test Credentials (Temporary)
                </span>
              </div>
              <p className="text-xs text-slate-500 font-bold mb-2">
                Admin Demo:
              </p>
              <div className="text-xs text-slate-600 font-mono space-y-1 bg-white/50 p-2 rounded">
                <p><strong>Email:</strong> admin@homlioo.com</p>
                <p><strong>Password:</strong> admin123</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 text-center">
              <p className="text-sm text-slate-500 font-medium">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-brand-purple font-black hover:underline"
                >
                  Sign Up
                </Link>
              </p>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-slate-300 text-xs font-black uppercase tracking-[0.3em] hover:text-brand-navy dark:hover:text-white transition-colors"
              >
                Skip for now <ArrowRight size={10} className="inline ml-1" />
              </button>
            </div>
          </form>

          <p className="text-center mt-8 text-xs text-slate-400 font-bold uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} HOMLiOO Technology
          </p>
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
