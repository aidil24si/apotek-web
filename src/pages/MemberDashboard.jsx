import React from 'react';
import { Link } from 'react-router-dom';

export default function MemberDashboard() {
  const memberFeatures = [
    {
      title: "Riwayat Pembelian",
      description: "Lihat riwayat transaksi dan pembelian obat Anda",
      icon: "📋",
      link: "#"
    },
    {
      title: "Poin & Reward",
      description: "Kumpulkan poin dari setiap pembelian untuk dapatkan diskon",
      icon: "🎁",
      link: "#"
    },
    {
      title: "Katalog Obat",
      description: "Browse katalog obat dan suplemen yang tersedia",
      icon: "💊",
      link: "#"
    },
    {
      title: "Konsultasi Online",
      description: "Chat dengan apoteker untuk konsultasi obat",
      icon: "💬",
      link: "#"
    },
    {
      title: "Resep Elektronik",
      description: "Lihat dan kelola resep dokter Anda",
      icon: "📄",
      link: "#"
    },
    {
      title: "Profil Saya",
      description: "Kelola data pribadi dan alamat pengiriman",
      icon: "👤",
      link: "#"
    }
  ];

  const recentTransactions = [
    { id: 1, date: "2026-01-15", item: "Vitamin C 1000mg", amount: "Rp 85.000", status: "Selesai" },
    { id: 2, date: "2026-01-10", item: "Paracetamol 500mg", amount: "Rp 15.000", status: "Selesai" },
    { id: 3, date: "2026-01-05", item: "Omega 3 Fish Oil", amount: "Rp 150.000", status: "Selesai" },
  ];

  return (
    <div className="min-h-screen bg-gray-50/60 font-sans text-gray-800">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 px-4 md:px-10 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">Dashboard Member</h1>
            <p className="text-sm text-gray-500">Selamat datang, Member!</p>
          </div>
          <div className="flex gap-3">
            <Link 
              to="/dashboard" 
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-2 px-4 rounded-xl transition-all text-sm"
            >
              Admin Dashboard
            </Link>
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
        {/* Member Info Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-[2rem] p-6 md:p-8 text-white mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-extrabold mb-2">Member Gold</h2>
              <p className="text-blue-50 text-sm mb-4">ID Member: APK-2026-001234</p>
              <div className="flex gap-6">
                <div>
                  <p className="text-3xl font-extrabold">1,250</p>
                  <p className="text-xs text-blue-100">Total Poin</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold">Rp 250.000</p>
                  <p className="text-xs text-blue-100">Total Belanja</p>
                </div>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-sm font-bold mb-1">Tier Berikutnya</p>
              <p className="text-xs text-blue-100">250 poin lagi ke Platinum</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {memberFeatures.map((feature, idx) => (
            <Link
              key={idx}
              to={feature.link}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </Link>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-extrabold text-gray-900 mb-6">Transaksi Terakhir</h2>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-100 transition-all"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{transaction.item}</h3>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-blue-600 text-sm mb-1">{transaction.amount}</p>
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-lg font-bold">
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
            Lihat Semua Transaksi
          </button>
        </div>
      </div>
    </div>
  );
}