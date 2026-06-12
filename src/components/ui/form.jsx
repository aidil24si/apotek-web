import React from "react";

export const FormItem = ({ children, className = "" }) => (
  <div className={`space-y-2 ${className}`}>{children}</div>
);

export const FormLabel = ({ children, className = "" }) => (
  <Label className={`${className}`}>{children}</Label>
);

export const FormMessage = ({ children, className = "" }) => (
  <p className={`text-sm font-medium text-destructive ${className}`}>{children}</p>
);