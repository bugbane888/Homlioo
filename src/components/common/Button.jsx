import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-brand-amber text-brand-navy hover:bg-amber-500 shadow-lg shadow-amber-500/20",
    secondary:
      "bg-brand-navy dark:bg-brand-purple text-white hover:bg-slate-800 shadow-lg shadow-navy-900/10",
    outline:
      "border-2 border-slate-100 dark:border-slate-700 bg-transparent text-brand-navy dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800",
    purple:
      "bg-brand-purple text-white hover:bg-purple-700 shadow-lg shadow-purple-500/20",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
