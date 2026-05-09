import { BiArrowBack } from "react-icons/bi";

export default function ErrorPage({ errorCode = "404", errorTitle, errorImg }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 animate-in fade-in zoom-in duration-500">
            {/* Ilustrasi dengan filter agar warna abu-abunya lebih menyatu dengan UI */}
            <img 
                src={errorImg || "https://illustrations.popsy.co/gray/error-404.svg"} 
                alt={`Error ${errorCode}`} 
                className="w-72 md:w-80 mb-4 opacity-90 drop-shadow-xl" 
            />
            
            {/* Teks Error Code - Menggunakan Biru Branding #2563EB */}
            <h1 className="text-9xl font-black text-[#2563EB] leading-none tracking-tighter">
                {errorCode}
            </h1>
            
            <div className="mt-6 space-y-2">
                <h3 className="text-2xl font-bold text-[#111827]">
                    Oops! Terjadi Kesalahan
                </h3>
                <p className="text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">
                    {errorTitle || "Maaf, halaman yang Anda cari tidak ditemukan atau sedang dalam perbaikan."}
                </p>
            </div>

            {/* Tombol Kembali dengan branding Biru dan Shadow yang lembut */}
            <button 
                onClick={() => window.history.back()}
                className="mt-10 bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-2xl font-bold 
                           shadow-lg shadow-blue-600/20 transition-all active:scale-95 flex items-center gap-3"
            >
                <BiArrowBack className="text-xl" />
                <span>Kembali ke Halaman Sebelumnya</span>
            </button>
            
            {/* Link bantuan opsional */}
            <p className="mt-8 text-sm text-gray-400">
                Butuh bantuan? <a href="#" className="text-[#2563EB] font-semibold hover:underline">Hubungi IT Support</a>
            </p>
        </div>
    );
}