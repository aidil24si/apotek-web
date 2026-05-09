import { useState } from "react";
import { HiOutlineMail, HiOutlineCheckCircle } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Forgot() {
    const [isSent, setIsSent] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulasi pengiriman email
        setIsSent(true);
    };

    // Tampilan setelah Link Reset Terkirim
    if (isSent) {
        return (
            <div className="text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full">
                        <HiOutlineCheckCircle className="text-5xl text-green-600" />
                    </div>
                </div>
                <h2 className="text-[26px] font-bold text-[#111827] mb-2 tracking-tight">
                    Cek Email Anda!
                </h2>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                    Kami telah mengirimkan instruksi pemulihan password ke <br />
                    <span className="font-bold text-[#111827]">{email || "email Anda"}</span>
                </p>
                
                <button
                    onClick={() => setIsSent(false)}
                    className="w-full bg-[#F3F4F6] hover:bg-gray-200 text-[#111827] font-bold py-3.5 px-4 rounded-xl transition-all mb-4"
                >
                    Ganti email
                </button>

                <Link 
                    to="/login" 
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
                >
                    <BiArrowBack /> Kembali ke Login
                </Link>
            </div>
        );
    }

    // Tampilan Form Utama
    return (
        <div className="animate-in fade-in duration-500">
            <h2 className="text-[26px] font-bold text-[#111827] mb-2 text-center tracking-tight">
                Lupa Password? 🔑
            </h2>
            
            <p className="text-sm text-gray-500 mb-8 text-center leading-relaxed px-4">
                Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#111827] mb-2 ml-1">
                        Alamat Email
                    </label>
                    <div className="relative group">
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3.5 bg-[#F3F4F6] border border-transparent rounded-xl 
                                       text-sm placeholder-gray-400 outline-none transition-all
                                       focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 pl-11"
                            placeholder="nama@email.com"
                        />
                        <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2563EB] text-lg transition-colors" />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold py-3.5 px-4
                               rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/25 
                               active:scale-[0.98]"
                >
                    Kirim Link Reset
                </button>
            </form>

            <div className="mt-8 text-center">
                <Link 
                    to="/login" 
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#1d4ed8] transition-colors group"
                >
                    <BiArrowBack className="group-hover:-translate-x-1 transition-transform" />
                    Kembali ke Login
                </Link>
            </div>
        </div>
    );
}