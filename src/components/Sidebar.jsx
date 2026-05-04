import {
  MdDashboard,
  MdOutlineAssignment,
  MdPeople,
  MdOutlineInventory2, // Ikon Inventory baru
  MdMedication, // Ikon Obat
  MdOutlineHealthAndSafety, // Ikon Suplemen
  MdOutlineMedicalServices, // Ikon Alkes
  MdOutlineSupportAgent, // Ikon Layanan
} from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // Helper untuk mengecek menu aktif agar lebih user-friendly
  const isActive = (path) =>
    location.pathname === path
      ? "bg-biru/10 text-biru font-extrabold"
      : "text-gray-600 font-medium";

  return (
    <div
      id="sidebar"
      className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg border-r border-gray-50"
    >
      {/* Logo */}
      <div id="sidebar-logo" className="flex flex-col">
        <span
          id="logo-title"
          className="font-poppins text-[48px] text-gray-900 tracking-tight"
        >
          Apotek{" "}
          <b id="logo-dot" className="text-biru">
            .
          </b>
        </span>
        <span
          id="logo-subtitle"
          className="font-semibold text-gray-400 text-sm -mt-2"
        >
          Modern Health Dashboard
        </span>
      </div>

      {/* List Menu Utama */}
      <div id="sidebar-menu" className="mt-10">
        <ul id="menu-list" className="space-y-3">
          <li>
            <Link
              to="/"
              className={`flex cursor-pointer items-center rounded-xl p-4 transition-all hover:bg-biru/5 ${isActive("/")}`}
            >
              <MdDashboard className="mr-4 text-xl" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className={`flex cursor-pointer items-center rounded-xl p-4 transition-all hover:bg-biru/5 ${isActive("/orders")}`}
            >
              <MdOutlineAssignment className="mr-4 text-xl" />
              <span>Pesanan</span>
            </Link>
          </li>
          <li>
            <Link
              to="/customers"
              className={`flex cursor-pointer items-center rounded-xl p-4 transition-all hover:bg-biru/5 ${isActive("/customers")}`}
            >
              <MdPeople className="mr-4 text-xl" />
              <span>Data Pasien</span>
            </Link>
          </li>

          {/* --- KATEGORI MENU INVENTORY --- */}
          <div className="pt-6 pb-2 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
            Manajemen Stok
          </div>
          <li>
            {/* Diarahkan ke halaman Inventory yang baru */}
            <Link
              to="/inventory"
              className={`flex cursor-pointer items-center rounded-xl p-4 transition-all hover:bg-biru/5 ${isActive("/inventory")}`}
            >
              <MdMedication className="mr-4 text-xl" />
              <span>Obat-obatan</span>
            </Link>
          </li>
          <li>
            <Link
              to="/suplemen"
              className={`flex cursor-pointer items-center rounded-xl p-4 transition-all hover:bg-biru/5 ${isActive("/suplemen")}`}
            >
              <MdOutlineHealthAndSafety className="mr-4 text-xl" />
              <span>Suplemen</span>
            </Link>
          </li>
          <li>
            <Link
              to="/alat-kesehatan"
              className={`flex cursor-pointer items-center rounded-xl p-4 transition-all hover:bg-biru/5 ${isActive("/alat-kesehatan")}`}
            >
              <MdOutlineMedicalServices className="mr-4 text-xl" />
              <span>Alat Kesehatan</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Footer Card */}
      <div id="sidebar-footer" className="mt-auto">
        <div
          id="footer-card"
          className="mb-8 flex flex-col rounded-3xl bg-biru p-6 shadow-xl shadow-biru/20 relative overflow-hidden group"
        >
          {/* Variasi hiasan lingkaran di background card */}
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <img
              id="footer-avatar"
              className="w-12 h-12 rounded-xl object-cover border-2 border-white/30"
              src="/img/Aidil.jpg"
              alt="avatar"
            />
            <div className="text-white">
              <p className="font-bold text-sm">Admin Aidil</p>
              <p className="text-[10px] opacity-70 italic">Apoteker Utama</p>
            </div>
          </div>

          <div
            id="footer-text"
            className="text-[11px] text-white/90 relative z-10 leading-relaxed"
          >
            <p>Butuh bantuan mengelola stok masuk hari ini?</p>
            <button
              id="add-menu-button"
              className="mt-4 flex items-center justify-center space-x-2 rounded-xl bg-white px-4 py-2.5 w-full shadow-sm active:scale-95 transition-all hover:bg-gray-50 group"
            >
              <FaPlus className="text-biru text-[10px] group-hover:rotate-90 transition-transform" />
              <span className="font-bold text-gray-800">Tambah Data</span>
            </button>
          </div>
        </div>

        <div className="px-2 pb-4">
          <span
            id="footer-brand"
            className="font-bold text-gray-800 block text-sm"
          >
            Apotek Sehat v1.0
          </span>
          <p
            id="footer-copyright"
            className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider"
          >
            &copy; 2026 Health Tech Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
