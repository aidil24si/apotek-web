import { useParams, useNavigate } from "react-router-dom";
import medicineData from "../data/medicines.json";
import { FaArrowLeft, FaCapsules, FaEdit } from "react-icons/fa";

// Import komponen Shadcn UI untuk visualisasi data premium
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

export default function MedicineDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Cari data obat berdasarkan ID dari URL
    const medicine = medicineData.find(m => m.id === id);

    // State penanganan jika ID obat tidak valid/ditemukan
    if (!medicine) {
        return (
            <div className="p-8 text-center bg-[#F9FAFB] min-h-screen flex flex-col items-center justify-center font-sans animate-in fade-in duration-500">
                <div className="p-6 bg-red-50 text-red-500 rounded-full mb-4">
                    <FaCapsules className="text-5xl opacity-40" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Obat Tidak Ditemukan</h2>
                <p className="text-gray-400 text-sm mt-1">Kode identifikasi obat tidak terdaftar di sistem inventaris.</p>
                <Button 
                    variant="link" 
                    onClick={() => navigate("/inventory")} 
                    className="mt-4 text-[#2563EB] font-bold"
                >
                    Kembali ke Inventaris
                </Button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 animate-in fade-in duration-700 bg-[#F9FAFB] min-h-screen font-sans">
            {/* Tombol Back Premium Menggunakan Button Shadcn */}
            <Button 
                variant="ghost"
                onClick={() => navigate("/inventory")}
                className="flex items-center gap-2 text-gray-500 hover:text-[#2563EB] hover:bg-blue-50 font-bold text-sm mb-6 transition-all rounded-xl px-4 py-2"
            >
                <FaArrowLeft /> Kembali ke Daftar Inventaris
            </Button>

            {/* Container Detail Dibungkus Card Shadcn UI */}
            <Card className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-gray-100 overflow-hidden">
                <CardContent className="p-0 flex flex-col md:flex-row gap-10 relative">
                    
                    {/* Bagian Kiri: Visualisasi Kartu Produk */}
                    <div className="w-full md:w-1/3 flex flex-col items-center">
                        <div className="w-full aspect-square bg-[#F3F4F6] rounded-3xl flex items-center justify-center border-4 border-white shadow-inner relative group overflow-hidden">
                            <FaCapsules className="text-[#2563EB] text-7xl opacity-40 group-hover:scale-110 transition-transform duration-300" />
                            {medicine.stock <= medicine.minStock && (
                                <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase animate-pulse">
                                    Kritis
                                </span>
                            )}
                        </div>
                        <Button 
                            className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-50 text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all shadow-sm rounded-2xl font-bold py-6 active:scale-95"
                        >
                            <FaEdit /> Edit Data Obat
                        </Button>
                    </div>

                    {/* Bagian Kanan: Spesifikasi Lembar Obat */}
                    <div className="w-full md:w-2/3 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <Badge className="bg-blue-100 text-[#2563EB] hover:bg-blue-100 text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider border-none">
                                {medicine.category}
                            </Badge>
                            <span className="text-gray-400 font-mono text-xs font-bold tracking-tight bg-gray-100 px-2 py-1 rounded-md">
                                {medicine.id}
                            </span>
                        </div>
                        
                        <h1 className="text-2xl md:text-3xl font-extrabold text-[#111827] mb-2">{medicine.name}</h1>
                        <p className="text-2xl font-bold text-[#2563EB] mb-6">
                            {medicine.price} 
                            <span className="text-sm text-gray-400 font-medium ml-1">/ {medicine.unit}</span>
                        </p>

                        {/* grid Informasi Stok & Expiry */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100/80">
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1.5 tracking-wider">Status Stok</p>
                                <div className="mb-1">
                                    <Badge 
                                        variant={medicine.stock <= medicine.minStock ? "destructive" : "success"}
                                        className="text-sm font-bold px-3 py-0.5 rounded-md"
                                    >
                                        {medicine.stock} {medicine.unit}
                                    </Badge>
                                </div>
                                <p className="text-[11px] text-gray-400 font-medium mt-1.5 pl-0.5">Batas Minimum Keamanan: {medicine.minStock} {medicine.unit}</p>
                            </div>
                            
                            <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100/80">
                                <p className="text-xs text-gray-400 font-bold uppercase mb-1.5 tracking-wider">Tanggal Kedaluwarsa</p>
                                <p className="text-lg font-bold text-[#111827]">{medicine.expiryDate || "N/A"}</p>
                                <p className="text-[11px] text-gray-400 font-medium mt-1">Manufaktur: {medicine.manufacturer || "N/A"}</p>
                            </div>
                        </div>

                        {/* Indikasi Medis & Komposisi */}
                        <div className="space-y-5 border-t border-gray-100 pt-6">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Deskripsi Obat</h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">{medicine.description || "Tidak ada deskripsi deskriptif mengenai obat ini."}</p>
                            </div>
                            
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Komposisi Utama</h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">{medicine.composition || "Informasi senyawa aktif belum dimasukkan."}</p>
                            </div>
                            
                            <div>
                                <h3 className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1.5">Efek Samping & Kontraindikasi</h3>
                                <p className="text-sm text-red-600 font-semibold bg-red-50/70 p-4 rounded-xl border border-red-100/50 leading-relaxed">
                                    {medicine.sideEffects || "Tidak ada informasi efek samping kritikal yang tercatat."}
                                </p>
                            </div>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    );
}