import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import PageTransition from "../../components/common/PageTransition";
import {
  Bell,
  Moon,
  Sun,
  Lock,
  Eye,
  Save,
  CheckCircle,
  LogOut,
  User,
  Mail,
} from "lucide-react";

const UserSettings = () => {
  const navigate = useNavigate();
  const { user, logout, changePassword } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [showPassword, setShowPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newListings: true,
    priceDrops: true,
    weeklyDigest: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleSavePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match");
      return;
    }
    
    if (passwords.new.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const result = await changePassword(passwords.new);
    
    if (result.success) {
      setSaveSuccess(true);
      setPasswords({ current: "", new: "", confirm: "" });
      setShowPasswordChange(false);
      setTimeout(() => setSaveSuccess(false), 2000);
      alert("Password changed successfully!");
    } else {
      alert(result.error || "Failed to update password");
    }
  };

  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-[900] text-brand-navy dark:text-white tracking-tighter">
            Settings
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-bold transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-700">
            <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-6 flex items-center gap-2">
              <User size={20} />
              Profile Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white font-medium focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white font-medium focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 bg-brand-amber hover:bg-amber-500 text-brand-navy px-6 py-3 rounded-2xl font-bold transition-all"
                >
                  <Save size={16} /> Save Profile
                </button>
                {saveSuccess && (
                  <div className="flex items-center gap-2 text-emerald-600 font-bold">
                    <CheckCircle size={18} /> Profile updated!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Password Change */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-700">
            <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-6 flex items-center gap-2">
              <Lock size={20} />
              Change Password
            </h2>

            {!showPasswordChange ? (
              <button
                onClick={() => setShowPasswordChange(true)}
                className="text-brand-purple font-bold hover:underline"
              >
                Click here to change your password
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords({ ...passwords, current: e.target.value })
                      }
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white font-medium focus:outline-none focus:border-brand-purple"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.new}
                    onChange={(e) =>
                      setPasswords({ ...passwords, new: e.target.value })
                    }
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white font-medium focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords({ ...passwords, confirm: e.target.value })
                    }
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white font-medium focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSavePassword}
                    className="flex items-center gap-2 bg-brand-amber hover:bg-amber-500 text-brand-navy px-6 py-3 rounded-2xl font-bold transition-all"
                  >
                    <Save size={16} /> Save Password
                  </button>
                  <button
                    onClick={() => setShowPasswordChange(false)}
                    className="px-6 py-3 rounded-2xl font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-700">
            <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-6 flex items-center gap-2">
              {isDark ? <Moon size={20} /> : <Sun size={20} />}
              Appearance
            </h2>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
              <div>
                <p className="font-bold text-brand-navy dark:text-white">
                  Dark Mode
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {isDark ? "Enabled" : "Disabled"}
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  isDark ? "bg-brand-purple" : "bg-slate-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    isDark ? "translate-x-7" : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-700">
            <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-6 flex items-center gap-2">
              <Bell size={20} />
              Notifications
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                <div>
                  <p className="font-bold text-brand-navy dark:text-white">
                    Email Notifications
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Receive updates via email
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("emailNotifications")}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    settings.emailNotifications
                      ? "bg-emerald-500"
                      : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.emailNotifications
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                <div>
                  <p className="font-bold text-brand-navy dark:text-white">
                    Push Notifications
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get instant alerts
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("pushNotifications")}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    settings.pushNotifications
                      ? "bg-emerald-500"
                      : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.pushNotifications
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                <div>
                  <p className="font-bold text-brand-navy dark:text-white">
                    New Listings Alerts
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get notified of new PGs in your area
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("newListings")}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    settings.newListings ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.newListings ? "translate-x-7" : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                <div>
                  <p className="font-bold text-brand-navy dark:text-white">
                    Price Drop Alerts
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get notified when prices drop
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("priceDrops")}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    settings.priceDrops ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.priceDrops ? "translate-x-7" : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                <div>
                  <p className="font-bold text-brand-navy dark:text-white">
                    Weekly Digest
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Receive a weekly summary email
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("weeklyDigest")}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    settings.weeklyDigest
                      ? "bg-emerald-500"
                      : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.weeklyDigest ? "translate-x-7" : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-700">
            <h2 className="text-xl font-[900] text-brand-navy dark:text-white mb-6 flex items-center gap-2">
              <Lock size={20} />
              Security
            </h2>

          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSaveSettings}
              className="flex items-center gap-2 bg-brand-amber hover:bg-amber-500 text-brand-navy px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-amber-500/20"
            >
              <Save size={16} /> Save Notification Settings
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserSettings;
