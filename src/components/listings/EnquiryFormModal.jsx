import React, { useState } from "react";
import { useEnquiries } from "../../context/EnquiryContext";
import { useAuth } from "../../context/AuthContext";
import { X, Phone, Send } from "lucide-react";
import Button from "../common/Button";

const EnquiryFormModal = ({ isOpen, onClose, pgName, pgId }) => {
  const { user } = useAuth();
  const { addEnquiry } = useEnquiries();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      addEnquiry({
        studentName: formData.name,
        pgName: pgName,
        pgId: pgId,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      });
      setFormData({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", message: "" });
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full animate-in fade-in zoom-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-100 dark:border-slate-700">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white">
                Send Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                {pgName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-medium dark:text-white outline-none focus:ring-2 ring-brand-purple/50 transition-all"
                placeholder="Full name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-medium dark:text-white outline-none focus:ring-2 ring-brand-purple/50 transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-medium dark:text-white outline-none focus:ring-2 ring-brand-purple/50 transition-all"
                placeholder="+91-9876543210"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl text-sm font-medium dark:text-white outline-none focus:ring-2 ring-brand-purple/50 transition-all resize-none"
                placeholder="Tell the owner about yourself..."
                rows={3}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-slate-100 dark:border-slate-700 rounded-xl font-bold text-brand-navy dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-brand-purple hover:bg-brand-navy disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Send size={16} />
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-500 text-center pt-2">
              The owner will contact you within 24 hours
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default EnquiryFormModal;
