import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";
import { supabase } from "../../lib/supabase";
import {
  User,
  Camera,
  Save,
  Moon,
  Sun,
  Globe,
  LogOut,
  ChevronLeft,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, updateProfile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [photoPreview, setPhotoPreview] = useState(user?.photo || null);
  const [isSaving, setIsSaving] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast("Name and email are required", "error");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        photo: photoPreview,
      });
      showToast("Profile updated successfully!", "success");
      setIsSaving(false);
    }, 500);
  };

  const handleSavePassword = async () => {
    if (!passwordForm.newPassword) {
      showToast("Please enter a new password", "error");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showToast("New password must be at least 6 characters", "error");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("New passwords do not match", "error");
      return;
    }

    setIsSavingPassword(true);
    try {
      // Direct update — works on any active Supabase session
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });

      if (error) {
        showToast(error.message || "Failed to change password", "error");
      } else {
        showToast("Password changed successfully!", "success");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      showToast("Something went wrong. Please try again.", "error");
    }
    setIsSavingPassword(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate("/login");
      showToast("Logged out successfully", "info");
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-slate-400 hover:text-brand-navy dark:hover:text-white mb-6 transition-colors"
        >
          <ChevronLeft size={18} /> Back to Dashboard
        </button>
        <h1 className="text-3xl font-black text-brand-navy dark:text-white tracking-tight">
          Settings &amp; Preferences
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Manage your account, preferences, and system settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Section */}
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-black text-brand-navy dark:text-white mb-6 flex items-center gap-3">
              <User size={24} /> Profile Information
            </h2>

            <div className="space-y-6">
              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-bold text-brand-navy dark:text-white mb-4">
                  Profile Photo
                </label>
                <div className="flex items-end gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-brand-purple to-brand-navy rounded-2xl flex items-center justify-center text-white text-3xl font-black overflow-hidden">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{user?.name?.[0]?.toUpperCase() || "A"}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="cursor-pointer">
                      <div className="bg-brand-purple hover:bg-brand-navy text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all w-fit">
                        <Camera size={18} /> Upload Photo
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-slate-400 mt-2">
                      Recommended: 400x400px, JPG or PNG
                    </p>
                  </div>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-medium dark:text-white outline-none focus:ring-2 ring-brand-purple/50 transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-medium dark:text-white outline-none focus:ring-2 ring-brand-purple/50 transition-all"
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-medium dark:text-white outline-none focus:ring-2 ring-brand-purple/50 transition-all"
                  placeholder="+91-9876543210"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="w-full bg-brand-purple hover:bg-brand-navy disabled:opacity-50 text-white px-6 py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20"
              >
                <Save size={18} />
                {isSaving ? "Saving..." : "Save Profile Changes"}
              </button>
            </div>
          </div>

          {/* Change Password Section */}
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-black text-brand-navy dark:text-white mb-6 flex items-center gap-3">
              <Lock size={24} /> Change Password
            </h2>

            <div className="space-y-6">



              <div>
                <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordInputChange}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-medium dark:text-white outline-none focus:ring-2 ring-brand-purple/50 transition-all"
                  placeholder="Enter new password (min. 6 characters)"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordInputChange}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-medium dark:text-white outline-none focus:ring-2 ring-brand-purple/50 transition-all"
                  placeholder="Re-enter new password"
                />
              </div>

              <button
                onClick={handleSavePassword}
                disabled={isSavingPassword}
                className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-50 text-white px-6 py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all"
              >
                <Lock size={18} />
                {isSavingPassword ? "Changing..." : "Change Password"}
              </button>
            </div>
          </div>

          {/* Theme & Preferences Section */}
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <h2 className="text-xl font-black text-brand-navy dark:text-white mb-6 flex items-center gap-3">
              <Globe size={24} /> Appearance &amp; Preferences
            </h2>

            <div className="space-y-6">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  {theme === "dark" ? (
                    <Moon size={20} className="text-slate-600 dark:text-slate-400" />
                  ) : (
                    <Sun size={20} className="text-slate-600 dark:text-slate-400" />
                  )}
                  <div>
                    <p className="font-bold text-brand-navy dark:text-white text-sm">
                      Dark Mode
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {theme === "dark"
                        ? "Currently using dark theme"
                        : "Currently using light theme"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative w-14 h-8 rounded-full transition-colors ${theme === "dark" ? "bg-brand-purple" : "bg-slate-300"
                    }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${theme === "dark" ? "translate-x-7" : "translate-x-1"
                      }`}
                  ></div>
                </button>
              </div>

              {/* System Info */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-brand-navy dark:text-white">
                  Account Information
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
                      Role
                    </p>
                    <p className="font-black text-brand-navy dark:text-white">
                      {user?.role === "admin" ? "🔐 Super Admin" : "👤 User"}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
                      Member Since
                    </p>
                    <p className="font-black text-brand-navy dark:text-white">
                      2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-gradient-to-br from-brand-purple to-brand-navy p-6 rounded-3xl text-white shadow-lg">
            <h3 className="font-black text-lg mb-4">Account Actions</h3>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all border border-red-400/50"
            >
              <LogOut size={18} /> Logout
            </button>
            <p className="text-xs text-white/70 mt-4">
              Make sure to save any changes before logging out.
            </p>
          </div>

          {/* Info Card */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="font-black text-brand-navy dark:text-white mb-4">
              Need Help?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              For support or additional assistance, please contact the HOMLiOO
              support team.
            </p>
            <button
              onClick={() => window.open("mailto:homlioopg@gmail.com", "_blank")}
              className="text-brand-purple font-bold text-sm hover:underline cursor-pointer bg-transparent border-none p-0"
            >
              Contact Support →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
