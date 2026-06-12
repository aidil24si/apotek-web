import React from "react";
import { Button } from "./button";

export const AlertDialog = ({ isOpen, onClose, onConfirm, title, description }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      {/* Content */}
      <div className="z-50 grid w-full max-w-md gap-4 border bg-white p-6 shadow-lg rounded-lg animate-in fade-in-50 zoom-in-95 duration-200">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h2 className="text-lg font-semibold text-slate-900">{title || "Apakah anda yakin?"}</h2>
          <p className="text-sm text-slate-500">{description || "Tindakan ini tidak dapat dibatalkan."}</p>
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button variant="destructive" onClick={onConfirm}>Lanjutkan</Button>
        </div>
      </div>
    </div>
  );
};