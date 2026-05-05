import { HiOutlineUserGroup, HiOutlineUserAdd, HiOutlineClipboardList, HiOutlineCash, HiOutlineSearch, HiOutlineDocumentText, HiOutlineDatabase } from "react-icons/hi";
import { FaStethoscope } from "react-icons/fa";
import { IoLinkOutline } from "react-icons/io5";

export default function Dashboard() {
    return (
        <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans">
            {/* Header Dashboard */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-[#111827]">Dashboard Admin</h1>
                    <p className="text-sm text-[#6B7280]">Kelola sistem dan data klinik</p>
                </div>
                <button className="bg-[#2563EB] text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                    <HiOutlineUserAdd className="text-lg" /> Tambah User
                </button>
            </div>

            {/* 1. TOP STAT CARDS (4 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={<HiOutlineUserGroup />} count="3" label="Total Pasien Hari Ini" sub="1 pasien baru" color="blue" />
                <StatCard icon={<FaStethoscope />} count="8" label="Total Dokter" sub="Aktif" color="green" />
                <StatCard icon={<HiOutlineClipboardList />} count="1" label="E-Resep Hari Ini" sub="1 baru" color="purple" />
                <StatCard icon={<HiOutlineCash />} count="Rp 0.0 Jt" label="Pendapatan Hari Ini" sub="0 transaksi" color="yellow" />
            </div>

            {/* 2. MIDDLE CHARTS (2 Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Kunjungan Pasien (Horizontal Bar) - 7 Hari Lengkap */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-[#111827] mb-6">Kunjungan Pasien (7 Hari Terakhir)</h3>
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
                                <span className="text-xs text-gray-400 w-12">{item.day}</span>
                                <div className="flex-1 bg-gray-100 h-7 rounded-full overflow-hidden">
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
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-[#111827] mb-6">Pendapatan per Kategori</h3>
                    <div className="space-y-6">
                        <CategoryProgress label="Konsultasi Dokter" price="Rp 75.000.000" color="bg-[#2563EB]" percent="w-[90%]" />
                        <CategoryProgress label="Penjualan Obat" price="Rp 35.000.000" color="bg-[#22C55E]" percent="w-[45%]" />
                        <CategoryProgress label="Tindakan Medis" price="Rp 15.000.000" color="bg-[#A855F7]" percent="w-[20%]" />
                    </div>
                </div>
            </div>

            {/* 3. MANAJEMEN USER TABLE */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
                <div className="p-6 flex justify-between items-center">
                    <h3 className="font-bold text-[#111827]">Manajemen User</h3>
                    <div className="relative">
                        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Cari user..." className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-100 w-64" />
                    </div>
                </div>
                <table className="w-full text-left text-sm">
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
                            { name: "Dr. Sarah Wijaya", role: "Dokter", email: "sarah@klinik.com" },
                            { name: "Apt. Ahmad Hidayat", role: "Apoteker", email: "ahmad@klinik.com" },
                            { name: "Siti Kasir", role: "Kasir", email: "siti@klinik.com" },
                            { name: "Budi Pendaftaran", role: "Pendaftaran", email: "budi@klinik.com" },
                        ].map((user, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-[#111827]">{user.name}</td>
                                <td className="px-6 py-4 text-[#6B7280]">{user.role}</td>
                                <td className="px-6 py-4 text-[#6B7280]">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-[#DCFCE7] text-[#15803D] px-3 py-1 rounded-full text-[10px] font-bold uppercase">Aktif</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className="text-[#111827] font-bold text-xs hover:text-blue-600">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 4. BOTTOM GRID: LAPORAN & STOK (Persis Figma) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SummaryCard title="Laporan Keuangan">
                    <SummaryRow label="Total Pemasukan" value="Rp 125.000.000" />
                    <SummaryRow label="Total Pengeluaran" value="Rp 45.000.000" />
                    <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm font-bold text-[#111827]">Laba Bersih</span>
                        <span className="text-sm font-bold text-[#22C55E]">Rp 80.000.000</span>
                    </div>
                    <SummaryButton label="Lihat Detail" icon={<HiOutlineDocumentText />} />
                </SummaryCard>

                <SummaryCard title="Laporan Medis">
                    <SummaryRow label="Total Kunjungan" value="341" />
                    <SummaryRow label="Pasien Baru" value="128" />
                    <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm font-bold text-[#111827]">Rata-rata/Hari</span>
                        <span className="text-sm font-bold text-[#2563EB]">49</span>
                    </div>
                    <SummaryButton label="Lihat Detail" icon={<HiOutlineDocumentText />} />
                </SummaryCard>

                <SummaryCard title="Stok Obat">
                    <SummaryRow label="Total Jenis Obat" value="248" />
                    <SummaryRow label="Stok Menipis" value="15" valueColor="text-orange-500" />
                    <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm font-bold text-[#111827]">Perlu Restock</span>
                        <span className="text-sm font-bold text-red-500">5</span>
                    </div>
                    <SummaryButton label="Kelola Stok" icon={<IoLinkOutline />} />
                </SummaryCard>
            </div>
        </div>
    );
}

// Sub-komponen agar kode rapi
function StatCard({ icon, count, label, sub, color }) {
    const colors = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        purple: "bg-purple-50 text-purple-600",
        yellow: "bg-yellow-50 text-yellow-600"
    };
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
            <div className={`p-4 rounded-xl text-2xl ${colors[color]}`}>{icon}</div>
            <div>
                <div className="text-2xl font-bold text-[#111827]">{count}</div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                <p className={`text-[10px] mt-1 font-bold ${color === 'green' ? 'text-green-500' : 'text-orange-400'}`}>{sub}</p>
            </div>
        </div>
    );
}

function CategoryProgress({ label, price, color, percent }) {
    return (
        <div>
            <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-500">{label}</span>
                <span className="font-bold text-[#111827]">{price}</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className={`${color} h-full ${percent} rounded-full transition-all duration-700`}></div>
            </div>
        </div>
    );
}

function SummaryCard({ title, children }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-[#111827] mb-6">{title}</h3>
            <div className="space-y-3">{children}</div>
        </div>
    );
}

function SummaryRow({ label, value, valueColor = "text-[#111827]" }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{label}</span>
            <span className={`text-sm font-bold ${valueColor}`}>{value}</span>
        </div>
    );
}

function SummaryButton({ label, icon }) {
    return (
        <button className="w-full mt-6 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-[#111827] flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
            {icon} {label}
        </button>
    );
}