import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaCapsules, FaPrescription } from "react-icons/fa";

export default function Dashboard() {
    return (
        <div id="dashboard-container" className="p-10 animate-in fade-in duration-700">
            {/* Grid Stat Cards */}
            <div id="dashboard-grid" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={<FaShoppingCart />} count="124" label="Total Transaksi" color="biru" />
                <StatCard icon={<FaCapsules />} count="1.2k" label="Obat Terjual" color="biru" />
                <StatCard icon={<FaBan />} count="12" label="Resep Ditolak" color="red" />
                <StatCard icon={<FaDollarSign />} count="Rp 8.4M" label="Total Omzet" color="biru" />
            </div>

            <div id="extra-dashboard-component" className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 1. Chart Box: Penjualan Apotek */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-sm border border-gray-50">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-black text-gray-800">Sales Analytics</h3>
                            <p className="text-xs text-gray-400">Statistik penjualan obat 7 hari terakhir</p>
                        </div>
                        <span className="text-[10px] font-bold text-biru bg-biru/10 px-4 py-2 rounded-full border border-biru/20 uppercase tracking-widest">Apotek Live</span>
                    </div>
                    <div className="h-72 w-full bg-gray-50 rounded-[2rem] flex items-center justify-center border-2 border-dashed border-gray-200">
                         {/* Bar Chart Sederhana (Warna Biru) */}
                         <div className="flex items-end gap-3 h-40">
                            {[60, 45, 90, 55, 100, 80, 85].map((h, i) => (
                                <div key={i} style={{height: `${h}%`}} className="w-8 bg-biru rounded-t-xl opacity-80 hover:opacity-100 transition-opacity cursor-pointer"></div>
                            ))}
                         </div>
                    </div>
                </div>
                
                {/* 2. Recent Activity: Log Apotek */}
                <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-50">
                    <h3 className="text-xl font-black text-gray-800 mb-6">Aktivitas Sistem</h3>
                    <div className="space-y-6">
                        {[
                            { user: "Apoteker_Sari", action: "Verifikasi Resep #882", time: "2 menit yang lalu", color: "text-biru" },
                            { user: "System_Alert", action: "Stok Paracetamol < 50!", time: "15 menit yang lalu", color: "text-red-500 font-bold" },
                            { user: "Kasir_Budi", action: "Input Penjualan Baru", time: "45 menit yang lalu", color: "text-gray-500" },
                            { user: "Admin", action: "Update Master Data Obat", time: "2 jam yang lalu", color: "text-biru" },
                        ].map((log, index) => (
                            <div key={index} className="flex gap-4 items-start border-l-2 border-biru/20 pl-4 relative">
                                <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-biru"></div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-800">{log.user}</span>
                                    <span className={`text-[11px] ${log.color}`}>{log.action}</span>
                                    <span className="text-[10px] text-gray-300 mt-1 uppercase font-bold">{log.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 bg-gray-50 text-gray-400 text-xs font-bold rounded-2xl hover:bg-biru/10 hover:text-biru transition-all border border-transparent hover:border-biru/20">
                        Lihat Semua Log
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, count, label, color }) {
    // FOKUS: Penyesuaian warna ke variabel 'biru'
    const colorClass = color === "red" ? "bg-red-50 text-red-500" : "bg-biru/10 text-biru";
    return (
        <div className="flex items-center gap-6 rounded-[2.5rem] bg-white p-8 shadow-sm border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className={`flex h-20 w-20 items-center justify-center rounded-full text-4xl ${colorClass}`}>
                {icon}
            </div>
            <div className="flex flex-col gap-1">
                <span className="font-poppins text-4xl font-black text-gray-900 leading-tight">{count}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
            </div>
        </div>
    );
}