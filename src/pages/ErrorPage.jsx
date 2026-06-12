import { BiArrowBack } from "react-icons/bi";

// Import komponen premium Shadcn UI untuk standardisasi tombol aksi
import { Button } from "../components/ui/button";

export default function ErrorPage({ errorCode = "404", errorTitle, errorImg }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6 animate-in fade-in zoom-in-95 duration-500 font-sans">
            
            {/* Ilustrasi dengan Drop Shadow dan Opacity Lembut */}
            <div className="relative group mb-4">
                <img 
                    src={errorImg || "https://illustrations.popsy.co/gray/error-404.svg"} 
                    alt={`Error ${errorCode}`} 
                    className="w-72 md:w-80 opacity-90 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" 
                />
            </div>
            
            {/* Teks Kode Error Master - Menggunakan Biru Branding #2563EB */}
            <h1 className="text-8xl md:text-9xl font-black text-[#2563EB] leading-none tracking-tighter drop-shadow-sm select-none">
                {errorCode}
            </h1>
            
            {/* Informasi Detail Deskripsi Gangguan Akses */}
            <div className="mt-6 space-y-2">
                <h3 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight">
                    Oops! Terjadi Kesalahan
                </h3>
                <p className="text-gray-400 text-sm md:text-base font-medium max-w-sm mx-auto leading-relaxed">
                    {errorTitle || "Maaf, halaman yang Anda cari tidak ditemukan atau sedang dalam perbaikan."}
                </p>
            </div>

            {/* Tombol Navigasi Kembali Menggunakan Button Shadcn UI */}
            <Button 
                onClick={() => window.history.back()}
                className="mt-10 bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-8 py-6 rounded-2xl font-bold 
                           shadow-lg shadow-blue-600/20 border-none transition-all active:scale-95 flex items-center gap-3 h-auto text-sm"
            >
                <BiArrowBack className="text-lg" />
                <span>Kembali ke Halaman Sebelumnya</span>
            </Button>
            
            {/* Footer Pintasan Bantuan Teknis */}
            <p className="mt-8 text-xs md:text-sm text-gray-400 font-medium">
                Butuh bantuan teknis?{" "}
                <a href="#" className="text-[#2563EB] font-bold hover:underline transition-colors">
                    Hubungi IT Support
                </a>
            </p>
        </div>
    );
}