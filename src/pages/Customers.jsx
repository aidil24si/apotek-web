import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import patientData from "../data/customers.json"; 
import PageHeader from "../components/PageHeader";
import { FaSearch, FaUserPlus, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";

// Import komponen Shadcn UI yang presisi sesuai arsitektur proyekmu
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";

export default function Customers() {
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // State kontrol Modal Tambah Pasien
    const navigate = useNavigate();

    // Jalur filter pencarian bawaan asli kamu (100% aman)
    const filteredPatients = (patientData || []).filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[#F9FAFB] min-h-screen font-sans">
            
            {/* Header Utama Terintegrasi Modal Dialog Shadcn */}
            <PageHeader title="Data Pasien" breadcrumb={["Apotek", "Daftar Pasien"]}>
                <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-[#2563EB] text-white px-6 py-6 rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all hover:bg-blue-700"
                >
                    <FaUserPlus className="text-lg" />
                    <span>Tambah Pasien</span>
                </Button>
            </PageHeader>

            {/* Container Bungkus Utama Menggunakan Card Shadcn UI */}
            <Card className="rounded-[2rem] p-4 md:p-8 shadow-sm border border-gray-100 mt-6 bg-white overflow-hidden">
                <CardContent className="p-0">
                    
                    {/* Kotak Pencarian Menggunakan Input Shadcn */}
                    <div className="relative mb-8 max-w-md flex items-center">
                        <Input 
                            type="text" 
                            placeholder="Cari Nama Pasien atau ID..." 
                            className="w-full pl-12 pr-4 py-6 bg-[#F3F4F6] rounded-2xl border-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:bg-white text-sm text-[#111827] transition-all"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FaSearch className="absolute left-4 text-gray-400 pointer-events-none transition-colors" />
                    </div>

                    {/* Render Sistem Tabel Menggunakan Tabel Shadcn UI */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-gray-100 hover:bg-transparent">
                                    <TableHead className="px-4 pb-5 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">ID Pasien</TableHead>
                                    <TableHead className="px-4 pb-5 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">Nama Lengkap</TableHead>
                                    <TableHead className="px-4 pb-5 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">Alamat</TableHead>
                                    <TableHead className="px-4 pb-5 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">No. Telepon</TableHead>
                                    <TableHead className="px-4 pb-5 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">Terakhir Berkunjung</TableHead>
                                    <TableHead className="px-4 pb-5 font-semibold text-center text-gray-500 text-[12px] uppercase tracking-wider">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPatients.map((patient) => (
                                    <TableRow key={patient.id} className="group hover:bg-gray-50/50 transition-all duration-300 border-b border-gray-50">
                                        
                                        {/* ID Pasien */}
                                        <TableCell className="px-4 py-5 font-bold text-[#2563EB] text-sm whitespace-nowrap">
                                            {patient.id}
                                        </TableCell>
                                        
                                        {/* Nama Pasien */}
                                        <TableCell className="px-4 py-5">
                                            <p className="font-bold text-[#111827] text-sm group-hover:text-[#2563EB] transition-colors">
                                                {patient.name}
                                            </p>
                                        </TableCell>
                                        
                                        {/* Alamat Pasien */}
                                        <TableCell className="px-4 py-5 text-gray-500 text-sm">
                                            <div className="flex items-center gap-2">
                                                <MdOutlineLocationOn className="text-gray-400 text-lg group-hover:text-[#2563EB]/50 transition-colors" />
                                                <span className="truncate max-w-[200px] font-medium">{patient.address}</span>
                                            </div>
                                        </TableCell>
                                        
                                        {/* No Telepon */}
                                        <TableCell className="px-4 py-5 text-gray-600 text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-blue-50 text-[#2563EB] rounded-xl transition-transform group-hover:rotate-12">
                                                    <FaPhoneAlt className="text-[10px]" />
                                                </div>
                                                <span className="font-semibold">{patient.phone}</span>
                                            </div>
                                        </TableCell>
                                        
                                        {/* Kunjungan Terakhir dibungkus Badge Shadcn */}
                                        <TableCell className="px-4 py-5">
                                            <Badge 
                                                variant="secondary"
                                                className="text-[11px] font-bold bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-[#2563EB] px-3 py-1 rounded-lg transition-colors border-none shadow-none"
                                            >
                                                {patient.lastVisit}
                                            </Badge>
                                        </TableCell>
                                        
                                        {/* Tombol Aksi Detail Profil Pasien */}
                                        <TableCell className="px-4 py-5 text-center">
                                            <Button 
                                                variant="outline"
                                                onClick={() => navigate(`/customers/${patient.id}`)}
                                                className="bg-white border border-gray-200 text-[#2563EB] font-bold text-[11px] px-4 py-2 h-auto rounded-xl shadow-sm hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-all active:scale-95"
                                            >
                                                Detail Profil
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        
                        {/* Tampilan Kondisi Jika Pencarian Data Pasien Kosong */}
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
                </CardContent>
            </Card>

            {/* ========================================================
                MODAL POP-UP DIALOG UNTUK REGISTRASI PASIEN BARU (SHADCN UI)
                ======================================================== */}
            <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <DialogContent onClose={() => setIsModalOpen(false)} className="bg-white max-w-md p-6 rounded-[2rem]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900">Registrasi Pasien Baru</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 mt-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-wider">Nama Lengkap Pasien</label>
                            <Input type="text" placeholder="Masukkan nama lengkap..." className="bg-gray-50 focus-visible:ring-[#2563EB]" />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-wider">No. Handphone (WhatsApp)</label>
                            <Input type="text" placeholder="Contoh: 081234567xxx" className="bg-gray-50 focus-visible:ring-[#2563EB]" />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-wider">Alamat Tempat Tinggal</label>
                            <Input type="text" placeholder="Masukkan alamat domisili..." className="bg-gray-50 focus-visible:ring-[#2563EB]" />
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-xl border-gray-200">
                                Batal
                            </Button>
                            <Button onClick={() => setIsModalOpen(false)} className="bg-[#2563EB] hover:bg-blue-700 rounded-xl px-6">
                                Daftarkan Pasien
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}