import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import medicineData from "../data/medicines.json"; 
import PageHeader from "../components/PageHeader";
import { FaSearch, FaPlus, FaCapsules, FaExclamationTriangle } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";

// Import komponen Shadcn UI yang presisi sesuai struktur foldermu
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../components/ui/table";

export default function Inventory() {
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("Semua");
    const navigate = useNavigate();

    // Logika filter data bawaan asli kamu (tetap terjaga 100%)
    const filteredMedicines = (medicineData || []).filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                             m.id.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = filterCategory === "Semua" || m.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ["Semua", ...new Set((medicineData || []).map(m => m.category))];

    return (
        <div className="p-4 md:p-8 bg-[#F9FAFB] min-h-screen font-sans animate-in fade-in duration-700">
            {/* PageHeader dengan Button Shadcn UI */}
            <PageHeader title="Stok & Inventaris Obat" breadcrumb={["Apotek", "Inventaris"]}>
                <Button 
                    className="flex items-center gap-2 bg-[#2563EB] text-white px-6 py-6 rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all hover:bg-blue-700"
                >
                    <FaPlus />
                    <span>Tambah Stok</span>
                </Button>
            </PageHeader>

            {/* Container Utama dibungkus Card Shadcn UI */}
            <Card className="rounded-[2rem] p-4 md:p-8 shadow-sm border border-gray-100 mt-6 bg-white overflow-hidden">
                <CardContent className="p-0">
                    
                    {/* Bagian Search & Filter Kategori */}
                    <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">
                        <div className="relative w-full lg:w-96 flex items-center">
                            <Input 
                                type="text" 
                                placeholder="Cari Nama Obat atau Kode..." 
                                className="w-full pl-12 pr-4 py-6 bg-[#F3F4F6] rounded-2xl border-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:bg-white text-sm transition-all"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <FaSearch className="absolute left-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Filter Kategori Kapsul Estetik */}
                        <div className="flex gap-2 p-1.5 bg-[#F3F4F6] rounded-2xl overflow-x-auto w-full lg:w-auto scrollbar-none">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilterCategory(cat)}
                                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                        filterCategory === cat 
                                        ? "bg-white text-[#2563EB] shadow-sm scale-105" 
                                        : "text-gray-400 hover:text-[#2563EB]"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tabel Data Menggunakan Table Shadcn UI */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-gray-100 hover:bg-transparent">
                                    <TableHead className="pb-5 px-4 font-semibold text-center w-24 text-gray-500 text-[12px] uppercase tracking-wider">Status</TableHead>
                                    <TableHead className="pb-5 px-4 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">Nama Obat</TableHead>
                                    <TableHead className="pb-5 px-4 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">Kategori</TableHead>
                                    <TableHead className="pb-5 px-4 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">Stok</TableHead>
                                    <TableHead className="pb-5 px-4 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">Harga Satuan</TableHead>
                                    <TableHead className="pb-5 px-4 font-semibold text-center text-gray-500 text-[12px] uppercase tracking-wider">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMedicines.map((med) => (
                                    <TableRow key={med.id} className="group hover:bg-gray-50/50 transition-all duration-300 border-b border-gray-50">
                                        {/* Status Indikator */}
                                        <TableCell className="py-5 px-4 text-center">
                                            {med.stock <= med.minStock ? (
                                                <div className="inline-flex p-2.5 bg-red-50 text-red-500 rounded-xl animate-pulse" title="Stok Menipis!">
                                                    <FaExclamationTriangle className="text-lg" />
                                                </div>
                                            ) : (
                                                <div className="inline-flex p-2.5 bg-green-50 text-green-500 rounded-xl">
                                                    <FaCapsules className="text-lg" />
                                                </div>
                                            )}
                                        </TableCell>
                                        
                                        {/* Nama & Kode Obat */}
                                        <TableCell className="py-5 px-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#111827] text-sm group-hover:text-[#2563EB] transition-colors">
                                                    {med.name}
                                                </span>
                                                <span className="text-[11px] text-gray-400 font-mono tracking-tighter uppercase">{med.id}</span>
                                            </div>
                                        </TableCell>

                                        {/* Kategori */}
                                        <TableCell className="py-5 px-4">
                                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                                <MdOutlineCategory className="text-gray-400" />
                                                {med.category}
                                            </div>
                                        </TableCell>

                                        {/* Stok Dinamis dengan Badge Shadcn */}
                                        <TableCell className="py-5 px-4">
                                            <div className="flex flex-col">
                                                <span className="mb-1">
                                                    <Badge 
                                                        variant={med.stock <= med.minStock ? "destructive" : "success"}
                                                        className="font-bold text-xs px-2.5 py-0.5 rounded-md"
                                                    >
                                                        {med.stock} {med.unit}
                                                    </Badge>
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-medium pl-1">Min. {med.minStock} {med.unit}</span>
                                            </div>
                                        </TableCell>

                                        {/* Harga */}
                                        <TableCell className="py-5 px-4 font-bold text-[#111827] text-sm">
                                            {med.price}
                                        </TableCell>

                                        {/* Tombol Navigasi Detail */}
                                        <TableCell className="py-5 px-4 text-center">
                                            <Button 
                                                variant="secondary"
                                                onClick={() => navigate(`/inventory/${med.id}`)}
                                                className="text-[#2563EB] font-bold text-[11px] bg-blue-50 px-4 py-2 h-auto rounded-xl hover:bg-[#2563EB] hover:text-white transition-all shadow-sm active:scale-95"
                                            >
                                                Detail Obat
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* State Kosong (Empty State) */}
                        {filteredMedicines.length === 0 && (
                            <div className="py-24 text-center">
                                <div className="inline-flex p-8 bg-[#F3F4F6] rounded-full mb-4">
                                    <FaCapsules className="text-gray-300 text-5xl" />
                                </div>
                                <p className="text-gray-400 font-medium italic">Obat tidak ditemukan dalam daftar inventaris.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}