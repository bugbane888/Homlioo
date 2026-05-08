import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Menu, X } from "lucide-react";
import Button from "../components/common/Button";
import ThemeToggle from "../components/common/ThemeToggle";
import CompareBar from "../components/listings/CompareBar";

const UserLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // LOGIC: Scroll to "How It Works" on Home page
  const handleHowItWorksScroll = () => {
    if (location.pathname !== "/") {
      navigate("/?scroll=how-it-works");
    } else {
      const element = document.getElementById("how-it-works");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] dark:bg-slate-900 transition-colors flex flex-col relative font-outfit">
      {/* --- PIXEL-PERFECT NAVBAR --- */}
      <nav className="bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 h-16 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
          {/* 1. Left: Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0 min-w-0">
            <div className="bg-[#0F172A] dark:bg-brand-purple text-[#F59E0B] dark:text-white w-8 sm:w-9 h-8 sm:h-9 rounded-lg flex items-center justify-center font-black text-sm sm:text-lg shadow-lg group-hover:scale-105 transition-transform shrink-0">
              H
            </div>
            <span className="font-[900] text-sm sm:text-xl tracking-tighter dark:text-white uppercase hidden sm:inline">
              HOMLiOO
            </span>
          </Link>

          {/* 2. Center: Navigation Links (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-10 text-slate-500 dark:text-slate-400 font-bold text-[12px] uppercase tracking-widest">
            <Link
              to="/listings"
              className="hover:text-brand-navy dark:hover:text-white transition-colors"
            >
              Find PG
            </Link>
            <button
              onClick={handleHowItWorksScroll}
              className="hover:text-brand-navy dark:hover:text-white transition-colors uppercase"
            >
              How It Works
            </button>
            <Link
              to="/about"
              className="hover:text-brand-navy dark:hover:text-white transition-colors"
            >
              About Us
            </Link>
          </div>

          {/* 3. Right: Actions & Auth */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3 pl-4 border-l dark:border-slate-800 transition-colors">
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-brand-navy dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase">
                      {user.role}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-purple to-brand-navy text-white flex items-center justify-center font-black text-sm overflow-hidden">
                    {user.photo ? (
                      <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user.name?.[0]?.toUpperCase() || "U"
                    )}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate("/login")}
                    className="text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 px-4 py-2 hover:text-brand-navy dark:hover:text-white transition-colors"
                  >
                    Log In
                  </button>
                  <Button
                    variant="primary"
                    className="py-2.5 px-8 text-[11px] font-black uppercase tracking-widest bg-[#F59E0B] text-[#0F172A] rounded-full shadow-lg shadow-amber-500/20"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE OVERLAY MENU --- */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white dark:bg-slate-900 z-[100] p-4 sm:p-8 space-y-4 sm:space-y-8 animate-in slide-in-from-top-5 overflow-y-auto">
          <Link
            to="/listings"
            className="block font-black text-lg uppercase text-brand-navy dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Find PG
          </Link>
          <button
            onClick={handleHowItWorksScroll}
            className="block font-black text-lg uppercase text-brand-navy dark:text-white"
          >
            How It Works
          </button>
          <Link
            to="/about"
            className="block font-black text-lg uppercase text-brand-navy dark:text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <hr className="border-slate-100 dark:border-slate-800" />
          {!user ? (
            <div className="space-y-4">
              <Button
                className="w-full py-4 bg-[#F59E0B] text-brand-navy"
                onClick={() => {
                  navigate("/signup");
                  setIsMenuOpen(false);
                }}
              >
                Get Started
              </Button>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="w-full text-center font-bold text-slate-400 uppercase text-xs tracking-widest"
              >
                Sign In
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                logout();
                navigate("/");
                setIsMenuOpen(false);
              }}
              className="text-red-500 font-black text-sm uppercase tracking-widest"
            >
              Logout Account
            </button>
          )}
        </div>
      )}

      {/* --- PAGE CONTENT --- */}
      <main className="flex-1">{children}</main>

      {/* --- MASTER FOOTER (4-COLUMNS) --- */}
      <footer className="bg-[#0F172A] text-white pt-24 pb-12 px-6 mt-20 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-slate-800">
            {/* Column 1: Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="bg-[#F59E0B] text-[#0F172A] w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl">
                  H
                </div>
                <span className="font-black text-2xl tracking-tighter italic uppercase">
                  HOMLiOO
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium max-w-xs">
                India's most trusted smart PG search platform. Verified
                listings, zero brokerage, and community-first living.
              </p>
            </div>

            {/* Column 2: Company */}
            <div className="text-left lg:pl-10">
              <h4 className="text-brand-amber text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                Company
              </h4>
              <ul className="space-y-5 text-slate-400 text-[12px] font-bold uppercase tracking-widest">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/listings"
                    className="hover:text-white transition-colors"
                  >
                    Find PG
                  </Link>
                </li>
                <li
                  onClick={handleHowItWorksScroll}
                  className="hover:text-white cursor-pointer transition-colors"
                >
                  How It Works
                </li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="text-left lg:pl-10">
              <h4 className="text-brand-amber text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                Legal
              </h4>
              <ul className="space-y-5 text-slate-400 text-[12px] font-bold uppercase tracking-widest">
                <li className="hover:text-white cursor-pointer transition-colors">
                  Terms & Conditions
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  Cookie Policy
                </li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="text-left lg:pl-10">
              <h4 className="text-brand-amber text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                Support
              </h4>
              <ul className="space-y-5 text-slate-400 text-[12px] font-bold uppercase tracking-widest">
                <li className="flex items-center gap-3">
                  <span className="text-slate-600 italic font-medium lowercase">
                    e:
                  </span>{" "}
                  support@homlioo.in
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-slate-600 italic font-medium lowercase">
                    p:
                  </span>{" "}
                  +91 98765 43210
                </li>
                <li className="text-slate-500 text-[10px] tracking-widest font-medium">
                  Greater Noida, Uttar Pradesh
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">
            <span>
              © {new Date().getFullYear()} HOMLiOO TECHNOLOGY PRIVATE LIMITED.
            </span>
            <div className="flex gap-10">
              <span className="hover:text-white cursor-pointer transition-colors">
                Security Standards
              </span>
              <span className="hover:text-white cursor-pointer transition-colors">
                Data Safety
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* THE GLOBAL STICKY COMPARE BAR */}
      <CompareBar />
    </div>
  );
};

export default UserLayout;
