import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import patientData from "../data/customers.json"; 
import PageHeader from "../components/PageHeader";
import { FaSearch, FaUserPlus, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineLocationOn, MdCardMembership } from "react-icons/md";

// Import komponen Shadcn UI yang presisi sesuai arsitektur proyekmu
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";

export default function Customers() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // State kontrol Modal

    // 1. Inisialisasi state utama menggunakan data awal dari JSON
    const [customersList, setCustomersList] = useState(patientData || []);

    // 2. State penampung input form member baru
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: ""
    });

    // 3. Fungsi penanganan perubahan input form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 4. Fungsi eksekusi simpan member baru
    const handleAddMember = (e) => {
        e.preventDefault();

        // Validasi sederhana agar input tidak kosong
        if (!formData.name || !formData.phone || !formData.address) {
            alert("Harap isi semua kolom data member!");
            return;
        }

        // Generate ID Otomatis (Mengikuti jumlah data yang ada)
        const nextIdNumber = customersList.length + 1;
        const newId = `PSN-${String(nextIdNumber).padStart(3, "0")}`;

        // Struktur data member baru disamakan dengan format JSON asli
        const newMember = {
            id: newId,
            name: formData.name,
            address: formData.address,
            phone: formData.phone,
            lastVisit: "Baru Mendaftar", // Penanda kunjungan perdana
            points: 0 // Member baru mulai dari 0 poin
        };

        // Masukkan member baru ke baris paling atas tabel
        setCustomersList([newMember, ...customersList]);

        // Reset Form & Tutup Modal Dialog
        setFormData({ name: "", phone: "", address: "" });
        setIsModalOpen(false);
    };

    // Filter pencarian data berdasarkan state dinamis yang baru
    const filteredPatients = customersList.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[#F9FAFB] min-h-screen font-sans">
            
            {/* Header Utama */}
            <PageHeader title="Kelola Member & Pasien" breadcrumb={["Apotek", "Daftar Member"]}>
                <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-[#2563EB] text-white px-6 py-6 rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all hover:bg-blue-700 border-none"
                >
                    <FaUserPlus className="text-lg" />
                    <span>Tambah Member Baru</span>
                </Button>
            </PageHeader>

            {/* Container Bungkus Utama */}
            <Card className="rounded-[2rem] p-4 md:p-8 shadow-sm border border-gray-100 mt-6 bg-white overflow-hidden">
                <CardContent className="p-0">
                    
                    {/* Kotak Pencarian */}
                    <div className="relative mb-8 max-w-md flex items-center">
                        <Input 
                            type="text" 
                            placeholder="Cari Nama Member, No. HP, atau ID..." 
                            className="w-full pl-12 pr-4 py-6 bg-[#F3F4F6] rounded-2xl border-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:bg-white text-sm text-[#111827] transition-all"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FaSearch className="absolute left-4 text-gray-400 pointer-events-none transition-colors" />
                    </div>

                    {/* Render Sistem Tabel */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-gray-100 hover:bg-transparent">
                                    <TableHead className="px-4 pb-5 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">ID Member</TableHead>
                                    <TableHead className="px-4 pb-5 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">Nama Lengkap</TableHead>
                                    <TableHead className="px-4 pb-5 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">Alamat Domisili</TableHead>
                                    <TableHead className="px-4 pb-5 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">No. Telepon</TableHead>
                                    <TableHead className="px-4 pb-5 font-semibold text-right text-gray-500 text-[12px] uppercase tracking-wider">Poin Hadiah</TableHead>
                                    <TableHead className="px-4 pb-5 font-semibold text-center text-gray-500 text-[12px] uppercase tracking-wider">Status</TableHead>
                                    <TableHead className="px-4 pb-5 font-semibold text-center text-gray-500 text-[12px] uppercase tracking-wider">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPatients.map((patient) => (
                                    <TableRow key={patient.id} className="group hover:bg-gray-50/50 transition-all duration-300 border-b border-gray-50">
                                        <TableCell className="px-4 py-5 font-bold text-[#2563EB] text-sm whitespace-nowrap">
                                            {patient.id}
                                        </TableCell>
                                        <TableCell className="px-4 py-5">
                                            <p className="font-bold text-[#111827] text-sm group-hover:text-[#2563EB] transition-colors">
                                                {patient.name}
                                            </p>
                                        </TableCell>
                                        <TableCell className="px-4 py-5 text-gray-500 text-sm">
                                            <div className="flex items-center gap-2">
                                                <MdOutlineLocationOn className="text-gray-400 text-lg group-hover:text-[#2563EB]/50 transition-colors" />
                                                <span className="truncate max-w-[200px] font-medium">{patient.address}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-4 py-5 text-gray-600 text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-blue-50 text-[#2563EB] rounded-xl">
                                                    <FaPhoneAlt className="text-[10px]" />
                                                </div>
                                                <span className="font-semibold">{patient.phone}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-4 py-5 text-right font-bold text-amber-600 text-sm">
                                            {patient.points !== undefined ? patient.points : 0} Pts
                                        </TableCell>
                                        <TableCell className="px-4 py-5 text-center">
                                            <Badge className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border-none hover:bg-emerald-50 shadow-none">
                                                Aktif
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-4 py-5 text-center">
                                            <Button 
                                                variant="outline"
                                                onClick={() => navigate(`/customers/${patient.id}`)}
                                                className="bg-white border border-gray-200 text-[#2563EB] font-bold text-[11px] px-4 py-2 h-auto rounded-xl shadow-sm hover:bg-[#2563EB] hover:text-white transition-all"
                                            >
                                                Detail Profil
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        
                        {filteredPatients.length === 0 && (
                            <div className="py-24 text-center">
                                <div className="inline-flex p-8 bg-[#F3F4F6] rounded-[2rem] mb-6">
                                    <FaSearch className="text-gray-300 text-5xl" />
                                </div>
                                <h4 className="text-[#111827] font-bold text-lg">Member Tidak Ditemukan</h4>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* MODAL POP-UP DIALOG */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-white max-w-md p-6 rounded-[2rem] border-none shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <MdCardMembership className="text-[#2563EB] text-2xl" />
                            <span>Registrasi Member Baru</span>
                        </DialogTitle>
                    </DialogHeader>
                    
                    {/* Bungkus input dengan form html asli agar fungsi submit bawaan aktif */}
                    <form onSubmit={handleAddMember} className="space-y-4 mt-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-wider">Nama Lengkap Pasien</label>
                            <Input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Masukkan nama lengkap..." 
                                className="bg-gray-50 focus-visible:ring-[#2563EB] py-5 rounded-xl border-none" 
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-wider">No. Handphone (WhatsApp)</label>
                            <Input 
                                type="text" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Contoh: 081234567xxx" 
                                className="bg-gray-50 focus-visible:ring-[#2563EB] py-5 rounded-xl border-none" 
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-wider">Alamat Tempat Tinggal</label>
                            <Input 
                                type="text" 
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Masukkan alamat domisili..." 
                                className="bg-gray-50 focus-visible:ring-[#2563EB] py-5 rounded-xl border-none" 
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-6">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setIsModalOpen(false)} 
                                className="rounded-xl border-gray-200"
                            >
                                Batal
                            </Button>
                            {/* Pastikan type="submit" agar menembak fungsi onSubmit di atas */}
                            <Button 
                                type="submit" 
                                className="bg-[#2563EB] hover:bg-blue-700 rounded-xl px-6 border-none text-white font-bold"
                            >
                                Daftarkan Pasien
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}