import React, { useState } from "react";
import { useEnquiries } from "../../context/EnquiryContext";
import { useAuth } from "../../context/AuthContext";
import { X, Send, AlertCircle } from "lucide-react";

const EnquiryFormModal = ({ isOpen, onClose, pgName, pgId }) => {
  const { user } = useAuth();
  const { addEnquiry } = useEnquiries();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Issue 21 fix: inline validation with visible error messages
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Your name is required.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?[\d\s-]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate first
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await addEnquiry({
        studentName: formData.name,
        pgName: pgName,
        propertyId: pgId,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      });
      // Reset and close on success
      setFormData({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", message: "" });
      setErrors({});
      onClose();
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      setErrors({ submit: "Failed to send enquiry. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClass = (field) =>
    `w-full px-4 py-3 bg-white dark:bg-slate-900 border rounded-xl text-sm font-medium dark:text-white outline-none focus:ring-2 transition-all ${
      errors[field]
        ? "border-red-400 ring-red-200 dark:ring-red-800"
        : "border-slate-100 dark:border-slate-700 ring-brand-purple/50"
    }`;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

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
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4" noValidate>
            {/* Global submit error */}
            {errors.submit && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                <AlertCircle size={16} className="text-red-500 shrink-0" />
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">{errors.submit}</p>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass("name")}
                placeholder="Full name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">
                Email Address <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass("email")}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass("phone")}
                placeholder="+91-9876543210"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.phone}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-bold text-brand-navy dark:text-white mb-2">
                Message <span className="text-slate-400 font-normal">(optional)</span>
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
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </button>
            </div>

            <p className="text-xs text-slate-400 dark:text-slate-500 text-center pt-1">
              The owner will contact you within 24 hours
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default EnquiryFormModal;
