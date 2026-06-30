import React from 'react';
import { Link } from 'react-router-dom';

export default function DoctorDashboard() {
  const doctorFeatures = [
    {
      title: "Jadwal Konsultasi",
      description: "Lihat dan kelola jadwal konsultasi dengan pasien",
      icon: "📅",
      link: "#"
    },
    {
      title: "Resep Elektronik",
      description: "Buat dan kirim e-resep langsung ke apotek",
      icon: "✍️",
      link: "#"
    },
    {
      title: "Rekam Medis Pasien",
      description: "Akses riwayat medis dan alergi pasien",
      icon: "📂",
      link: "#"
    },
    {
      title: "Chat Pasien",
      description: "Konsultasi chat aktif dengan pasien",
      icon: "💬",
      link: "#"
    },
    {
      title: "Profil Medis",
      description: "Kelola data dokter dan spesialisasi",
      icon: "👤",
      link: "#"
    }
  ];

  const recentConsultations = [
    { id: 1, date: "2026-01-15", patient: "Budi Santoso", status: "Selesai", notes: "Flu ringan, resep paracetamol" },
    { id: 2, date: "2026-01-10", patient: "Siti Aminah", status: "Selesai", notes: "Kontrol vitamin C" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/60 font-sans text-gray-800">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 px-4 md:px-10 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">Dashboard Dokter</h1>
            <p className="text-sm text-gray-500">Selamat datang, Dokter!</p>
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
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-[2rem] p-6 md:p-8 text-white mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-extrabold mb-2">Dr. Rafi - Spesialis Umum</h2>
              <p className="text-emerald-50 text-sm mb-4">No. SIP: SIP-2026-DLM-9912</p>
              <div className="flex gap-6">
                <div>
                  <p className="text-3xl font-extrabold">12</p>
                  <p className="text-xs text-emerald-100">Konsultasi Hari Ini</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold">85</p>
                  <p className="text-xs text-emerald-100">Resep Terkirim</p>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-sm font-bold mb-1">Status Praktek</p>
              <p className="text-xs text-emerald-100">Aktif - Menerima Pasien</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {doctorFeatures.map((feat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="text-3xl mb-3">{feat.icon}</div>
              <h3 className="font-extrabold text-sm text-gray-900 mb-1">{feat.title}</h3>
              <p className="text-xs text-gray-400 font-medium mb-3">{feat.description}</p>
              <a href={feat.link} className="text-xs font-bold text-emerald-600 hover:underline">Buka Fitur →</a>
            </div>
          ))}
        </div>

        {/* Recent consultations */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-extrabold text-gray-900 mb-6">Konsultasi Terbaru</h2>
          <div className="space-y-4">
            {recentConsultations.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 gap-4">
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.patient}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Tanggal: {item.date} | Catatan: {item.notes}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-100">
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
