import React from "react";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#F9FAFB]/50 backdrop-blur-xs font-sans animate-in fade-in duration-300">
            
            {/* Animasi Spinner Minimalis Modern */}
            <div className="relative flex items-center justify-center">
                {/* Track spinner melingkar dengan aksen pudar */}
                <div className="w-12 h-12 border-4 border-blue-100 rounded-full"></div>
                {/* Indikator putar utama */}
                <div className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin absolute top-0 left-0 shadow-sm"></div>
            </div>
            
            {/* Teks Indikator Status Sistem */}
            <div className="mt-5 flex flex-col items-center gap-1.5 select-none">
                <p className="text-[#2563EB] text-sm font-extrabold tracking-[0.25em] animate-pulse">
                    MEMUAT DATA
                </p>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] opacity-80">
                    Apotek Sehat System
                </span>
            </div>
            
        </div>
    );
}