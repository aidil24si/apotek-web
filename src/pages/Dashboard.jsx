import React from "react";
import { 
  HiOutlineUserGroup, 
  HiOutlineUserAdd, 
  HiOutlineClipboardList, 
  HiOutlineCash, 
  HiOutlineSearch, 
  HiOutlineDocumentText 
} from "react-icons/hi";
import { FaStethoscope } from "react-icons/fa";
import { IoLinkOutline } from "react-icons/io5";

// Import komponen Shadcn UI dari folder ui/
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../components/ui/table";

// Pastikan path import ini sesuai dengan struktur folder Anda
import PageHeader from "../components/PageHeader"; 

export default function Dashboard() {
  return (
    <div className="pb-10 font-sans bg-slate-50/50 p-4 md:p-6 min-h-screen">
      
      {/* PageHeader dengan Button Shadcn UI */}
      <PageHeader 
        title="Dashboard Admin" 
        breadcrumb={["Dashboard", "Overview"]}
      >
        <Button variant="default" className="shadow-lg shadow-blue-600/20 active:scale-95 gap-2 bg-[#2563EB] hover:bg-blue-700">
          <HiOutlineUserAdd className="text-base md:text-lg" /> 
          <span className="hidden md:inline">Tambah User</span>
        </Button>
      </PageHeader>

      {/* 1. TOP STAT CARDS (4 Columns) - Menggunakan Varian StatCard Asli */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard icon={<HiOutlineUserGroup />} count="3" label="Total Pasien Hari Ini" sub="1 pasien baru" color="blue" />
        <StatCard icon={<FaStethoscope />} count="8" label="Total Apoteker" sub="Aktif" color="green" />
        <StatCard icon={<HiOutlineClipboardList />} count="1" label="E-Resep Hari Ini" sub="1 baru" color="purple" />
        <StatCard icon={<HiOutlineCash />} count="Rp 0.0 Jt" label="Pendapatan Hari Ini" sub="0 transaksi" color="yellow" />
      </div>

      {/* 2. MIDDLE CHARTS (2 Columns) - Dibungkus Card Shadcn UI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Kunjungan Pasien (Horizontal Bar) */}
        <Card className="lg:col-span-2 rounded-[24px] border border-gray-100 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-base font-bold text-gray-900">Kunjungan Pelanggan (7 Hari Terakhir)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { day: "Senin", val: 45 },
                { day: "Selasa", val: 52 },
                { day: "Rabu", val: 48 },
                { day: "Kamis", val: 61 },
                { day: "Jumat", val: 55 },
                { day: "Sabtu", val: 38 },
                { day: "Minggu", val: 42 },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-xs text-gray-400 w-12 font-medium">{item.day}</span>
                  <div className="flex-1 bg-gray-50 h-7 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${item.val}%` }} 
                      className="bg-[#2563EB] h-full flex items-center justify-end pr-3 transition-all duration-500"
                    >
                      <span className="text-[10px] text-white font-bold">{item.val}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pendapatan per Kategori */}
        <Card className="rounded-[24px] border border-gray-100 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-base font-bold text-gray-900">Pendapatan per Kategori</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <CategoryProgress label="Obat Bebas (OTC)" price="Rp 75.000.000" color="bg-[#2563EB]" percent="w-[90%]" />
            <CategoryProgress label="Obat Resep" price="Rp 35.000.000" color="bg-[#22C55E]" percent="w-[45%]" />
            <CategoryProgress label="Alat Kesehatan" price="Rp 15.000.000" color="bg-[#A855F7]" percent="w-[20%]" />
          </CardContent>
        </Card>
      </div>

      {/* 3. MANAJEMEN USER TABLE - Menggunakan Table & Input Shadcn UI */}
      <Card className="rounded-[24px] border border-gray-100 shadow-sm overflow-hidden mb-8 bg-white">
        <div className="p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h3 className="font-bold text-gray-900">Manajemen User</h3>
          <div className="relative w-full md:w-auto flex items-center">
            <HiOutlineSearch className="absolute left-3.5 text-gray-400 text-lg z-10" />
            <Input 
              type="text" 
              placeholder="Cari user..." 
              className="pl-10 pr-4 bg-gray-50 border-none focus-visible:ring-[#2563EB] focus-visible:bg-white rounded-xl text-sm w-full md:w-64" 
            />
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-6 py-4">Nama</TableHead>
              <TableHead className="px-6 py-4">Role</TableHead>
              <TableHead className="px-6 py-4">Email</TableHead>
              <TableHead className="px-6 py-4">Status</TableHead>
              <TableHead className="px-6 py-4 text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { name: "Dr. Sarah Wijaya", role: "Dokter", email: "sarah@apoteksehat.com" },
              { name: "Apt. Ahmad Hidayat", role: "Apoteker", email: "ahmad@apoteksehat.com" },
              { name: "Siti Kasir", role: "Kasir", email: "siti@apoteksehat.com" },
              { name: "Budi Pendaftaran", role: "Admin", email: "budi@apoteksehat.com" },
            ].map((user, i) => (
              <TableRow key={i} className="hover:bg-blue-50/50 transition-colors">
                <TableCell className="px-6 py-4 font-bold text-gray-900">{user.name}</TableCell>
                <TableCell className="px-6 py-4 text-gray-500 font-medium">{user.role}</TableCell>
                <TableCell className="px-6 py-4 text-gray-500">{user.email}</TableCell>
                <TableCell className="px-6 py-4">
                  <Badge variant="success" className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wide font-bold">
                    Aktif
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 text-center">
                  <Button variant="outline" className="h-8 border-none text-gray-400 hover:text-[#2563EB] font-bold text-xs bg-transparent hover:bg-transparent">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* 4. BOTTOM GRID: LAPORAN & STOK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SummaryCard title="Laporan Keuangan">
          <SummaryRow label="Total Pemasukan" value="Rp 125.000.000" />
          <SummaryRow label="Total Pengeluaran" value="Rp 45.000.000" />
          <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900">Laba Bersih</span>
            <span className="text-sm font-bold text-green-500">Rp 80.000.000</span>
          </div>
          <SummaryButton label="Lihat Detail" icon={<HiOutlineDocumentText />} />
        </SummaryCard>

        <SummaryCard title="Laporan Penjualan">
          <SummaryRow label="Total Transaksi" value="341" />
          <SummaryRow label="Pelanggan Baru" value="128" />
          <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900">Rata-rata/Hari</span>
            <span className="text-sm font-bold text-[#2563EB]">49</span>
          </div>
          <SummaryButton label="Lihat Detail" icon={<HiOutlineDocumentText />} />
        </SummaryCard>

        <SummaryCard title="Stok Obat">
          <SummaryRow label="Total Jenis Obat" value="248" />
          <SummaryRow label="Stok Menipis" value="15" valueColor="text-orange-500" />
          <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900">Perlu Restock</span>
            <span className="text-sm font-bold text-red-500">5</span>
          </div>
          <SummaryButton label="Kelola Stok" icon={<IoLinkOutline />} />
        </SummaryCard>
      </div>
    </div>
  );
}

// Sub-komponen Lokal dengan sentuhan animasi/style aslimu
function StatCard({ icon, count, label, sub, color }) {
  const colors = {
    blue: "bg-blue-50 text-[#2563EB]",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    yellow: "bg-orange-50 text-orange-500"
  };
  return (
    <Card className="rounded-[24px] border border-gray-100 shadow-sm flex items-start gap-4 p-5 md:p-6 bg-white transition-all hover:shadow-md hover:border-blue-100 group">
      <div className={`p-4 rounded-2xl text-2xl group-hover:scale-110 transition-transform ${colors[color]}`}>{icon}</div>
      <div>
        <div className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{count}</div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{label}</p>
        <p className={`text-[10px] mt-1.5 font-bold ${color === 'green' ? 'text-green-500' : 'text-orange-400'}`}>{sub}</p>
      </div>
    </Card>
  );
}

function CategoryProgress({ label, price, color, percent }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-2.5">
        <span className="text-gray-500 font-medium">{label}</span>
        <span className="font-bold text-gray-900">{price}</span>
      </div>
      <div className="w-full bg-gray-50 h-2.5 rounded-full overflow-hidden">
        <div className={`${color} h-full ${percent} rounded-full transition-all duration-700`}></div>
      </div>
    </div>
  );
}

// Mengganti box bawaan menjadi Shadcn Card
function SummaryCard({ title, children }) {
  return (
    <Card className="p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white">
      <h3 className="font-bold text-gray-900 mb-6">{title}</h3>
      <div className="space-y-3.5">{children}</div>
    </Card>
  );
}

function SummaryRow({ label, value, valueColor = "text-gray-900" }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500 font-medium">{label}</span>
      <span className={`text-sm font-bold ${valueColor}`}>{value}</span>
    </div>
  );
}

// Menggunakan Button Shadcn UI untuk SummaryButton
function SummaryButton({ label, icon }) {
  return (
    <Button variant="secondary" className="w-full mt-6 py-6 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#2563EB] hover:text-white transition-all group active:scale-95">
      <span className="group-hover:scale-110 transition-transform">{icon}</span> {label}
    </Button>
  );
}