import { HiOutlineUserGroup, HiOutlineUserAdd, HiOutlineClipboardList, HiOutlineCash, HiOutlineSearch, HiOutlineDocumentText } from "react-icons/hi";
import { FaStethoscope } from "react-icons/fa";
import { IoLinkOutline } from "react-icons/io5";
// Pastikan path import ini sesuai dengan struktur folder Anda
import PageHeader from "../components/PageHeader"; 

export default function Dashboard() {
    return (
        <div className="pb-10 font-sans">
            
            {/* Menggunakan Komponen PageHeader yang sudah kita buat */}
            <PageHeader 
                title="Dashboard Admin" 
                breadcrumb={["Dashboard", "Overview"]}
            >
                <button className="bg-[#2563EB] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                    <HiOutlineUserAdd className="text-base md:text-lg" /> 
                    {/* Teks disembunyikan di HP, hanya ikon yang tampil agar tidak sempit */}
                    <span className="hidden md:inline">Tambah User</span>
                </button>
            </PageHeader>

            {/* 1. TOP STAT CARDS (4 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <StatCard icon={<HiOutlineUserGroup />} count="3" label="Total Pasien Hari Ini" sub="1 pasien baru" color="blue" />
                <StatCard icon={<FaStethoscope />} count="8" label="Total Apoteker" sub="Aktif" color="green" />
                <StatCard icon={<HiOutlineClipboardList />} count="1" label="E-Resep Hari Ini" sub="1 baru" color="purple" />
                <StatCard icon={<HiOutlineCash />} count="Rp 0.0 Jt" label="Pendapatan Hari Ini" sub="0 transaksi" color="yellow" />
            </div>

            {/* 2. MIDDLE CHARTS (2 Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Kunjungan Pasien (Horizontal Bar) - 7 Hari Lengkap */}
                <div className="lg:col-span-2 bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-6">Kunjungan Pelanggan (7 Hari Terakhir)</h3>
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
                </div>

                {/* Pendapatan per Kategori */}
                <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-6">Pendapatan per Kategori</h3>
                    <div className="space-y-6">
                        <CategoryProgress label="Obat Bebas (OTC)" price="Rp 75.000.000" color="bg-[#2563EB]" percent="w-[90%]" />
                        <CategoryProgress label="Obat Resep" price="Rp 35.000.000" color="bg-[#22C55E]" percent="w-[45%]" />
                        <CategoryProgress label="Alat Kesehatan" price="Rp 15.000.000" color="bg-[#A855F7]" percent="w-[20%]" />
                    </div>
                </div>
            </div>

            {/* 3. MANAJEMEN USER TABLE */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden mb-8">
                <div className="p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <h3 className="font-bold text-gray-900">Manajemen User</h3>
                    <div className="relative w-full md:w-auto">
                        <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input type="text" placeholder="Cari user..." className="pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent focus:border-[#2563EB] focus:bg-white rounded-xl text-sm outline-none transition-all w-full md:w-64" />
                    </div>
                </div>
                
                {/* Wrapper overflow-x-auto agar tabel responsif di mobile */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Nama</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[
                                { name: "Dr. Sarah Wijaya", role: "Dokter", email: "sarah@apoteksehat.com" },
                                { name: "Apt. Ahmad Hidayat", role: "Apoteker", email: "ahmad@apoteksehat.com" },
                                { name: "Siti Kasir", role: "Kasir", email: "siti@apoteksehat.com" },
                                { name: "Budi Pendaftaran", role: "Admin", email: "budi@apoteksehat.com" },
                            ].map((user, i) => (
                                <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-500 font-medium">{user.role}</td>
                                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">Aktif</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="text-gray-400 hover:text-[#2563EB] font-bold text-xs transition-colors">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

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

// Sub-komponen (Ditempatkan di file yang sama)
function StatCard({ icon, count, label, sub, color }) {
    const colors = {
        // Menggunakan warna biru brand
        blue: "bg-blue-50 text-[#2563EB]",
        green: "bg-green-50 text-green-600",
        purple: "bg-purple-50 text-purple-600",
        yellow: "bg-orange-50 text-orange-500"
    };
    return (
        <div className="bg-white p-5 md:p-6 rounded-[24px] border border-gray-100 shadow-sm flex items-start gap-4 transition-all hover:shadow-md hover:border-blue-100 group">
            <div className={`p-4 rounded-2xl text-2xl group-hover:scale-110 transition-transform ${colors[color]}`}>{icon}</div>
            <div>
                <div className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{count}</div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{label}</p>
                <p className={`text-[10px] mt-1.5 font-bold ${color === 'green' ? 'text-green-500' : 'text-orange-400'}`}>{sub}</p>
            </div>
        </div>
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

function SummaryCard({ title, children }) {
    return (
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-900 mb-6">{title}</h3>
            <div className="space-y-3.5">{children}</div>
        </div>
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

function SummaryButton({ label, icon }) {
    return (
        <button className="w-full mt-6 py-3 bg-gray-50 border border-transparent rounded-xl text-xs font-bold text-gray-600 flex items-center justify-center gap-2 hover:bg-[#2563EB] hover:text-white transition-all group active:scale-95">
            <span className="group-hover:scale-110 transition-transform">{icon}</span> {label}
        </button>
    );
}