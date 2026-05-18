import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSaved } from "../context/SavedContext"; // <--- IMPORT THIS
import { LogOut, Menu, X, Heart, Bell } from "lucide-react";
import Button from "../components/common/Button";
import ThemeToggle from "../components/common/ThemeToggle";
import CompareBar from "../components/listings/CompareBar";

const UserLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const { savedIds } = useSaved(); // <--- GET SAVED IDS
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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
      {/* --- NAVBAR --- */}
      <nav className="bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 h-16 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between">
          {/* 1. Left: Logo */}
          <div className="flex items-center gap-8 lg:gap-12">
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="bg-[#0F172A] dark:bg-brand-purple text-[#F59E0B] dark:text-white w-8 sm:w-9 h-8 sm:h-9 rounded-lg flex items-center justify-center font-black text-sm sm:text-lg shadow-lg group-hover:scale-105 transition-transform shrink-0">
                H
              </div>
              <span className="font-[900] text-sm sm:text-xl tracking-tighter dark:text-white uppercase hidden sm:inline">
                HOMLiOO
              </span>
            </Link>

            {/* 2. Center: Navigation Links */}
            <div className="hidden lg:flex items-center gap-8 text-slate-500 dark:text-slate-400 font-bold text-[11px] uppercase tracking-widest">
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
              <Link
                to="/help"
                className="hover:text-brand-navy dark:hover:text-white transition-colors"
              >
                Help
              </Link>
            </div>
          </div>

          {/* 3. Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            {/* --- FAVORITES BUTTON --- */}
            <Link
              to="/favorites"
              className="relative p-2 text-slate-400 hover:text-red-500 transition-all active:scale-90"
              title="My Shortlist"
            >
              <Heart
                size={20}
                className={
                  savedIds.length > 0 ? "fill-red-500 text-red-500" : ""
                }
              />
              {savedIds.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                  {savedIds.length}
                </span>
              )}
            </Link>

            {/* --- NOTIFICATION BUTTON --- */}
            <button className="p-2 text-slate-400 hover:text-brand-navy dark:hover:text-white transition-all relative">
              <Bell size={20} />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-amber rounded-full border-2 border-white dark:border-slate-900"></div>
            </button>

            {/* Auth / Profile Logic */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3 pl-4 border-l border-slate-100 dark:border-slate-800 transition-colors relative">
                  <div className="text-right hidden xl:block">
                    <p className="text-[10px] font-black uppercase text-brand-navy dark:text-white leading-none mb-1">
                      {user.name}
                    </p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">
                      {user.role}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-navy text-white flex items-center justify-center font-black text-sm cursor-pointer relative hover:shadow-xl transition-all active:scale-95 border-2 border-white dark:border-slate-800"
                  >
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      user.name?.[0]?.toUpperCase()
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      />
                      <div className="absolute top-full right-0 mt-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden min-w-[180px] z-50 animate-in slide-in-from-top-2 duration-200">
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="block px-5 py-4 text-[11px] font-black uppercase tracking-widest text-brand-navy dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="block px-5 py-4 text-[11px] font-black uppercase tracking-widest text-brand-navy dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-t border-slate-50 dark:border-slate-700"
                        >
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            navigate("/");
                            setIsProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-5 py-4 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border-t border-slate-50 dark:border-slate-700"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate("/login")}
                    className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 px-4 py-2 hover:text-brand-navy dark:hover:text-white"
                  >
                    Log In
                  </button>
                  <Button
                    variant="primary"
                    className="py-2.5 px-8 text-[11px] font-black uppercase tracking-widest bg-[#F59E0B] text-[#0F172A] rounded-full"
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

      {/* --- MOBILE MENU --- */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white dark:bg-slate-900 z-[100] p-6 space-y-6 animate-in slide-in-from-top-5 overflow-y-auto">
          <Link
            to="/listings"
            className="block font-black text-sm uppercase text-slate-600 dark:text-slate-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Find PG
          </Link>
          <button
            onClick={handleHowItWorksScroll}
            className="block font-black text-sm uppercase text-slate-600 dark:text-slate-300 text-left"
          >
            How It Works
          </button>
          <Link
            to="/about"
            className="block font-black text-sm uppercase text-slate-600 dark:text-slate-300"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/favorites"
            className="block font-black text-sm uppercase text-slate-600 dark:text-slate-300"
            onClick={() => setIsMenuOpen(false)}
          >
            My Shortlist ({savedIds.length})
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
                className="w-full text-center font-bold text-slate-400 uppercase text-[10px] tracking-widest"
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
              className="w-full py-3 text-red-500 font-black text-sm uppercase tracking-widest border border-red-100 rounded-xl"
            >
              Logout Account
            </button>
          )}
        </div>
      )}

      {/* --- CONTENT --- */}
      <main className="flex-1">{children}</main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#0F172A] text-white pt-24 pb-12 px-6 mt-20 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-20 border-b border-slate-800">
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
            <div className="text-left lg:pl-10">
              <h4 className="text-brand-amber text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                Company
              </h4>
              <ul className="space-y-5 text-slate-400 text-[12px] font-bold uppercase tracking-widest">
                <li>
                  <Link to="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/listings" className="hover:text-white">
                    Find PG
                  </Link>
                </li>
                <li
                  onClick={handleHowItWorksScroll}
                  className="hover:text-white cursor-pointer"
                >
                  How It Works
                </li>
                <li>
                  <Link to="/help" className="hover:text-white">
                    Help
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-left lg:pl-10">
              <h4 className="text-brand-amber text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                Legal
              </h4>
              <ul className="space-y-5 text-slate-400 text-[12px] font-bold uppercase tracking-widest">
                <li className="hover:text-white cursor-pointer">
                  Terms & Conditions
                </li>
                <li className="hover:text-white cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:text-white cursor-pointer">
                  Cookie Policy
                </li>
              </ul>
            </div>
            <div className="text-left lg:pl-10">
              <h4 className="text-brand-amber text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                Support
              </h4>
              <ul className="space-y-5 text-slate-400 text-[12px] font-bold uppercase tracking-widest">
                <li>e: support@homlioo.in</li>
                <li>p: +91 98765 43210</li>
                <li className="text-slate-500 text-[10px] tracking-widest font-medium">
                  Greater Noida, Uttar Pradesh
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">
            <span>
              © {new Date().getFullYear()} HOMLiOO TECHNOLOGY PRIVATE LIMITED.
            </span>
            <div className="flex gap-10">
              <span className="hover:text-white cursor-pointer">
                Security Standards
              </span>
              <span className="hover:text-white cursor-pointer">
                Data Safety
              </span>
            </div>
          </div>
        </div>
      </footer>

      <CompareBar />
    </div>
  );
};

export default UserLayout;
