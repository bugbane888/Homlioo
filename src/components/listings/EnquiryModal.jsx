import React, { useState } from "react";
import { X, Send } from "lucide-react";
import Button from "../common/Button";
import { motion, AnimatePresence } from "framer-motion";

const EnquiryModal = ({ isOpen, onClose, pgName, onSubmit }) => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      studentName: form.name,
      pgName,
      phone: form.phone,
      message: form.message,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-slate-800 w-full max-w-md rounded-[2.5rem] p-10 relative z-10 shadow-2xl border border-slate-100 dark:border-slate-700"
        >
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-slate-400 hover:text-brand-navy dark:hover:text-white"
          >
            <X />
          </button>

          <h2 className="text-2xl font-black text-brand-navy dark:text-white mb-2 tracking-tighter">
            Book a Visit
          </h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">
            For: {pgName}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              required
              placeholder="Your Full Name"
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl outline-none focus:ring-4 ring-brand-purple/10 border-none font-bold"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              required
              type="tel"
              placeholder="Phone Number"
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl outline-none focus:ring-4 ring-brand-purple/10 border-none font-bold"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <textarea
              placeholder="Any specific questions?"
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 dark:text-white rounded-2xl outline-none h-24 resize-none font-medium"
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            ></textarea>
            <Button type="submit" className="w-full py-4">
              <Send size={18} /> Send Request
            </Button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EnquiryModal;
