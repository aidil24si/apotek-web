import { useState } from "react";
import ordersData from "../data/orders.json";
import PageHeader from "../components/PageHeader";
import { FaSearch, FaFileDownload } from "react-icons/fa";

export default function Order() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    // Warna semantik sesuai desain Figma
    const getStatusColor = (status) => {
        switch (status) {
            case "Completed": return "bg-green-100 text-green-600"; // Hijau untuk Aktif/Selesai
            case "Pending": return "bg-blue-100 text-[#2563EB]"; // Biru untuk Proses
            case "Cancelled": return "bg-red-100 text-red-600"; // Merah untuk Batal
            default: return "bg-gray-100 text-gray-600";
        }
    };

    const filteredOrders = (ordersData || []).filter(order => {
        const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-8 animate-in fade-in duration-700 bg-[#F9FAFB] min-h-screen">
            {/* Header dengan tombol Export yang lebih lembut */}
            <PageHeader title="Daftar Pesanan" breadcrumb={["Dashboard", "Order List"]}>
                <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                    <FaFileDownload className="text-[#2563EB]" />
                    <span>Export Laporan</span>
                </button>
            </PageHeader>

            {/* Container Utama dengan radius 3xl */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 mt-6">
                
                {/* Toolbar: Search & Filter */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-6">
                    <div className="relative w-full lg:w-96">
                        <input 
                            type="text"
                            placeholder="Cari Nama Pelanggan atau ID..."
                            className="w-full p-4 bg-[#F3F4F6] rounded-2xl outline-none border border-transparent focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all pl-12 text-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    {/* Filter Kategori ala Figma */}
                    <div className="flex gap-2 p-1.5 bg-[#F3F4F6] rounded-2xl overflow-x-auto w-full lg:w-auto">
                        {["All", "Completed", "Pending", "Cancelled"].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                                    filterStatus === status 
                                    ? "bg-[#2563EB] text-white shadow-lg shadow-blue-600/20" 
                                    : "text-gray-500 hover:text-[#2563EB]"
                                }`}
                            >
                                {status === "All" ? "Semua" : status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table Management User Style */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-0">
                        <thead>
                            <tr className="text-gray-500 text-[12px] uppercase tracking-wider border-b border-gray-100">
                                <th className="pb-5 px-4 font-semibold">Order ID</th>
                                <th className="pb-5 px-4 font-semibold">Pelanggan</th>
                                <th className="pb-5 px-4 font-semibold">Tanggal</th>
                                <th className="pb-5 px-4 font-semibold">Total Harga</th>
                                <th className="pb-5 px-4 font-semibold text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.map((order) => (
                                <tr key={order.orderId} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="py-5 px-4 font-medium text-[#2563EB] text-sm">{order.orderId}</td>
                                    <td className="py-5 px-4">
                                        <span className="font-bold text-[#111827] text-sm group-hover:text-[#2563EB] transition-colors">
                                            {order.customerName}
                                        </span>
                                    </td>
                                    <td className="py-5 px-4 text-gray-500 text-sm">{order.orderDate}</td>
                                    <td className="py-5 px-4 font-bold text-[#111827] text-sm">{order.totalPrice}</td>
                                    <td className="py-5 px-4 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${getStatusColor(order.status)}`}>
                                            {order.status === "Completed" ? "Aktif" : order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredOrders.length === 0 && (
                        <div className="text-center py-20">
                            <div className="bg-[#F3F4F6] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaSearch className="text-gray-300 text-3xl" />
                            </div>
                            <p className="text-gray-400 font-medium">Data pesanan tidak ditemukan.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}