import React from "react";

export const Badge = ({ className = "", variant = "default", ...props }) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variants = {
    default: "border-transparent bg-slate-900 text-slate-50",
    secondary: "border-transparent bg-slate-100 text-slate-900",
    success: "border-transparent bg-emerald-100 text-emerald-800",
    destructive: "border-transparent bg-red-100 text-red-800",
  };

  return (
    <div className={`${baseStyles} ${variants[variant] || variants.default} ${className}`} {...props} />
  );
};