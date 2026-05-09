import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        // MENGUBAH h-[100dvh] menjadi min-h-screen dan menghapus overflow-hidden
        <div className="min-h-screen w-full bg-[#F9FAFB] flex items-center justify-center p-4">
            
            {/* Kartu Putih Utama */}
            <div className="bg-white w-full max-w-[400px] p-6 md:p-8 rounded-[24px] shadow-xl shadow-gray-200/50 flex flex-col justify-center animate-in fade-in zoom-in-95 duration-500">
                
                {/* Logo Apotek */}
                <div className="text-center mb-2">
                    <h1 className="text-2xl font-black text-[#111827] tracking-tight">
                        Apotek<span className="text-[#2563EB]">.</span>
                    </h1>
                </div>

                {/* Area Konten Dinamis (Form Login/Register/Forgot) */}
                <Outlet />

                {/* Footer Copyright */}
                <p className="text-center text-[10px] text-gray-400 mt-5">
                    &copy; 2026 Apotek Sehat Admin Dashboard. <br />
                    All rights reserved.
                </p>
            </div>
        </div>
    );
}