import { useState } from "react";
import { HiOutlineMail, HiOutlineCheckCircle } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

// Import jajaran komponen standar Shadcn UI untuk form otentikasi premium
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function Forgot() {
    const [isSent, setIsSent] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulasi pengiriman email instruksi pemulihan kredensial akun
        setIsSent(true);
    };

    {/* TAMPILAN KONDISIONAL: BERHASIL TERKIRIM */}
    if (isSent) {
        return (
            <div className="text-center animate-in fade-in zoom-in-95 duration-500 font-sans">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-50 p-4 rounded-full border border-green-100 animate-bounce duration-1000">
                        <HiOutlineCheckCircle className="text-5xl text-green-600" />
                    </div>
                </div>
                <h2 className="text-2xl font-extrabold text-[#111827] mb-2 tracking-tight">
                    Cek Email Anda!
                </h2>
                <p className="text-sm text-gray-400 mb-8 leading-relaxed font-medium">
                    Kami telah mengirimkan instruksi pemulihan password ke <br />
                    <span className="font-bold text-gray-700 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 break-all">{email || "email Anda"}</span>
                </p>
                
                <Button
                    variant="secondary"
                    onClick={() => setIsSent(false)}
                    className="w-full bg-[#F3F4F6] hover:bg-gray-200 text-[#111827] font-bold py-6 rounded-xl transition-all mb-5 text-sm h-auto"
                >
                    Ganti Alamat Email
                </Button>

                <div>
                    <Link 
                        to="/login" 
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#1d4ed8] transition-colors group"
                    >
                        <BiArrowBack className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Login
                    </Link>
                </div>
            </div>
        );
    }

    {/* TAMPILAN UTAMA: FORMULIR REQUEST LINK RESET */}
    return (
        <div className="animate-in fade-in duration-500 font-sans">
            <h2 className="text-2xl font-bold text-[#111827] mb-2 text-center tracking-tight">
                Lupa Password? 🔑
            </h2>
            
            <p className="text-sm text-gray-400 mb-8 text-center leading-relaxed px-4 font-medium">
                Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi akun Anda.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold text-[#111827] uppercase tracking-wider ml-1">
                        Alamat Email Kerja
                    </Label>
                    <div className="relative group">
                        <Input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full py-6 bg-[#F3F4F6] border-none rounded-xl text-sm placeholder-gray-400 outline-none transition-all
                                       focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:border-[#2563EB] pl-11 shadow-inner h-auto"
                            placeholder="nama@email.com"
                        />
                        <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2563EB] text-lg transition-colors" />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold py-6 rounded-xl 
                               transition-all duration-300 shadow-lg shadow-blue-600/20 active:scale-[0.98] h-auto text-sm"
                >
                    Kirim Link Reset
                </Button>
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