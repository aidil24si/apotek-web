import React from 'react';
import { Link } from 'react-router-dom';

export default function PharmacistDashboard() {
  const pharmacistFeatures = [
    {
      title: "Verifikasi Resep",
      description: "Periksa dan validasi resep elektronik dari dokter",
      icon: "📄",
      link: "#"
    },
    {
      title: "Dispensing Obat",
      description: "Siapkan obat sesuai resep terverifikasi",
      icon: "💊",
      link: "#"
    },
    {
      title: "Kontrol Inventaris",
      description: "Pantau ketersediaan stok obat & exp. date",
      icon: "📦",
      link: "#"
    },
    {
      title: "Laporan Apotek",
      description: "Lihat laporan harian dispensing obat",
      icon: "📊",
      link: "#"
    },
    {
      title: "Profil Apoteker",
      description: "Kelola data apoteker & nomor STRA",
      icon: "👤",
      link: "#"
    }
  ];

  const recentDispensing = [
    { id: 1, date: "2026-01-15", recipeId: "RSP-2026-099", doctor: "Dr. Sarah Wijaya", item: "Amoxicillin 500mg", status: "Selesai" },
    { id: 2, date: "2026-01-10", recipeId: "RSP-2026-095", doctor: "Dr. Ahmad Hidayat", item: "Susu Formula Bayi", status: "Selesai" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/60 font-sans text-gray-800">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 px-4 md:px-10 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">Dashboard Apoteker</h1>
            <p className="text-sm text-gray-500">Selamat datang, Apoteker!</p>
          </div>
          <div className="flex gap-3">
            <Link 
              to="/" 
              className="bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold py-2 px-4 rounded-xl transition-all text-sm"
            >
              Beranda
            </Link>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 rounded-[2rem] p-6 md:p-8 text-white mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-extrabold mb-2">Apoteker Farmasi Sehat</h2>
              <p className="text-purple-50 text-sm mb-4">No. STRA: STRA-2026-JKT-1122</p>
              <div className="flex gap-6">
                <div>
                  <p className="text-3xl font-extrabold">24</p>
                  <p className="text-xs text-purple-100">Resep Masuk Hari Ini</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold">180</p>
                  <p className="text-xs text-purple-100">Obat Terdispensasi</p>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-sm font-bold mb-1">Status Shift</p>
              <p className="text-xs text-purple-100">Aktif - Shift Pagi</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {pharmacistFeatures.map((feat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="text-3xl mb-3">{feat.icon}</div>
              <h3 className="font-extrabold text-sm text-gray-900 mb-1">{feat.title}</h3>
              <p className="text-xs text-gray-400 font-medium mb-3">{feat.description}</p>
              <a href={feat.link} className="text-xs font-bold text-purple-600 hover:underline">Buka Fitur →</a>
            </div>
          ))}
        </div>

        {/* Recent dispensing */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-extrabold text-gray-900 mb-6">Dispensasi Obat Terbaru</h2>
          <div className="space-y-4">
            {recentDispensing.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 gap-4">
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.recipeId} - {item.item}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Tanggal: {item.date} | Dokter Pengirim: {item.doctor}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-purple-50 text-purple-700 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-purple-100">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
