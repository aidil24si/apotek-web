import { useState } from "react";
import patientData from "../data/customers.json"; 
import PageHeader from "../components/PageHeader";
import { FaSearch, FaUserPlus, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";

export default function Customers() {
    const [search, setSearch] = useState("");

    const filteredPatients = (patientData || []).filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[#F9FAFB] min-h-screen">
            {/* Page Header dengan tombol Branding Biru #2563EB */}
            <PageHeader title="Data Pasien" breadcrumb={["Apotek", "Daftar Pasien"]}>
                <button className="flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all">
                    <FaUserPlus className="text-lg" />
                    <span>Tambah Pasien</span>
                </button>
            </PageHeader>

            {/* Container Utama dengan radius melengkung ala Figma */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 mt-6">
                
                {/* Bagian Pencarian dengan style Input Login yang konsisten */}
                <div className="relative mb-8 max-w-md group">
                    <input 
                        type="text" 
                        placeholder="Cari Nama Pasien atau ID..." 
                        className="w-full p-4 bg-[#F3F4F6] rounded-2xl outline-none border border-transparent focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all pl-12 text-sm text-[#111827]"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2563EB] transition-colors" />
                </div>

                {/* Tabel Data Pasien */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-0">
                        <thead>
                            <tr className="text-gray-500 text-[12px] uppercase tracking-wider border-b border-gray-100">
                                <th className="px-4 pb-5 font-semibold">ID Pasien</th>
                                <th className="px-4 pb-5 font-semibold">Nama Lengkap</th>
                                <th className="px-4 pb-5 font-semibold">Alamat</th>
                                <th className="px-4 pb-5 font-semibold">No. Telepon</th>
                                <th className="px-4 pb-5 font-semibold">Terakhir Berkunjung</th>
                                <th className="px-4 pb-5 font-semibold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="group hover:bg-gray-50/50 transition-all duration-300">
                                    <td className="px-4 py-5 font-bold text-[#2563EB] text-sm whitespace-nowrap">
                                        {patient.id}
                                    </td>
                                    <td className="px-4 py-5">
                                        <p className="font-bold text-[#111827] text-sm group-hover:text-[#2563EB] transition-colors">
                                            {patient.name}
                                        </p>
                                    </td>
                                    <td className="px-4 py-5 text-gray-500 text-sm">
                                        <div className="flex items-center gap-2">
                                            <MdOutlineLocationOn className="text-gray-400 text-lg group-hover:text-[#2563EB]/50 transition-colors" />
                                            <span className="truncate max-w-[200px]">{patient.address}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-5 text-gray-600 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-blue-50 text-[#2563EB] rounded-xl transition-transform group-hover:rotate-12">
                                                <FaPhoneAlt className="text-[10px]" />
                                            </div>
                                            <span className="font-medium">{patient.phone}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-5">
                                        <span className="text-[11px] font-bold bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-[#2563EB] px-3 py-1.5 rounded-lg transition-colors">
                                            {patient.lastVisit}
                                        </span>
                                    </td>
                                    <td className="px-4 py-5 text-center">
                                        <button className="bg-white border border-gray-200 text-[#2563EB] font-bold text-[11px] px-4 py-2 rounded-xl shadow-sm hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all active:scale-95">
                                            Detail Profil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Empty State dengan style modern */}
                    {filteredPatients.length === 0 && (
                        <div className="py-24 text-center">
                            <div className="inline-flex p-8 bg-[#F3F4F6] rounded-[2rem] mb-6 shadow-inner">
                                <FaSearch className="text-gray-300 text-5xl" />
                            </div>
                            <h4 className="text-[#111827] font-bold text-lg">Pasien Tidak Ditemukan</h4>
                            <p className="text-gray-400 text-sm mt-1 font-medium">Coba periksa kembali ejaan nama atau ID pasien.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}