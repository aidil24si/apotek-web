import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { Trash2 } from "lucide-react";

// Import komponen premium dari ekosistem Shadcn UI
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { supabase } from "../supabaseClient";

export default function LandingHeader({ cart = [], onRemoveFromCart, onClearCart }) {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);

  // Ambil total item di keranjang belanja
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Hitung total harga belanjaan
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    // Ambil session aktif saat mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .maybeSingle()
          .then(({ data }) => {
            if (data) setRole(data.role);
          });
      }
    });

    // Dengarkan perubahan state autentikasi secara real-time
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .maybeSingle()
          .then(({ data }) => {
            if (data) setRole(data.role);
          });
      } else {
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fungsi smooth scroll dengan offset 80px untuk menjaga presisi viewport
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
        
        {/* Tombol Keranjang Belanja Terhubung dengan Shadcn Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="relative text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all"
            >
              <FiShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {totalItems}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col h-full bg-white max-w-md border-l border-gray-100 shadow-2xl p-6">
            <SheetHeader className="pb-4 border-b border-gray-100">
              <SheetTitle className="text-lg font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                🛒 Keranjang Belanja Anda
              </SheetTitle>
              <SheetDescription className="text-xs text-gray-400 font-medium">
                Kelola obat-obatan yang ingin Anda beli
              </SheetDescription>
            </SheetHeader>
            
            {/* Daftar Belanjaan Lokal */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
                  <FiShoppingCart size={40} className="stroke-[1.5] text-gray-300" />
                  <p className="text-xs font-semibold">Keranjang Anda masih kosong</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center p-3 rounded-2xl border border-gray-50 hover:bg-gray-50/50 transition-all">
                    <img src={item.img} alt={item.title} className="w-12 h-12 object-cover rounded-xl border border-gray-100" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-xs truncate">{item.title}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{item.category}</p>
                      <p className="font-extrabold text-blue-600 text-xs mt-1">{item.priceString} <span className="text-gray-400 font-semibold">x {item.quantity}</span></p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onRemoveFromCart(item.title)} 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl w-8 h-8"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))
              )}
            </div>
            
            {/* Total Harga & Aksi Checkout */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-semibold">Subtotal:</span>
                  <span className="font-black text-gray-900 text-base">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={onClearCart} 
                    variant="outline" 
                    className="flex-1 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 font-bold text-xs py-5 rounded-xl h-auto transition-all"
                  >
                    Kosongkan
                  </Button>
                  <Button 
                    onClick={() => {
                      alert(`Pembelian berhasil disimulasikan! Total Belanja: Rp ${totalPrice.toLocaleString("id-ID")}`);
                      onClearCart();
                    }} 
                    className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-5 rounded-xl h-auto transition-all shadow-md shadow-blue-600/10"
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
        
        <div className="h-5 w-px bg-gray-200 hidden md:block"></div>
        
        {/* Tombol Dinamis Sesuai Status Autentikasi */}
        {session ? (
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild className="border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl flex items-center gap-2 transition-all font-bold text-xs px-4 shadow-sm">
              <Link to={role === 'admin' ? '/dashboard' : role === 'customer' ? '/member' : role === 'dokter' ? '/dokter' : role === 'apoteker' ? '/apoteker' : '/'}>
                <MdDashboard size={16} className="text-blue-600" />
                <span className="hidden md:block">Dashboard</span>
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.reload();
              }}
              className="text-gray-500 hover:text-red-600 hover:bg-red-50/50 rounded-xl transition-all font-bold text-xs px-4"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="outline" asChild className="border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl flex items-center gap-2 transition-all font-bold text-xs px-4 shadow-sm">
            <Link to="/login">
              <BsPerson size={16} className="text-blue-600 stroke-[0.5]" />
              <span className="hidden md:block">Portal Admin</span>
            </Link>
          </Button>
        )}
        
      </div>
    </nav>
  );
}