import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import PageTransition from "../../components/common/PageTransition";
import { Mail, Phone, MapPin, LogOut, Edit2, Save } from "lucide-react";

import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    city: user?.city || "",
    college: user?.college || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-12 border border-slate-100 dark:border-slate-700 shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-[900] text-brand-navy dark:text-white tracking-tighter">
                Your Profile
              </h1>
              <p className="text-slate-400 font-bold text-sm mt-2">
                Manage your account information
              </p>
            </div>
            <button
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                }
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                isEditing
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-slate-100 text-brand-navy hover:bg-slate-200"
              }`}
            >
              {isEditing ? (
                <>
                  <Save size={16} /> Save Changes
                </>
              ) : (
                <>
                  <Edit2 size={16} /> Edit Profile
                </>
              )}
            </button>
          </div>

          {/* Profile Information */}
          <div className="space-y-6 mb-10">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-2xl border font-medium ${
                  isEditing
                    ? "border-brand-purple bg-white dark:bg-slate-700 focus:outline-none"
                    : "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-500"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                <Mail size={14} /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-2xl border font-medium ${
                  isEditing
                    ? "border-brand-purple bg-white dark:bg-slate-700 focus:outline-none"
                    : "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-500"
                }`}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                <Phone size={14} /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-2xl border font-medium ${
                  isEditing
                    ? "border-brand-purple bg-white dark:bg-slate-700 focus:outline-none"
                    : "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-500"
                }`}
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-2">
                <MapPin size={14} /> City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-2xl border font-medium ${
                  isEditing
                    ? "border-brand-purple bg-white dark:bg-slate-700 focus:outline-none"
                    : "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-500"
                }`}
              />
            </div>

            {/* College */}
            <div>
              <label className="block text-sm font-bold text-slate-600 dark:text-slate-400 mb-2">
                College/University
              </label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-2xl border font-medium ${
                  isEditing
                    ? "border-brand-purple bg-white dark:bg-slate-700 focus:outline-none"
                    : "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-500"
                }`}
              />
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-6 py-3 rounded-2xl font-bold hover:bg-red-100 transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
