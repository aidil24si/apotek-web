import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <div className="flex items-center justify-center mb-6">
                    <h1 className="text-4xl font-poppins font-extrabold text-gray-800">
                        <span className="text-black">Apotek</span>
                        {/* Ganti text-green-500 menjadi text-biru */}
                        <span className="text-biru">.</span>
                    </h1>
                </div>

                <Outlet/>

                {/* Update teks copyright agar relevan */}
                <p className="text-center text-xs text-gray-500 mt-6 leading-relaxed">
                    © 2026 Apotek Sehat Admin Dashboard. <br/>
                    All rights reserved.
                </p>
            </div>
        </div>
    )
}