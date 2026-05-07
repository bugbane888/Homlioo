import React from "react";

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-slate-100 text-slate-600",
    verified: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-800",
    girls: "bg-pink-100 text-pink-700",
    boys: "bg-blue-100 text-blue-700",
    coed: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
