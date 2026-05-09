import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";

export default function LandingHeader() {
  // Fungsi smooth scroll dipindahkan ke sini karena tombol-tombolnya ada di header
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80; // offset 80px untuk tinggi header
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white px-6 md:px-12 py-4 flex justify-between items-center border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("home")}>
        <div className="bg-blue-600 p-2 rounded-lg text-white font-bold flex items-center justify-center w-9 h-9 shadow-sm">
          <MdDashboard size={20} />
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">MediCare</span>
      </div>
      
      <div className="hidden md:flex gap-8 font-medium text-gray-600 text-sm">
        <button onClick={() => scrollToSection("home")} className="hover:text-blue-600 transition">Beranda</button>
        <button onClick={() => scrollToSection("produk")} className="hover:text-blue-600 transition">Katalog Produk</button>
        <button onClick={() => scrollToSection("promo")} className="hover:text-blue-600 transition">Promo</button>
        <button onClick={() => scrollToSection("konsultasi")} className="hover:text-blue-600 transition">Konsultasi</button>
        <button onClick={() => scrollToSection("kontak")} className="hover:text-blue-600 transition">Kontak</button>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button className="text-gray-500 hover:text-blue-600 transition relative p-2" onClick={() => scrollToSection("produk")}>
          <FiShoppingCart size={22} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
        </button>
        
        <div className="h-6 w-px bg-gray-300 hidden md:block"></div>
        
        {/* Tombol Login Admin */}
        <Link to="/login" className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition text-sm font-semibold shadow-sm">
          <BsPerson size={18} className="text-blue-600" />
          <span className="hidden md:block">Login Admin</span>
        </Link>
      </div>
    </nav>
  );
}