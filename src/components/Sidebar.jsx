import {
  MdDashboard,
  MdOutlineAssignment,
  MdPeople,
  MdMedication,
  MdOutlineHealthAndSafety,
  MdOutlineMedicalServices,
} from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

// Import komponen pendukung dari ekosistem Shadcn UI
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export default function Sidebar() {
  const location = useLocation();

  // Helper dinamis untuk memetakan kelas CSS menu aktif
  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-50 text-[#2563EB] font-extrabold"
      : "text-gray-500 font-semibold hover:text-gray-900 hover:bg-gray-50/80";

  return (
    <div
      id="sidebar"
      className="flex h-screen w-[280px] flex-col bg-white p-6 border-r border-gray-100 relative z-20 font-sans select-none"
    >
      {/* Area Identitas & Brand Logo */}
      <div id="sidebar-logo" className="flex flex-col mb-7 px-2">
        <span
          id="logo-title"
          className="text-3xl font-black text-gray-900 tracking-tight"
        >
          Apotek<span id="logo-dot" className="text-[#2563EB]">.</span>
        </span>
        <span
          id="logo-subtitle"
          className="font-bold text-gray-400 text-[10px] mt-0.5 uppercase tracking-widest"
        >
          Modern Health Dashboard
        </span>
      </div>

      {/* Area Daftar Menu Utama dengan ScrollArea premium Shadcn UI */}
      <div className="flex-1 overflow-hidden -mx-2 px-2">
        <ScrollArea className="h-full w-full pr-1">
          <ul id="menu-list" className="space-y-1.5 pb-6">
            {/* --- KATEGORI: MENU UTAMA --- */}
            <div className="pt-2 pb-1.5 px-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Menu Utama
            </div>
            <li>
              <Link
                to="/"
                className={`flex items-center rounded-xl p-3 transition-all duration-200 text-sm ${isActive("/")}`}
              >
                <MdDashboard className="mr-3 text-lg shrink-0" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                className={`flex items-center rounded-xl p-3 transition-all duration-200 text-sm ${isActive("/orders")}`}
              >
                <MdOutlineAssignment className="mr-3 text-lg shrink-0" />
                <span>Pesanan</span>
              </Link>
            </li>
            <li>
              <Link
                to="/customers"
                className={`flex items-center rounded-xl p-3 transition-all duration-200 text-sm ${isActive("/customers")}`}
              >
                <MdPeople className="mr-3 text-lg shrink-0" />
                <span>Data Pasien</span>
              </Link>
            </li>

            {/* --- KATEGORI: MANAJEMEN STOK --- */}
            <div className="pt-5 pb-1.5 px-3.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Manajemen Stok
            </div>
            <li>
              <Link
                to="/inventory"
                className={`flex items-center rounded-xl p-3 transition-all duration-200 text-sm ${isActive("/inventory")}`}
              >
                <MdMedication className="mr-3 text-lg shrink-0" />
                <span>Obat-obatan</span>
              </Link>
            </li>
            <li>
              <Link
                to="/suplemen"
                className={`flex items-center rounded-xl p-3 transition-all duration-200 text-sm ${isActive("/suplemen")}`}
              >
                <MdOutlineHealthAndSafety className="mr-3 text-lg shrink-0" />
                <span>Suplemen</span>
              </Link>
            </li>
            <li>
              <Link
                to="/alat-kesehatan"
                className={`flex items-center rounded-xl p-3 transition-all duration-200 text-sm ${isActive("/alat-kesehatan")}`}
              >
                <MdOutlineMedicalServices className="mr-3 text-lg shrink-0" />
                <span>Alat Kesehatan</span>
              </Link>
            </li>
          </ul>
        </ScrollArea>
      </div>

      {/* Area Bawah: Kartu Bantuan & Hak Cipta */}
      <div id="sidebar-footer" className="mt-auto pt-4">
        <div
          id="footer-card"
          className="mb-5 flex flex-col rounded-[20px] bg-[#2563EB] p-5 shadow-lg shadow-blue-600/10 relative overflow-hidden group"
        >
          {/* Ornamen Latar Belakang Kartu */}
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

          {/* Info Admin Tersemat */}
          <div className="flex items-center gap-3 mb-3.5 relative z-10">
            <Avatar className="h-9 w-9 border border-white/20 bg-white/10 p-0.5">
              <AvatarImage src="/img/Aidil.jpg" className="rounded-full object-cover" />
              <AvatarFallback className="font-bold text-xs text-white bg-blue-700">AA</AvatarFallback>
            </Avatar>
            <div className="text-white">
              <p className="font-extrabold text-xs tracking-tight leading-none">Admin Aidil</p>
              <p className="text-[9px] opacity-75 font-semibold mt-1 uppercase tracking-wider">Apoteker Utama</p>
            </div>
          </div>

          {/* Konten & Aksi Cepat */}
          <div id="footer-text" className="text-[11px] text-white/90 relative z-10 leading-relaxed font-medium">
            <p>Butuh bantuan mengelola pasokan stok barang masuk?</p>
            
            {/* Tombol dengan standarisasi Shadcn UI */}
            <Button
              id="add-menu-button"
              variant="secondary"
              className="mt-3 w-full bg-white hover:bg-gray-50 text-[#111827] font-bold text-xs py-4 rounded-xl transition-all shadow-sm group/btn h-auto"
            >
              <FaPlus className="text-[#2563EB] text-[10px] group-hover/btn:rotate-90 transition-transform duration-300 mr-1.5" />
              <span>Tambah Data</span>
            </Button>
          </div>
        </div>

        {/* Branding Sistem Cetak Kecil */}
        <div className="px-2 pb-1 text-center">
          <span className="font-extrabold text-gray-800 block text-xs tracking-tight">
            Apotek Sehat v1.0
          </span>
          <p className="text-[9px] text-gray-400 mt-0.5 font-bold uppercase tracking-widest">
            &copy; 2026 Health Tech Inc.
          </p>
        </div>
      </div>
    </div>
  );
}