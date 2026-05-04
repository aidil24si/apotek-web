import { useState } from "react";
import ordersData from "../data/orders.json";
import PageHeader from "../components/PageHeader";
import { FaSearch, FaFileDownload } from "react-icons/fa";

export default function Order() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    // Fungsi helper untuk warna badge status
    const getStatusColor = (status) => {
        switch (status) {
            case "Completed": return "bg-blue-100 text-biru"; // Biru untuk selesai
            case "Pending": return "bg-amber-100 text-amber-600"; // Amber untuk menunggu
            case "Cancelled": return "bg-red-100 text-red-600"; // Merah untuk batal
            default: return "bg-gray-100 text-gray-600";
        }
    };

    // Logika Filtering
    const filteredOrders = (ordersData || []).filter(order => {
        const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-8 animate-in fade-in duration-700">
            <PageHeader title="Daftar Pesanan" breadcrumb={["Dashboard", "Order List"]}>
                <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm">
                    <FaFileDownload className="text-biru" />
                    <span>Export Laporan</span>
                </button>
            </PageHeader>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 mt-6">
                {/* Toolbar: Search & Filter */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-6">
                    <div className="relative w-full lg:w-96">
                        <input 
                            type="text"
                            placeholder="Cari Nama Pelanggan atau ID..."
                            className="w-full p-4 bg-gray-50 rounded-2xl outline-none border border-transparent focus:border-biru focus:bg-white focus:ring-4 focus:ring-biru/10 transition-all pl-12"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-4 top-5 text-gray-300" />
                    </div>

                    <div className="flex gap-2 p-1.5 bg-gray-50 rounded-2xl overflow-x-auto w-full lg:w-auto">
                        {["All", "Completed", "Pending", "Cancelled"].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                    filterStatus === status 
                                    ? "bg-biru text-white shadow-md shadow-biru/20 scale-105" 
                                    : "text-gray-500 hover:text-biru"
                                }`}
                            >
                                {status === "All" ? "Semua" : status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 text-[11px] uppercase tracking-[0.15em] border-b border-gray-50">
                                <th className="pb-5 px-4 font-bold">Order ID</th>
                                <th className="pb-5 px-4 font-bold">Pelanggan</th>
                                <th className="pb-5 px-4 font-bold">Tanggal</th>
                                <th className="pb-5 px-4 font-bold">Total Harga</th>
                                <th className="pb-5 px-4 font-bold text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.map((order) => (
                                <tr key={order.orderId} className="hover:bg-biru/5 transition-all group">
                                    <td className="py-5 px-4 font-bold text-biru">{order.orderId}</td>
                                    <td className="py-5 px-4">
                                        <span className="font-bold text-gray-800 group-hover:text-biru transition-colors">
                                            {order.customerName}
                                        </span>
                                    </td>
                                    <td className="py-5 px-4 text-gray-500 text-sm">{order.orderDate}</td>
                                    <td className="py-5 px-4 font-black text-gray-800">{order.totalPrice}</td>
                                    <td className="py-5 px-4 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-20">
                            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaSearch className="text-gray-200 text-3xl" />
                            </div>
                            <p className="text-gray-400 italic">Pesanan tidak ditemukan.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}