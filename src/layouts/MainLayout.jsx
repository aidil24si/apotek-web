import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        // Menggunakan h-[100dvh] dan overflow-hidden agar seluruh kerangka dashboard tidak ikut ter-scroll
        <div className="flex h-[100dvh] w-full bg-[#F9FAFB] overflow-hidden font-sans">
            
            {/* Sidebar Desktop (Disembunyikan saat layar seukuran HP/Tablet kecil) */}
            <div className="hidden md:flex shrink-0">
                <Sidebar />
            </div>

            {/* Area Kanan (Header + Konten Dinamis) */}
            <div className="flex flex-1 flex-col overflow-hidden relative">
                <Header />
                
                {/* Konten Utama dengan scroll mandiri (hanya bagian ini yang bisa di-scroll) */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
                    {/* Efek transisi ringan saat berpindah halaman */}
                    <div className="animate-in fade-in duration-500">
                        <Outlet />
                    </div>
                </main>
            </div>

        </div>
    );
}