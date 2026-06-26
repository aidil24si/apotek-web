import React from 'react';
import { Link } from 'react-router-dom';

export default function DemoDashboard() {
  return (
    <div className="min-h-screen bg-gray-50/60 font-sans text-gray-800">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 px-4 md:px-10 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">Dashboard Admin (Demo)</h1>
            <p className="text-sm text-gray-500">Akses tanpa login - Untuk testing</p>
          </div>
          <div className="flex gap-3">
            <Link 
              to="/member" 
              className="bg-purple-50 hover:bg-purple-100 text-purple-600 font-bold py-2 px-4 rounded-xl transition-all text-sm"
            >
              Member Dashboard
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
        {/* Info Banner */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-6">
          <p className="text-sm text-yellow-800 font-bold">
            ⚠️ Mode Demo: Ini adalah halaman dashboard tanpa autentikasi. Untuk production, gunakan ProtectedRoute.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-400 mb-2">Total Obat</h3>
            <p className="text-3xl font-extrabold text-gray-900">156</p>
            <p className="text-xs text-green-600 font-bold mt-2">+12 bulan ini</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-400 mb-2">Total Pasien</h3>
            <p className="text-3xl font-extrabold text-gray-900">1,234</p>
            <p className="text-xs text-green-600 font-bold mt-2">+89 bulan ini</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-400 mb-2">Pesanan Hari Ini</h3>
            <p className="text-3xl font-extrabold text-gray-900">23</p>
            <p className="text-xs text-blue-600 font-bold mt-2">8 pending</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
          <h2 className="text-lg font-extrabold text-gray-900 mb-6">Aksi Cepat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              to="/inventory"
              className="p-4 rounded-xl border border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="text-3xl mb-2">📦</div>
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-600">Kelola Inventaris</h3>
            </Link>
            <Link 
              to="/orders"
              className="p-4 rounded-xl border border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="text-3xl mb-2">🛒</div>
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-600">Lihat Pesanan</h3>
            </Link>
            <Link 
              to="/customers"
              className="p-4 rounded-xl border border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-600">Data Pasien</h3>
            </Link>
            <Link 
              to="/"
              className="p-4 rounded-xl border border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="text-3xl mb-2">🏠</div>
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-600">Ke Beranda</h3>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-extrabold text-gray-900 mb-6">Aktivitas Terbaru</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Pesanan baru dari <strong>Ahmad</strong></p>
                <p className="text-xs text-gray-500 mt-1">Paracetamol 500mg x 2 - Rp 30.000</p>
              </div>
              <span className="text-xs text-gray-400">2 menit lalu</span>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100">
              <div className="w-2 h-2 rounded-full bg-green-600 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Stok <strong>Vitamin C</strong> diperbarui</p>
                <p className="text-xs text-gray-500 mt-1">Stok lama: 100 → Stok baru: 124</p>
              </div>
              <span className="text-xs text-gray-400">15 menit lalu</span>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100">
              <div className="w-2 h-2 rounded-full bg-purple-600 mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Member baru: <strong>Siti Nurhaliza</strong></p>
                <p className="text-xs text-gray-500 mt-1">Bergabung sebagai member Gold</p>
              </div>
              <span className="text-xs text-gray-400">1 jam lalu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}