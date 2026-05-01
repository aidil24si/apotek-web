import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaUserCircle } from "react-icons/fa";

export default function Dashboard() {
    return (
        <div id="dashboard-container" className="p-10 animate-in fade-in duration-700">
            {/* Grid Stat Cards */}
            <div id="dashboard-grid" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={<FaShoppingCart />} count="75" label="Total Orders" color="green" />
                <StatCard icon={<FaTruck />} count="357" label="Total Delivered" color="green" />
                <StatCard icon={<FaBan />} count="65" label="Total Canceled" color="red" />
                <StatCard icon={<FaDollarSign />} count="$128" label="Total Revenue" color="green" />
            </div>

            <div id="extra-dashboard-component" className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 1. Chart Box (Tetap karena Admin butuh data visual) */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-sm border border-gray-50">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-black text-gray-800">Revenue Analytics</h3>
                            <p className="text-xs text-gray-400">Statistik pendapatan minggu ini</p>
                        </div>
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-100 uppercase tracking-widest">Live Report</span>
                    </div>
                    <div className="h-72 w-full bg-gray-50 rounded-[2rem] flex items-center justify-center border-2 border-dashed border-gray-200">
                         {/* Bar Chart Sederhana */}
                         <div className="flex items-end gap-3 h-40">
                            {[60, 40, 80, 50, 90, 70, 85].map((h, i) => (
                                <div key={i} style={{height: `${h}%`}} className="w-8 bg-green-500 rounded-t-xl opacity-80 hover:opacity-100 transition-opacity cursor-pointer"></div>
                            ))}
                         </div>
                    </div>
                </div>
                
                {/* 2. IMPROVISASI BARU: RECENT SYSTEM ACTIVITY (Sangat Relevan buat Admin) */}
                <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-50">
                    <h3 className="text-xl font-black text-gray-800 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[
                            { user: "Kasir_Andi", action: "Update Order #102", time: "2 menit yang lalu", color: "text-blue-500" },
                            { user: "Kitchen_Bot", action: "Stock Ayam Menipis!", time: "10 menit yang lalu", color: "text-red-500 font-bold" },
                            { user: "Admin_Budi", action: "Login ke System", time: "1 jam yang lalu", color: "text-gray-500" },
                        ].map((log, index) => (
                            <div key={index} className="flex gap-4 items-start border-l-2 border-green-100 pl-4 relative">
                                <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-green-500"></div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-800">{log.user}</span>
                                    <span className={`text-[11px] ${log.color}`}>{log.action}</span>
                                    <span className="text-[10px] text-gray-300 mt-1 uppercase font-bold">{log.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-8 py-3 bg-gray-50 text-gray-400 text-xs font-bold rounded-2xl hover:bg-green-50 hover:text-green-600 transition-all border border-transparent hover:border-green-100">
                        View All System Logs
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, count, label, color }) {
    const colorClass = color === "red" ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500";
    return (
        <div className="flex items-center gap-6 rounded-[2.5rem] bg-white p-8 shadow-sm border border-gray-50 transition-all hover:shadow-xl hover:-translate-y-1">
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