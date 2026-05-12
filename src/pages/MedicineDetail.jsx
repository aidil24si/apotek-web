import { useParams, useNavigate } from "react-router-dom";
import medicineData from "../data/medicines.json";
import { FaArrowLeft, FaCapsules, FaEdit } from "react-icons/fa";

export default function MedicineDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Cari data obat berdasarkan ID dari URL
    const medicine = medicineData.find(m => m.id === id);

    if (!medicine) {
        return (
            <div className="p-8 text-center bg-[#F9FAFB] min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800">Obat Tidak Ditemukan</h2>
                <button onClick={() => navigate("/inventory")} className="mt-4 text-[#2563EB] underline">Kembali ke Inventaris</button>
            </div>
        );
    }

    return (
        <div className="p-8 animate-in fade-in duration-700 bg-[#F9FAFB] min-h-screen">
            <button 
                onClick={() => navigate("/inventory")}
                className="flex items-center gap-2 text-gray-500 hover:text-[#2563EB] font-bold text-sm mb-6 transition-colors"
            >
                <FaArrowLeft /> Kembali ke Daftar Inventaris
            </button>

            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-10 relative">
                {/* Bagian Kiri: Ikon / Gambar Dummy */}
                <div className="w-full md:w-1/3 flex flex-col items-center">
                    <div className="w-full aspect-square bg-[#F3F4F6] rounded-3xl flex items-center justify-center border-4 border-white shadow-inner">
                        <FaCapsules className="text-[#2563EB] text-7xl opacity-50" />
                    </div>
                    <button className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-50 text-[#2563EB] px-6 py-3 rounded-2xl font-bold hover:bg-[#2563EB] hover:text-white transition-all shadow-sm active:scale-95">
                        <FaEdit /> Edit Data Obat
                    </button>
                </div>

                {/* Bagian Kanan: Detail Informasi */}
                <div className="w-full md:w-2/3 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-blue-100 text-[#2563EB] text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider">{medicine.category}</span>
                        <span className="text-gray-400 font-mono text-sm tracking-tight">{medicine.id}</span>
                    </div>
                    
                    <h1 className="text-3xl font-extrabold text-[#111827] mb-2">{medicine.name}</h1>
                    <p className="text-2xl font-bold text-[#2563EB] mb-6">{medicine.price} <span className="text-sm text-gray-400 font-medium">/ {medicine.unit}</span></p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Status Stok</p>
                            <p className={`text-xl font-bold ${medicine.stock <= medicine.minStock ? 'text-red-500' : 'text-green-600'}`}>
                                {medicine.stock} {medicine.unit}
                            </p>
                            <p className="text-[11px] text-gray-500 mt-1">Batas Minimum: {medicine.minStock} {medicine.unit}</p>
                        </div>
                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Tanggal Kedaluwarsa</p>
                            <p className="text-xl font-bold text-[#111827]">{medicine.expiryDate || "N/A"}</p>
                            <p className="text-[11px] text-gray-500 mt-1">Produsen: {medicine.manufacturer || "N/A"}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-bold text-gray-800 mb-1">Deskripsi</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{medicine.description || "Tidak ada deskripsi."}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-800 mb-1">Komposisi Utama</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{medicine.composition || "Tidak ada informasi."}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-800 mb-1">Efek Samping Peringatan</h3>
                            <p className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-xl border border-red-100 leading-relaxed">{medicine.sideEffects || "Tidak ada informasi efek samping tercatat."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}