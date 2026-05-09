import {
  MdDashboard,
  MdOutlineAssignment,
  MdPeople,
  MdOutlineInventory2, // Bisa digunakan jika nanti ada menu General Inventory
  MdMedication,
  MdOutlineHealthAndSafety,
  MdOutlineMedicalServices,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // Helper untuk mengecek menu aktif
  const isActive = (path) =>
    location.pathname === path
      ? "bg-[#2563EB]/10 text-[#2563EB] font-extrabold"
      : "text-gray-500 font-semibold hover:text-gray-700 hover:bg-gray-50";

  return (
    <div
      id="sidebar"
      // Lebar diatur pasti ke 280px, padding 6 (24px)
      className="flex min-h-[100dvh] w-[280px] flex-col bg-white p-6 shadow-xl shadow-gray-200/40 border-r border-gray-100 relative z-20"
    >
      {/* Logo Area */}
      <div id="sidebar-logo" className="flex flex-col mb-8 px-2">
        <span
          id="logo-title"
          className="font-poppins text-4xl font-black text-gray-900 tracking-tight"
        >
          Apotek<span id="logo-dot" className="text-[#2563EB]">.</span>
        </span>
        <span
          id="logo-subtitle"
          className="font-semibold text-gray-400 text-xs mt-1 tracking-wide"
        >
          Modern Health Dashboard
        </span>
      </div>

      {/* List Menu Utama - overflow-y-auto disiapkan jika menu bertambah banyak */}
      <div id="sidebar-menu" className="flex-1 overflow-y-auto no-scrollbar pb-6">
        <ul id="menu-list" className="space-y-2">
          <li>
            <Link
              to="/"
              className={`flex cursor-pointer items-center rounded-xl p-3.5 transition-all duration-200 ${isActive("/")}`}
            >
              <MdDashboard className="mr-3.5 text-xl" />
              <span className="text-sm">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className={`flex cursor-pointer items-center rounded-xl p-3.5 transition-all duration-200 ${isActive("/orders")}`}
            >
              <MdOutlineAssignment className="mr-3.5 text-xl" />
              <span className="text-sm">Pesanan</span>
            </Link>
          </li>
          <li>
            <Link
              to="/customers"
              className={`flex cursor-pointer items-center rounded-xl p-3.5 transition-all duration-200 ${isActive("/customers")}`}
            >
              <MdPeople className="mr-3.5 text-xl" />
              <span className="text-sm">Data Pasien</span>
            </Link>
          </li>

          {/* --- KATEGORI MENU INVENTORY --- */}
          <div className="pt-6 pb-2 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            Manajemen Stok
          </div>
          
          <li>
            <Link
              to="/inventory"
              className={`flex cursor-pointer items-center rounded-xl p-3.5 transition-all duration-200 ${isActive("/inventory")}`}
            >
              <MdMedication className="mr-3.5 text-xl" />
              <span className="text-sm">Obat-obatan</span>
            </Link>
          </li>
          <li>
            <Link
              to="/suplemen"
              className={`flex cursor-pointer items-center rounded-xl p-3.5 transition-all duration-200 ${isActive("/suplemen")}`}
            >
              <MdOutlineHealthAndSafety className="mr-3.5 text-xl" />
              <span className="text-sm">Suplemen</span>
            </Link>
          </li>
          <li>
            <Link
              to="/alat-kesehatan"
              className={`flex cursor-pointer items-center rounded-xl p-3.5 transition-all duration-200 ${isActive("/alat-kesehatan")}`}
            >
              <MdOutlineMedicalServices className="mr-3.5 text-xl" />
              <span className="text-sm">Alat Kesehatan</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Footer Card */}
      <div id="sidebar-footer" className="mt-auto pt-4">
        <div
          id="footer-card"
          className="mb-6 flex flex-col rounded-[20px] bg-[#2563EB] p-5 shadow-lg shadow-blue-500/30 relative overflow-hidden group"
        >
          {/* Variasi hiasan lingkaran di background card */}
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

          <div className="flex items-center gap-3 mb-4 relative z-10">
            <img
              id="footer-avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-white/30 bg-white/20"
              src="/img/Aidil.jpg"
              alt="Admin Avatar"
              // Fallback gambar jika file gambar Aidil.jpg tidak ditemukan/belum ada
              onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Admin+Aidil&background=ffffff&color=2563EB" }}
            />
            <div className="text-white">
              <p className="font-bold text-sm tracking-tight">Admin Aidil</p>
              <p className="text-[10px] opacity-80 font-medium">Apoteker Utama</p>
            </div>
          </div>

          <div
            id="footer-text"
            className="text-[11px] text-white/90 relative z-10 leading-relaxed"
          >
            <p>Butuh bantuan mengelola stok masuk hari ini?</p>
            <button
              id="add-menu-button"
              className="mt-3.5 flex items-center justify-center space-x-2 rounded-xl bg-white px-4 py-2.5 w-full shadow-sm active:scale-95 transition-all hover:bg-gray-50 group/btn"
            >
              <FaPlus className="text-[#2563EB] text-[10px] group-hover/btn:rotate-90 transition-transform duration-300" />
              <span className="font-bold text-[#111827] text-xs">Tambah Data</span>
            </button>
          </div>
        </div>

        {/* Copyright Area */}
        <div className="px-2 pb-2 text-center">
          <span
            id="footer-brand"
            className="font-bold text-gray-800 block text-xs"
          >
            Apotek Sehat v1.0
          </span>
          <p
            id="footer-copyright"
            className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-wider"
          >
            &copy; 2026 Health Tech Inc.
          </p>
        </div>
      </div>
    </div>
  );
}