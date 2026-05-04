export default function ErrorPage({ errorCode, errorTitle, errorImg }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-in fade-in zoom-in duration-500">
            <img 
                src={errorImg || "https://illustrations.popsy.co/gray/error-404.svg"} 
                alt={`Error ${errorCode}`} 
                className="w-64 mb-8 drop-shadow-md opacity-80" 
            />
            
            {/* Teks Error Code dengan warna Biru */}
            <h1 className="text-8xl font-black text-biru leading-none">{errorCode}</h1>
            
            <p className="text-xl text-gray-500 mt-4 font-medium max-w-md mx-auto">
                {errorTitle || "Maaf, halaman yang Anda cari tidak ditemukan."}
            </p>

            <button 
                onClick={() => window.history.back()}
                // {/* FOKUS PERUBAHAN: 
                //   - bg-hijau -> bg-biru
                //   - shadow-green -> shadow-biru/20
                // */\}
                className="mt-10 bg-biru hover:bg-blue-600 text-white px-10 py-3.5 rounded-2xl font-bold shadow-lg shadow-biru/20 transition-all active:scale-95 flex items-center gap-2"
            >
                <span>Kembali ke Halaman Sebelumnya</span>
            </button>
        </div>
    );
}