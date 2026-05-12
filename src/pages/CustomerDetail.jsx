import { useParams, useNavigate } from "react-router-dom";
import patientData from "../data/customers.json";
import { FaArrowLeft, FaUser, FaHistory, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineLocationOn, MdBloodtype, MdWarning } from "react-icons/md";

export default function CustomerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Cari data pasien berdasarkan ID dari URL
    const patient = patientData.find(p => p.id === id);

    if (!patient) {
        return (
            <div className="p-8 text-center bg-[#F9FAFB] min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800">Pasien Tidak Ditemukan</h2>
                <button onClick={() => navigate("/customers")} className="mt-4 text-[#2563EB] underline">Kembali ke Daftar Pasien</button>
            </div>
        );
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[#F9FAFB] min-h-screen">
            <button 
                onClick={() => navigate("/customers")}
                className="flex items-center gap-2 text-gray-500 hover:text-[#2563EB] font-bold text-sm mb-6 transition-colors"
            >
                <FaArrowLeft /> Kembali ke Daftar Pasien
            </button>

            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100">
                {/* Header Profil Pasien */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10 pb-10 border-b border-gray-100">
                    <div className="w-32 h-32 bg-blue-50 rounded-full flex flex-shrink-0 items-center justify-center border-4 border-blue-100 shadow-inner">
                        <FaUser className="text-[#2563EB] text-5xl opacity-80" />
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                        <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider mb-2 inline-block">Pasien Reguler</span>
                        <h1 className="text-3xl font-extrabold text-[#111827] mb-1">{patient.name}</h1>
                        <p className="text-sm font-mono text-[#2563EB] mb-4">ID: {patient.id}</p>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                                <FaPhoneAlt className="text-gray-400" /> {patient.phone}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                                <MdOutlineLocationOn className="text-gray-400" /> {patient.address}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid Informasi Medis Dasar */}
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaHistory className="text-[#2563EB]" /> Ringkasan Medis
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <p className="text-xs text-gray-400 font-bold uppercase mb-1">Umur & Gender</p>
                        <p className="font-bold text-[#111827]">{patient.age} Thn <span className="text-gray-300 mx-1">|</span> {patient.gender}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col">
                        <p className="text-xs text-gray-400 font-bold uppercase mb-1 flex items-center gap-1">
                            Gol. Darah <MdBloodtype className="text-red-500" />
                        </p>
                        <p className="font-bold text-[#111827] text-xl">{patient.bloodType || "-"}</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex flex-col md:col-span-2">
                        <p className="text-xs text-red-500 font-bold uppercase mb-1 flex items-center gap-1">
                            <MdWarning /> Peringatan Alergi
                        </p>
                        <p className="font-bold text-red-700">{patient.allergies || "Tidak ada catatan alergi"}</p>
                    </div>
                </div>

                {/* Riwayat Penyakit */}
                <div className="bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-800 mb-2">Riwayat Penyakit Terdaftar</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{patient.medicalHistory || "Belum ada riwayat penyakit kronis yang dicatat."}</p>
                </div>
            </div>
        </div>
    );
}