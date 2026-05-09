export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white animate-in fade-in duration-500">
            {/* Spinner Biru dengan ketebalan border yang pas */}
            <div className="relative">
                {/* Track spinner (warna pudar) */}
                <div className="w-14 h-14 border-4 border-[#2563EB]/20 rounded-full"></div>
                {/* Indikator spinner (warna solid) */}
                <div className="w-14 h-14 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            
            {/* Teks Loading dengan efek pulse */}
            <div className="mt-6 flex flex-col items-center gap-2">
                <p className="text-[#2563EB] text-lg font-bold tracking-widest animate-pulse">
                    MEMUAT DATA...
                </p>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.3em]">
                    Apotek Sehat System
                </span>
            </div>
        </div>
    );
}