import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import Button from "../../components/common/Button";
import PageTransition from "../../components/common/PageTransition";
import { UserPlus, ArrowRight } from "lucide-react";

const Signup = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return showToast("Passwords do not match.", "error");
    }
    // Logic for Node.js API call goes here
    showToast("Registration successful! Welcome to HOMLiOO.", "success");
    navigate("/login");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl p-10 border border-slate-100 dark:border-slate-700"
        >
          <div className="bg-brand-purple text-white w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl mx-auto mb-8 shadow-xl shadow-purple-500/20">
            <UserPlus size={24} />
          </div>

          <h1 className="text-2xl font-[900] text-brand-navy dark:text-white mb-2 text-center tracking-tight">
            Create Account
          </h1>
          <p className="text-slate-400 text-center mb-8 text-sm font-medium">
            Join the premium student community
          </p>

          <div className="space-y-4">
            <input
              required
              placeholder="Full Name"
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl border-none outline-none focus:ring-4 ring-brand-purple/5 font-bold text-sm"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl border-none outline-none focus:ring-4 ring-brand-purple/5 font-bold text-sm"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl border-none outline-none focus:ring-4 ring-brand-purple/5 font-bold text-sm"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <input
              type="password"
              required
              placeholder="Confirm Password"
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl border-none outline-none focus:ring-4 ring-brand-purple/5 font-bold text-sm"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />

            <Button
              type="submit"
              variant="purple"
              className="w-full py-4 text-sm"
            >
              Create My Account
            </Button>
          </div>

          <div className="mt-8 flex flex-col gap-4 text-center">
            <p className="text-sm text-slate-500 font-medium">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-brand-purple font-[900] hover:underline"
              >
                Login
              </Link>
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-brand-navy dark:hover:text-white transition-all flex items-center justify-center gap-2"
            >
              Skip registration for now <ArrowRight size={12} />
            </button>
          </div>
        </form>
      </div>
    </PageTransition>
  );
};

export default Signup;
