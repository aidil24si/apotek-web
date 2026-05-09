import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [dataForm, setDataForm] = useState({ email: "", password: "", confirmPassword: "" });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/login");
        }, 1500);
    };

    return (
        <div className="flex flex-col">
            {/* Sub-Header Khusus Register */}
            <div className="text-center mb-5">
                <h2 className="text-lg font-bold text-[#111827]">
                    Daftar Akun Baru ✨
                </h2>
                <p className="text-gray-500 text-xs mt-0.5">
                    Lengkapi data untuk akses sistem klinik
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                {/* Input Email Address */}
                <div>
                    <label className="block text-xs font-bold text-[#111827] mb-1">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 bg-[#F3F4F6] border border-transparent rounded-xl text-sm 
                                   outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                        placeholder="nama@email.com" 
                        onChange={handleChange}
                    />
                </div>

                {/* Input Password */}
                <div>
                    <label className="block text-xs font-bold text-[#111827] mb-1">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            className="w-full px-4 py-2 bg-[#F3F4F6] border border-transparent rounded-xl text-sm 
                                       outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                            placeholder="••••••••"
                            onChange={handleChange}
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <HiOutlineEyeOff size={16} /> : <HiOutlineEye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Input Konfirmasi Password */}
                <div>
                    <label className="block text-xs font-bold text-[#111827] mb-1">Konfirmasi Password</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            required
                            className="w-full px-4 py-2 bg-[#F3F4F6] border border-transparent rounded-xl text-sm 
                                       outline-none focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all"
                            placeholder="••••••••"
                            onChange={handleChange}
                        />
                        <button 
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            {showConfirmPassword ? <HiOutlineEyeOff size={16} /> : <HiOutlineEye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] disabled:bg-blue-300 
                               text-white font-bold py-2.5 rounded-xl transition-all text-sm
                               flex justify-center items-center gap-2 mt-4 shadow-md active:scale-[0.98]"
                >
                    {loading ? <AiOutlineLoading3Quarters className="animate-spin text-lg" /> : <span>Daftar Sekarang</span>}
                </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-5">
                Sudah punya akun? <Link to="/login" className="text-[#2563EB] font-bold hover:underline">Masuk di sini</Link>
            </p>
        </div>
    );
}