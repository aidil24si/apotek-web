import { useState } from "react";
// Pastikan path ini benar: naik satu tingkat ke src, lalu masuk ke folder data
import patientData from "../data/customers.json"; 
import PageHeader from "../components/PageHeader";
import { FaSearch, FaUserPlus, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";

export default function Customers() {
    const [search, setSearch] = useState("");

    // Tambahkan pengecekan agar tidak error jika patientData kosong/undefined
    const filteredPatients = (patientData || []).filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {/* Menggunakan PageHeader yang sudah ada di folder components */}
            <PageHeader title="Data Pasien" breadcrumb={["Apotek", "Daftar Pasien"]}>
                <button className="flex items-center gap-2 bg-biru text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-100 hover:scale-105 transition-transform">
                    <FaUserPlus />
                    <span>Tambah Pasien</span>
                </button>
            </PageHeader>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mt-6">
                {/* Bagian Pencarian */}
                <div className="relative mb-8 max-w-md">
                    <input 
                        type="text" 
                        placeholder="Cari Nama Pasien atau ID..." 
                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none border border-transparent focus:border-biru focus:ring-4 focus:ring-blue-500/10 transition-all pl-12"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FaSearch className="absolute left-4 top-5 text-gray-300" />
                </div>

                {/* Tabel Data Pasien */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-gray-50">
                                <th className="pb-4 font-bold">ID Pasien</th>
                                <th className="pb-4 font-bold">Nama Lengkap</th>
                                <th className="pb-4 font-bold">Alamat</th>
                                <th className="pb-4 font-bold">No. Telepon</th>
                                <th className="pb-4 font-bold">Kunjungan</th>
                                <th className="pb-4 font-bold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="group hover:bg-blue-50/30 transition-colors">
                                    <td className="py-5 font-bold text-biru">{patient.id}</td>
                                    <td className="py-5">
                                        <p className="font-bold text-gray-800">{patient.name}</p>
                                    </td>
                                    <td className="py-5 text-gray-500 text-sm">
                                        <div className="flex items-center gap-1">
                                            <MdOutlineLocationOn className="text-gray-300 text-lg" />
                                            {patient.address}
                                        </div>
                                    </td>
                                    <td className="py-5 text-gray-500 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-green-50 text-green-500 rounded-lg text-[10px]">
                                                <FaPhoneAlt />
                                            </div>
                                            {patient.phone}
                                        </div>
                                    </td>
                                    <td className="py-5">
                                        <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                                            {patient.lastVisit}
                                        </span>
                                    </td>
                                    <td className="py-5 text-center">
                                        <button className="text-biru font-bold text-xs hover:underline decoration-2 underline-offset-4">
                                            Detail Profil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Tampilan jika data tidak ada */}
                    {filteredPatients.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-gray-400 italic">Data pasien tidak ditemukan atau file JSON kosong.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}