import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import Button from "../../components/common/Button";
import PageTransition from "../../components/common/PageTransition";
import Logo from "../../components/common/Logo";
import { Mail, ArrowLeft, KeyRound, ShieldCheck } from "lucide-react";
import authService from "../../services/supabaseAuthService";

const ForgotPassword = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.resetPasswordForEmail(email);
      setIsSent(true);
      showToast("Password reset link sent to your email.", "success");
    } catch (error) {
      if (error.message.toLowerCase().includes("does not exist")) {
        showToast("User does not exist. Please check your email or sign up.", "error");
      } else {
        showToast(error.message || "Failed to send reset link. Try again.", "error");
      }
    } finally {
      setIsLoading(false);
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
          
          <div className="relative z-10">
            <Link to="/" className="inline-block hover:scale-105 transition-transform">
              <Logo size="lg" />
            </Link>
          </div>

          <div className="relative z-10 max-w-lg mb-20">
            <span className="text-brand-amber text-xs font-black uppercase tracking-[0.4em] mb-4 block">
              Account Recovery
            </span>
            <h1 className="text-5xl lg:text-6xl font-[900] mb-6 leading-tight tracking-tighter">
              Get back to your <br/> <span className="text-brand-purple">sanctuaries.</span>
            </h1>
            <p className="text-slate-400 font-medium text-lg leading-relaxed">
              Don't worry, it happens to the best of us. Let's get your account securely recovered.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-6 text-slate-400 text-sm font-bold">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-brand-purple"><ShieldCheck size={16} /></div>
              <span>Secure password reset flow via Supabase Auth.</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - FORM */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
          <div className="max-w-md w-full">
            
            {/* Mobile Logo Only */}
            <div className="lg:hidden flex justify-center mb-10">
              <Logo size="lg" />
            </div>

            <div className="mb-10 text-center lg:text-left">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-[1.25rem] flex items-center justify-center text-brand-purple mx-auto lg:mx-0 mb-6 border border-slate-100 dark:border-slate-700">
                <KeyRound size={28} />
              </div>
              <h2 className="text-3xl font-[900] text-brand-navy dark:text-white mb-2 tracking-tight">
                Forgot Password?
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                {isSent 
                  ? "Check your email for the secure reset link." 
                  : "Enter your email to receive a password reset link."}
              </p>
            </div>

            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
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

                <div className="pt-2">
                  <Button type="submit" variant="primary" className="w-full py-4 text-sm font-black rounded-[1.25rem]" disabled={isLoading}>
                    {isLoading ? "Sending Link..." : "Send Reset Link"}
                  </Button>
                </div>
              </form>
            ) : (
              <Button type="button" variant="primary" className="w-full py-4 text-sm font-black rounded-[1.25rem]" onClick={() => navigate("/login")}>
                Return to Login
              </Button>
            )}

            <div className="mt-8 flex flex-col gap-4 text-center lg:text-left">
              <button onClick={() => navigate("/login")} className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] hover:text-brand-navy dark:hover:text-white transition-colors lg:justify-start flex items-center justify-center gap-2">
                <ArrowLeft size={12} /> Back to Login
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ForgotPassword;
