import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import Button from "../../components/common/Button";
import PageTransition from "../../components/common/PageTransition";
import { Lock, ShieldCheck } from "lucide-react";
import authService from "../../services/supabaseAuthService";

const ResetPassword = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return showToast("Passwords do not match.", "error");
    }
    
    if (password.length < 6) {
      return showToast("Password must be at least 6 characters.", "error");
    }

    setIsLoading(true);

    try {
      await authService.updatePassword(password);
      showToast("Password updated successfully! You can now log in.", "success");
      // Optionally sign out the user so they have to log in with new credentials
      await authService.signOut();
      navigate("/login");
    } catch (error) {
      showToast(error.message || "Failed to update password. Try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F8F7F4] dark:bg-slate-900 flex items-center justify-center p-6 transition-colors">
        <div className="max-w-md w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl p-10 lg:p-12 border border-slate-100 dark:border-slate-700 relative overflow-hidden"
          >
            <div className="bg-brand-navy dark:bg-brand-purple text-brand-amber dark:text-white w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <ShieldCheck size={24} />
            </div>

            <div className="text-center mb-10">
              <h1 className="text-3xl font-[900] text-brand-navy dark:text-white mb-2 tracking-tighter">
                Reset Password
              </h1>
              <p className="text-slate-400 text-sm font-medium">
                Enter your new password below to regain access.
              </p>
            </div>

            <div className="space-y-5">
              <div className="relative group">
                <Lock
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-purple transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  required
                  placeholder="New Password"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl border-none outline-none focus:ring-4 ring-brand-purple/5 font-bold text-sm transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="relative group">
                <Lock
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-purple transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  required
                  placeholder="Confirm New Password"
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl border-none outline-none focus:ring-4 ring-brand-purple/5 font-bold text-sm transition-all"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                variant="secondary"
                className="w-full py-4 text-sm font-black shadow-xl shadow-navy-900/10"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
};

export default ResetPassword;
