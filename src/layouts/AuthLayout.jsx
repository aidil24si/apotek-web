import { Outlet, useLocation } from "react-router-dom";

// Import komponen Card dari ekosistem Shadcn UI untuk standardisasi kontainer
import { Card, CardContent } from "../components/ui/card";

export default function AuthLayout() {
    const location = useLocation();
    const isLogin = location.pathname === "/login";

    return (
        <div className="min-h-screen w-full bg-[#F9FAFB] flex items-center justify-center p-4 font-sans">
            
            {/* Kartu Putih Utama menggunakan Shadcn Card */}
            <Card className={`bg-white w-full rounded-[24px] border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden animate-in fade-in zoom-in-95 duration-500 transition-all ${isLogin ? "max-w-[400px] lg:max-w-[800px]" : "max-w-[400px]"}`}>
                <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                    
                    {/* Logo Aplikasi Apotek */}
                    <div className="text-center mb-4 select-none">
                        <h1 className="text-2xl font-black text-[#111827] tracking-tight">
                            Apotek<span className="text-[#2563EB]">.</span>
                        </h1>
                    </div>

                    {/* Area Konten Dinamis (Form Login / Register / Forgot) */}
                    <Outlet />

                    {/* Footer Hak Cipta */}
                    <p className="text-center text-[10px] text-gray-400 mt-6 leading-relaxed font-medium">
                        &copy; 2026 Apotek Sehat Admin Dashboard. <br />
                        All rights reserved.
                    </p>
                    
                </CardContent>
            </Card>
        </div>
    );
}