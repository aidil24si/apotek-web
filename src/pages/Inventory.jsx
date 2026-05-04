import { useState } from "react";
// Pastikan file JSON ini tersedia di folder data Anda
import medicineData from "../data/medicines.json"; 
import PageHeader from "../components/PageHeader";
import { FaSearch, FaPlus, FaCapsules, FaExclamationTriangle } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";

export default function Inventory() {
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("Semua");

    // Logika Filter & Search
    const filteredMedicines = (medicineData || []).filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                             m.id.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = filterCategory === "Semua" || m.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    // Kategorisasi unik untuk tombol filter
    const categories = ["Semua", ...new Set((medicineData || []).map(m => m.category))];

    return (
        <div className="animate-in fade-in duration-700">
            <PageHeader title="Stok & Inventaris Obat" breadcrumb={["Apotek", "Inventaris"]}>
                <button className="flex items-center gap-2 bg-biru text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-biru/20 hover:scale-105 active:scale-95 transition-all">
                    <FaPlus />
                    <span>Tambah Stok</span>
                </button>
            </PageHeader>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 mt-6">
                {/* Toolbar: Search & Category Filter */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6">
                    <div className="relative w-full lg:w-96 group">
                        <input 
                            type="text" 
                            placeholder="Cari Nama Obat atau Kode..." 
                            className="w-full p-4 bg-gray-50 rounded-2xl outline-none border border-transparent focus:border-biru focus:ring-4 focus:ring-biru/10 transition-all pl-12"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FaSearch className="absolute left-4 top-5 text-gray-300 group-focus-within:text-biru transition-colors" />
                    </div>

                    <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl overflow-x-auto w-full lg:w-auto">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                                    filterCategory === cat 
                                    ? "bg-white text-biru shadow-sm scale-105" 
                                    : "text-gray-400 hover:text-biru"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tabel Inventaris */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 text-[11px] uppercase tracking-[0.2em] border-b border-gray-50">
                                <th className="pb-5 px-4 font-bold text-center w-20">Status</th>
                                <th className="pb-5 px-4 font-bold">Nama Obat</th>
                                <th className="pb-5 px-4 font-bold">Kategori</th>
                                <th className="pb-5 px-4 font-bold">Stok</th>
                                <th className="pb-5 px-4 font-bold">Harga Satuan</th>
                                <th className="pb-5 px-4 font-bold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredMedicines.map((med) => (
                                <tr key={med.id} className="group hover:bg-biru/5 transition-all duration-300">
                                    <td className="py-5 px-4 text-center">
                                        {med.stock <= med.minStock ? (
                                            <div className="inline-flex p-2 bg-red-50 text-red-500 rounded-lg animate-pulse" title="Stok Menipis!">
                                                <FaExclamationTriangle />
                                            </div>
                                        ) : (
                                            <div className="inline-flex p-2 bg-green-50 text-green-500 rounded-lg">
                                                <FaCapsules />
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-5 px-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-800 group-hover:text-biru transition-colors">{med.name}</span>
                                            <span className="text-[10px] text-gray-400 font-mono">{med.id}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-4">
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <MdOutlineCategory className="text-gray-300" />
                                            {med.category}
                                        </div>
                                    </td>
                                    <td className="py-5 px-4">
                                        <div className="flex flex-col">
                                            <span className={`font-bold ${med.stock <= med.minStock ? "text-red-500" : "text-gray-800"}`}>
                                                {med.stock} {med.unit}
                                            </span>
                                            <span className="text-[10px] text-gray-400">Min. {med.minStock} {med.unit}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-4 font-bold text-gray-800">
                                        {med.price}
                                    </td>
                                    <td className="py-5 px-4 text-center">
                                        <button className="text-biru font-bold text-[11px] bg-biru/5 px-4 py-2 rounded-xl hover:bg-biru hover:text-white transition-all shadow-sm">
                                            Update Stok
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredMedicines.length === 0 && (
                        <div className="py-24 text-center">
                            <div className="inline-flex p-8 bg-gray-50 rounded-full mb-4">
                                <FaCapsules className="text-gray-200 text-5xl" />
                            </div>
                            <p className="text-gray-400 italic font-medium">Obat tidak ditemukan dalam daftar inventaris.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}