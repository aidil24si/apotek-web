import { useState } from "react";
import patientData from "../data/customers.json"; 
import PageHeader from "../components/PageHeader";
import { FaSearch, FaUserPlus, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";

// ... (import tetap sama)

export default function Customers() {
    const [search, setSearch] = useState("");

    const filteredPatients = (patientData || []).filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <PageHeader title="Data Pasien" breadcrumb={["Apotek", "Daftar Pasien"]}>
                <button className="flex items-center gap-2 bg-biru text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-biru/20 hover:scale-105 active:scale-95 transition-all">
                    <FaUserPlus className="text-lg" />
                    <span>Tambah Pasien</span>
                </button>
            </PageHeader>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 mt-6">
                {/* Bagian Pencarian */}
                <div className="relative mb-8 max-w-md group">
                    <input 
                        type="text" 
                        placeholder="Cari Nama Pasien atau ID..." 
                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none border border-transparent focus:border-biru focus:bg-white focus:ring-4 focus:ring-biru/10 transition-all pl-12 text-gray-700"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {/* Ikon Search yang berubah warna saat input fokus */}
                    <FaSearch className="absolute left-4 top-5 text-gray-300 group-focus-within:text-biru transition-colors" />
                </div>

                {/* Tabel Data Pasien */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-gray-400 text-[11px] uppercase tracking-[0.15em]">
                                <th className="px-4 pb-4 font-bold">ID Pasien</th>
                                <th className="px-4 pb-4 font-bold">Nama Lengkap</th>
                                <th className="px-4 pb-4 font-bold">Alamat</th>
                                <th className="px-4 pb-4 font-bold">No. Telepon</th>
                                <th className="px-4 pb-4 font-bold">Kunjungan</th>
                                <th className="px-4 pb-4 font-bold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="group hover:bg-biru/5 transition-all duration-300">
                                    <td className="px-4 py-5 font-bold text-biru whitespace-nowrap">{patient.id}</td>
                                    <td className="px-4 py-5">
                                        <p className="font-bold text-gray-800 group-hover:text-biru transition-colors">{patient.name}</p>
                                    </td>
                                    <td className="px-4 py-5 text-gray-500 text-sm">
                                        <div className="flex items-center gap-2">
                                            <MdOutlineLocationOn className="text-gray-300 text-lg group-hover:text-biru/50 transition-colors" />
                                            <span className="truncate max-w-[200px]">{patient.address}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-5 text-gray-600 text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-biru/10 text-biru rounded-xl transition-transform group-hover:rotate-12">
                                                <FaPhoneAlt className="text-[10px]" />
                                            </div>
                                            {patient.phone}
                                        </div>
                                    </td>
                                    <td className="px-4 py-5">
                                        <span className="text-[11px] font-bold bg-gray-100 text-gray-500 group-hover:bg-biru/10 group-hover:text-biru px-3 py-1.5 rounded-lg transition-colors">
                                            {patient.lastVisit}
                                        </span>
                                    </td>
                                    <td className="px-4 py-5 text-center">
                                        <button className="bg-white border border-gray-100 text-biru font-bold text-[11px] px-4 py-2 rounded-xl shadow-sm hover:bg-biru hover:text-white hover:border-biru transition-all">
                                            Detail Profil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Empty State */}
                    {filteredPatients.length === 0 && (
                        <div className="py-24 text-center">
                            <div className="inline-flex p-8 bg-gray-50 rounded-[2rem] mb-6 shadow-inner">
                                <FaSearch className="text-gray-200 text-5xl" />
                            </div>
                            <h4 className="text-gray-800 font-bold text-lg">Pasien Tidak Ditemukan</h4>
                            <p className="text-gray-400 text-sm mt-1">Coba periksa kembali ejaan nama atau ID pasien.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}