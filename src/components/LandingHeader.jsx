import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";

// Import komponen Button premium dari ekosistem Shadcn UI
import { Button } from "./ui/button";

export default function LandingHeader() {
  // Fungsi smooth scroll dengan offset 80px untuk menjaga presisi viewport pasca-scroll
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white px-6 md:px-12 py-4 flex justify-between items-center border-b border-gray-100 sticky top-0 z-50 shadow-sm font-sans backdrop-blur-md bg-white/95">
      
      {/* Bagian Kiri: Brand Logo */}
      <div className="flex items-center gap-3 cursor-pointer select-none group" onClick={() => scrollToSection("home")}>
        <div className="bg-blue-600 p-2 rounded-xl text-white font-bold flex items-center justify-center w-9 h-9 shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
          <MdDashboard size={18} />
        </div>
        <span className="text-lg font-extrabold text-gray-900 tracking-tight">
          Apotek <span className="text-blue-600">Aidil</span>
        </span>
      </div>
      
      {/* Bagian Tengah: Menu Navigasi Menuju Seksi Landing Page */}
      <div className="hidden md:flex gap-1 font-semibold text-gray-500 text-sm">
        <Button variant="ghost" onClick={() => scrollToSection("home")} className="hover:text-blue-600 hover:bg-blue-50/50 rounded-xl font-semibold transition-colors text-xs px-4">
          Beranda
        </Button>
        <Button variant="ghost" onClick={() => scrollToSection("produk")} className="hover:text-blue-600 hover:bg-blue-50/50 rounded-xl font-semibold transition-colors text-xs px-4">
          Katalog Produk
        </Button>
        <Button variant="ghost" onClick={() => scrollToSection("promo")} className="hover:text-blue-600 hover:bg-blue-50/50 rounded-xl font-semibold transition-colors text-xs px-4">
          Promo
        </Button>
        <Button variant="ghost" onClick={() => scrollToSection("konsultasi")} className="hover:text-blue-600 hover:bg-blue-50/50 rounded-xl font-semibold transition-colors text-xs px-4">
          Konsultasi
        </Button>
        <Button variant="ghost" onClick={() => scrollToSection("kontak")} className="hover:text-blue-600 hover:bg-blue-50/50 rounded-xl font-semibold transition-colors text-xs px-4">
          Kontak
        </Button>
      </div>

      {/* Bagian Kanan: Utilitas Keranjang Belanja & Akses Login Portal */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Tombol Keranjang Belanja memanfaatkan Shadcn Ghost Button */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => scrollToSection("produk")}
          className="relative text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all"
        >
          <FiShoppingCart size={20} />
          <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
            3
          </span>
        </Button>
        
        <div className="h-5 w-px bg-gray-200 hidden md:block"></div>
        
        {/* Tombol Akses Portal Admin memanfaatkan Shadcn Outline Button */}
        <Button variant="outline" asChild className="border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl flex items-center gap-2 transition-all font-bold text-xs px-4 shadow-sm">
          <Link to="/login">
            <BsPerson size={16} className="text-blue-600 stroke-[0.5]" />
            <span className="hidden md:block">Portal Admin</span>
          </Link>
        </Button>
        
      </div>
    </nav>
  );
}