import { useState } from "react";
import ordersData from "../data/orders.json";
import PageHeader from "../components/PageHeader";
import { FaSearch, FaFileDownload } from "react-icons/fa";

// Import komponen Shadcn UI pendukung dashboard kasir apotek
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../components/ui/table";

export default function Order() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    // Jalur pemrosesan filter bawaan asli kamu (100% terjaga dan aman)
    const filteredOrders = (ordersData || []).filter(order => {
        const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "All" || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-4 md:p-8 animate-in fade-in duration-700 bg-[#F9FAFB] min-h-screen font-sans">
            
            {/* Header dengan Tombol Export Menggunakan Button Shadcn UI */}
            <PageHeader title="Daftar Pesanan" breadcrumb={["Dashboard", "Order List"]}>
                <Button 
                    variant="outline"
                    className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-5 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                >
                    <FaFileDownload className="text-[#2563EB]" />
                    <span>Export Laporan</span>
                </Button>
            </PageHeader>

            {/* Container Utama Berbasis Card Shadcn UI */}
            <Card className="rounded-[2rem] p-4 md:p-8 shadow-sm border border-gray-100 mt-6 bg-white overflow-hidden">
                <CardContent className="p-0">
                    
                    {/* Toolbar Pencarian dan Kapsul Filter Kategori */}
                    <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-6">
                        <div className="relative w-full lg:w-96 flex items-center">
                            <Input 
                                type="text"
                                placeholder="Cari Nama Pelanggan atau ID..."
                                className="w-full pl-12 pr-4 py-6 bg-[#F3F4F6] rounded-2xl border-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:bg-white text-sm transition-all"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute left-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Filter Status Transaksi ala Figma */}
                        <div className="flex gap-2 p-1.5 bg-[#F3F4F6] rounded-2xl overflow-x-auto w-full lg:w-auto scrollbar-none">
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
                                    {status === "All" ? "Semua" : status === "Completed" ? "Aktif" : status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Pembungkusan Tabel Transaksi Shadcn UI */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-gray-100 hover:bg-transparent">
                                    <TableHead className="pb-5 px-4 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">Order ID</TableHead>
                                    <TableHead className="pb-5 px-4 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">Pelanggan</TableHead>
                                    <TableHead className="pb-5 px-4 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">Tanggal</TableHead>
                                    <TableHead className="pb-5 px-4 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">Total Harga</TableHead>
                                    <TableHead className="pb-5 px-4 font-semibold text-center text-gray-500 text-[12px] uppercase tracking-wider">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrders.map((order) => (
                                    <TableRow key={order.orderId} className="group hover:bg-gray-50/50 transition-all border-b border-gray-50">
                                        
                                        {/* Order ID */}
                                        <TableCell className="py-5 px-4 font-medium text-[#2563EB] text-sm font-mono">
                                            {order.orderId}
                                        </TableCell>
                                        
                                        {/* Nama Pelanggan */}
                                        <TableCell className="py-5 px-4">
                                            <span className="font-bold text-[#111827] text-sm group-hover:text-[#2563EB] transition-colors">
                                                {order.customerName}
                                            </span>
                                        </TableCell>
                                        
                                        {/* Tanggal Transaksi */}
                                        <TableCell className="py-5 px-4 text-gray-500 text-sm font-medium">
                                            {order.orderDate}
                                        </TableCell>
                                        
                                        {/* Total Harga */}
                                        <TableCell className="py-5 px-4 font-bold text-[#111827] text-sm">
                                            {order.totalPrice}
                                        </TableCell>
                                        
                                        {/* Badges Status Transaksi Terintegrasi Semantik Shadcn */}
                                        <TableCell className="py-5 px-4 text-center">
                                            <Badge 
                                                variant={
                                                    order.status === "Completed" ? "success" : 
                                                    order.status === "Pending" ? "warning" : "destructive"
                                                }
                                                className="px-4 py-1 rounded-full text-[11px] font-bold border-none"
                                            >
                                                {order.status === "Completed" ? "Aktif" : order.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Kondisi Jika Pencarian History Transaksi Kosong */}
                        {filteredOrders.length === 0 && (
                            <div className="text-center py-20">
                                <div className="bg-[#F3F4F6] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                                    <FaSearch className="text-gray-300 text-3xl" />
                                </div>
                                <h4 className="text-[#111827] font-bold text-base">Riwayat Kosong</h4>
                                <p className="text-gray-400 text-sm mt-0.5 font-medium">Data transaksi yang kamu cari tidak terdaftar.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}