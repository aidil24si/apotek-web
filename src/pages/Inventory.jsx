import { useState } from "react";
import medicineData from "../data/medicines.json"; 
import PageHeader from "../components/PageHeader";
import { FaSearch, FaPlus, FaCapsules, FaExclamationTriangle } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";

export default function Inventory() {
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("Semua");

    const filteredMedicines = (medicineData || []).filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                             m.id.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = filterCategory === "Semua" || m.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ["Semua", ...new Set((medicineData || []).map(m => m.category))];

    return (
        <div className="p-8 animate-in fade-in duration-700 bg-[#F9FAFB] min-h-screen">
            <PageHeader title="Stok & Inventaris Obat" breadcrumb={["Apotek", "Inventaris"]}>
                {/* Button Primary menggunakan warna biru #2563EB sesuai Figma */}
                <button className="flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all">
                    <FaPlus />
                    <span>Tambah Stok</span>
                </button>
            </PageHeader>

            {/* Container Utama dengan radius modern */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 mt-6">
                
                {/* Toolbar: Search & Category Filter */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">
                    <div className="relative w-full lg:w-96 group">
                        <input 
                            type="text" 
                            placeholder="Cari Nama Obat atau Kode..." 
                            className="w-full p-4 bg-[#F3F4F6] rounded-2xl outline-none border border-transparent focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all pl-12 text-sm"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2563EB] transition-colors" />
                    </div>

                    {/* Filter Tab Style sesuai elemen Dashboard */}
                    <div className="flex gap-2 p-1.5 bg-[#F3F4F6] rounded-2xl overflow-x-auto w-full lg:w-auto">
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

                {/* Table View dengan Interaksi Hover */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 text-[12px] uppercase tracking-wider border-b border-gray-100">
                                <th className="pb-5 px-4 font-semibold text-center w-24">Status</th>
                                <th className="pb-5 px-4 font-semibold">Nama Obat</th>
                                <th className="pb-5 px-4 font-semibold">Kategori</th>
                                <th className="pb-5 px-4 font-semibold">Stok</th>
                                <th className="pb-5 px-4 font-semibold">Harga Satuan</th>
                                <th className="pb-5 px-4 font-semibold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredMedicines.map((med) => (
                                <tr key={med.id} className="group hover:bg-gray-50/50 transition-all duration-300">
                                    <td className="py-5 px-4 text-center">
                                        {med.stock <= med.minStock ? (
                                            <div className="inline-flex p-2.5 bg-red-50 text-red-500 rounded-xl animate-pulse" title="Stok Menipis!">
                                                <FaExclamationTriangle className="text-lg" />
                                            </div>
                                        ) : (
                                            <div className="inline-flex p-2.5 bg-green-50 text-green-500 rounded-xl">
                                                <FaCapsules className="text-lg" />
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-5 px-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[#111827] text-sm group-hover:text-[#2563EB] transition-colors">
                                                {med.name}
                                            </span>
                                            <span className="text-[11px] text-gray-400 font-mono tracking-tighter uppercase">{med.id}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-4">
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <MdOutlineCategory className="text-gray-400" />
                                            {med.category}
                                        </div>
                                    </td>
                                    <td className="py-5 px-4">
                                        <div className="flex flex-col">
                                            <span className={`font-bold text-sm ${med.stock <= med.minStock ? "text-red-500" : "text-[#111827]"}`}>
                                                {med.stock} {med.unit}
                                            </span>
                                            <span className="text-[10px] text-gray-400 font-medium">Min. {med.minStock} {med.unit}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-4 font-bold text-[#111827] text-sm">
                                        {med.price}
                                    </td>
                                    <td className="py-5 px-4 text-center">
                                        <button className="text-[#2563EB] font-bold text-[11px] bg-blue-50 px-4 py-2 rounded-xl hover:bg-[#2563EB] hover:text-white transition-all shadow-sm active:scale-95">
                                            Update Stok
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {filteredMedicines.length === 0 && (
                        <div className="py-24 text-center">
                            <div className="inline-flex p-8 bg-[#F3F4F6] rounded-full mb-4">
                                <FaCapsules className="text-gray-300 text-5xl" />
                            </div>
                            <p className="text-gray-400 font-medium italic">Obat tidak ditemukan dalam daftar inventaris.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}