import { useParams, useNavigate } from "react-router-dom";
import patientData from "../data/customers.json";
import { FaArrowLeft, FaUser, FaHistory, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineLocationOn, MdBloodtype, MdWarning } from "react-icons/md";

// Import komponen Shadcn UI untuk standardisasi rekam medis premium
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

export default function CustomerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Cari data pasien berdasarkan ID dari URL
    const patient = patientData.find(p => p.id === id);

    // Penanganan jika ID Pasien tidak ditemukan di berkas lokal json
    if (!patient) {
        return (
            <div className="p-8 text-center bg-[#F9FAFB] min-h-screen flex flex-col items-center justify-center font-sans animate-in fade-in duration-500">
                <div className="p-6 bg-red-50 text-red-500 rounded-full mb-4">
                    <FaUser className="text-5xl opacity-40" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Pasien Tidak Ditemukan</h2>
                <p className="text-gray-400 text-sm mt-1">Data rekam medis pasien dengan ID tersebut tidak terarsip.</p>
                <Button 
                    variant="link" 
                    onClick={() => navigate("/customers")} 
                    className="mt-4 text-[#2563EB] font-bold"
                >
                    Kembali ke Daftar Pasien
                </Button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[#F9FAFB] min-h-screen font-sans">
            
            {/* Tombol Back Menggunakan Komponen Button Ghost Shadcn */}
            <Button 
                variant="ghost"
                onClick={() => navigate("/customers")}
                className="flex items-center gap-2 text-gray-500 hover:text-[#2563EB] hover:bg-blue-50 font-bold text-sm mb-6 transition-all rounded-xl px-4 py-2"
            >
                <FaArrowLeft /> Kembali ke Daftar Pasien
            </Button>

            {/* Container Lembar Rekam Medis Dibungkus Card Shadcn UI */}
            <Card className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-gray-100 overflow-hidden">
                <CardContent className="p-0">
                    
                    {/* Header Profil Pasien */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10 pb-10 border-b border-gray-100">
                        <div className="w-28 h-28 md:w-32 md:h-32 bg-blue-50 rounded-full flex flex-shrink-0 items-center justify-center border-4 border-blue-100 shadow-inner group overflow-hidden">
                            <FaUser className="text-[#2563EB] text-5xl opacity-80 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                            <Badge className="bg-gray-100 text-gray-500 hover:bg-gray-100 text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider mb-2 border-none shadow-none">
                                Pasien Reguler
                            </Badge>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-[#111827] mb-1">{patient.name}</h1>
                            <p className="text-sm font-mono text-[#2563EB] font-bold mb-4">ID: {patient.id}</p>
                            
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100/50">
                                    <FaPhoneAlt className="text-gray-400 text-xs" /> {patient.phone}
                                </div>
                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100/50">
                                    <MdOutlineLocationOn className="text-gray-400 text-base" /> {patient.address}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Judul Bagian Medis */}
                    <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2 uppercase tracking-wider">
                        <FaHistory className="text-[#2563EB] text-sm" /> Ringkasan Medis Pasien
                    </h3>
                    
                    {/* Grid Informasi Medis Dasar */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        
                        {/* Umur & Gender */}
                        <div className="bg-gray-50/60 p-5 rounded-2xl border border-gray-100">
                            <p className="text-xs text-gray-400 font-bold uppercase mb-1.5 tracking-wider">Umur & Gender</p>
                            <p className="font-bold text-[#111827] text-base">
                                {patient.age} Thn <span className="text-gray-200 mx-1">|</span> {patient.gender}
                            </p>
                        </div>
                        
                        {/* Golongan Darah */}
                        <div className="bg-gray-50/60 p-5 rounded-2xl border border-gray-100 flex flex-col justify-center">
                            <p className="text-xs text-gray-400 font-bold uppercase mb-1.5 tracking-wider flex items-center gap-1">
                                Gol. Darah <MdBloodtype className="text-red-500 text-sm animate-pulse" />
                            </p>
                            <p className="font-extrabold text-[#111827] text-xl">{patient.bloodType || "-"}</p>
                        </div>
                        
                        {/* Box Peringatan Alergi Kritis */}
                        <div className="bg-red-50/60 p-5 rounded-2xl border border-red-100/70 flex flex-col sm:col-span-2">
                            <p className="text-xs text-red-500 font-bold uppercase mb-1.5 tracking-wider flex items-center gap-1">
                                <MdWarning className="text-sm" /> Peringatan Alergi
                            </p>
                            <p className="font-bold text-red-700 text-sm leading-relaxed">
                                {patient.allergies || "Tidak ada catatan alergi obat/makanan."}
                            </p>
                        </div>
                    </div>

                    {/* Riwayat Penyakit Kronis */}
                    <div className="bg-[#F9FAFB]/80 p-6 rounded-2xl border border-gray-100/80">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Riwayat Penyakit Kronis / Bawaan</h4>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">
                            {patient.medicalHistory || "Belum ada riwayat penyakit kronis yang tercatat di dalam sistem apotek."}
                        </p>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}