import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineChevronDown } from "react-icons/hi"; 
import { BiLogInCircle } from "react-icons/bi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
        role: "Admin",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/");
        }, 1500);
    };

    return (
        /* MAIN CONTAINER: 
           - bg-[#EFF6FF] adalah biru pucat di belakang card Figma.
           - items-center & justify-center membuat card persis di tengah layar.
        */
        <div className="min-h-screen w-full bg-[#EFF6FF] flex items-center justify-center p-4 md:p-8">
            
            {/* CARD COMPONENT:
               - w-full & max-w-[420px] membuat card responsive (kecil di mobile, pas di desktop).
               - shadow-2xl dengan opacity biru untuk efek "glow" halus di bawah card.
            */}
            <div className="bg-white w-full max-w-[420px] p-8 md:p-10 rounded-[28px] shadow-2xl shadow-blue-200/60">
                
                {/* LOGO BOX: Persis seperti kotak biru stetoskop di Figma */}
                <div className="flex justify-center mb-6">
                    <div className="bg-[#2563EB] p-4 rounded-[20px] shadow-lg shadow-blue-600/30">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                        </svg>
                    </div>
                </div>

                {/* TEXT HEADER: Typography Neutral-Dark */}
                <div className="text-center mb-8">
                    <h2 className="text-[26px] font-bold text-[#111827] tracking-tight">
                        Sistem Informasi Klinik
                    </h2>
                    <p className="text-[#6B7280] text-sm mt-1">
                        Silakan login untuk melanjutkan
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* INPUT EMAIL */}
                    <div>
                        <label className="block text-[14px] font-semibold text-[#111827] mb-2">
                            Email atau Username
                        </label>
                        <input
                            type="text"
                            name="email"
                            required
                            className="w-full px-4 py-3.5 bg-[#F3F4F6] border border-transparent rounded-xl text-sm 
                                       transition-all placeholder:text-gray-400 outline-none
                                       focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
                            placeholder="Masukkan email atau username"
                            onChange={handleChange}
                        />
                    </div>

                    {/* INPUT PASSWORD */}
                    <div>
                        <label className="block text-[14px] font-semibold text-[#111827] mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full px-4 py-3.5 bg-[#F3F4F6] border border-transparent rounded-xl text-sm 
                                       transition-all placeholder:text-gray-400 outline-none
                                       focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
                            placeholder="Masukkan password"
                            onChange={handleChange}
                        />
                    </div>

                    {/* DROPDOWN ROLE */}
                    <div>
                        <label className="block text-[14px] font-semibold text-[#111827] mb-2">
                            Role Pengguna
                        </label>
                        <div className="relative">
                            <select
                                name="role"
                                onChange={handleChange}
                                className="w-full px-4 py-3.5 bg-[#F3F4F6] border border-transparent rounded-xl text-sm 
                                           appearance-none focus:bg-white focus:border-[#2563EB] outline-none 
                                           transition-all cursor-pointer text-[#111827]"
                            >
                                <option value="Admin">Admin</option>
                                <option value="Dokter">Dokter</option>
                                <option value="Apoteker">Apoteker</option>
                            </select>
                            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                <HiOutlineChevronDown className="text-gray-500 text-lg" />
                            </div>
                        </div>
                    </div>

                    {/* SUBMIT BUTTON: Primary Color Blue-600 */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] disabled:bg-gray-400 
                                   text-white font-bold py-4 px-4 rounded-xl transition-all 
                                   flex justify-center items-center gap-2 shadow-lg shadow-blue-600/30
                                   active:scale-[0.98] mt-6"
                    >
                        {loading ? (
                            <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                        ) : (
                            <>
                                <BiLogInCircle className="text-xl" />
                                <span>Login</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}