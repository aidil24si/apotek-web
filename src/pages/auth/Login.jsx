import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

// Import komponen premium Shadcn UI untuk standardisasi portal otentikasi
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { supabase } from "../../supabaseClient";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
        role: "admin",
    });

    // Cek apakah user sudah login
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                // Ambil role user dari tabel profiles
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();
                
                if (profile) {
                    redirectBasedOnRole(profile.role);
                }
            }
        };
        checkUser();
    }, [navigate]);

    // Tampilkan pesan sukses dari registrasi
    useEffect(() => {
        if (location.state?.message) {
            setSuccessMsg(location.state.message);
            // Clear message setelah 5 detik
            setTimeout(() => setSuccessMsg(""), 5000);
        }
    }, [location.state]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
        if (errorMsg) setErrorMsg(""); 
    };

    // Handler khusus untuk perubahan nilai komponen Shadcn Select
    const handleRoleChange = (value) => {
        setDataForm({ ...dataForm, role: value });
        if (errorMsg) setErrorMsg("");
    };

    const redirectBasedOnRole = (role) => {
        const userRole = role?.toLowerCase();
        if (userRole === "admin") {
            navigate("/dashboard");
        } else if (userRole === "customer" || userRole === "member") {
            navigate("/member");
        } else if (userRole === "dokter") {
            navigate("/dokter");
        } else if (userRole === "apoteker") {
            navigate("/apoteker");
        } else {
            navigate("/");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            // Login dengan Supabase Auth
            const { data, error } = await supabase.auth.signInWithPassword({
                email: dataForm.email,
                password: dataForm.password,
            });

            if (error) {
                setErrorMsg(error.message || "Email atau password salah.");
                setLoading(false);
                return;
            }

            if (data.user) {
                // Ambil role user dari tabel profiles
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', data.user.id)
                    .single();

                if (profileError || !profile) {
                    setErrorMsg("Gagal mengambil data profil. Silakan hubungi administrator.");
                    setLoading(false);
                    return;
                }

                // Redirect berdasarkan role
                redirectBasedOnRole(profile.role);
            }
        } catch (err) {
            setErrorMsg("Terjadi kesalahan sistem. Silakan coba lagi.");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 font-sans items-stretch">
            {/* Kolom Kiri: Form Login */}
            <div className="flex-1 min-w-0">
                {/* Sub-Header Login */}
                <div className="text-center mb-6">
                    <h2 className="text-xl font-extrabold text-[#111827] tracking-tight">
                        Selamat Datang Kembali 👋
                    </h2>
                    <p className="text-gray-400 text-xs font-medium mt-1">
                        Silakan login untuk melanjutkan operasional sistem
                    </p>
                </div>

                {/* Area Komponen Alert Success */}
                {successMsg && (
                    <div className="mb-4 p-3.5 rounded-xl bg-green-50 border border-green-100 text-green-600 text-xs font-bold text-center animate-in fade-in zoom-in-95 duration-300">
                        {successMsg}
                    </div>
                )}

                {/* Area Komponen Alert Error */}
                {errorMsg && (
                    <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold text-center animate-in fade-in zoom-in-95 duration-300">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Input Email */}
                    <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-bold text-[#111827] uppercase tracking-wider ml-0.5">
                            Email Address
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={dataForm.email}
                            className="w-full py-5 bg-[#F3F4F6] border-none rounded-xl text-sm placeholder-gray-400 outline-none transition-all
                                       focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:border-[#2563EB] shadow-inner h-auto"
                            placeholder="nama@email.com" 
                            onChange={handleChange}
                        />
                    </div>

                    {/* Input Password */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center px-0.5">
                            <Label htmlFor="password" className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                                Password
                            </Label>
                            <Link to="/forgot" className="text-xs font-bold text-[#2563EB] hover:underline">
                                Lupa?
                            </Link>
                        </div>
                        <div className="relative group">
                            <Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                required
                                value={dataForm.password}
                                className="w-full py-5 bg-[#F3F4F6] border-none rounded-xl text-sm placeholder-gray-400 outline-none transition-all
                                           focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:border-[#2563EB] pr-12 shadow-inner h-auto"
                                placeholder="••••••••"
                                onChange={handleChange}
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <HiOutlineEyeOff size={16} /> : <HiOutlineEye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Dropdown Role Berbasis Shadcn UI Select */}
                    <div className="space-y-1.5">
                        <Label className="text-xs font-bold text-[#111827] uppercase tracking-wider ml-0.5">
                            Role Pengguna
                        </Label>
                        <Select value={dataForm.role} onValueChange={handleRoleChange}>
                            <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl font-semibold text-sm text-[#111827] px-4 py-5 shadow-inner focus:ring-4 focus:ring-blue-100 h-auto">
                                <SelectValue placeholder="Pilih Role" />
                            </SelectTrigger>
                            <SelectContent className="bg-white rounded-xl border border-gray-100 shadow-xl">
                                <SelectItem value="admin" className="font-semibold text-sm py-2.5">Admin</SelectItem>
                                <SelectItem value="dokter" className="font-semibold text-sm py-2.5">Dokter</SelectItem>
                                <SelectItem value="apoteker" className="font-semibold text-sm py-2.5">Apoteker</SelectItem>
                                <SelectItem value="customer" className="font-semibold text-sm py-2.5">Member (Customer)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Submit Button Shadcn */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold py-5 rounded-xl 
                                   transition-all duration-300 shadow-lg shadow-blue-600/20 active:scale-[0.98] h-auto text-sm mt-5"
                    >
                        {loading ? (
                            <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                        ) : (
                            <span>Masuk Sekarang</span>
                        )}
                    </Button>
                </form>

                <p className="text-center text-xs font-medium text-gray-400 mt-6">
                    Belum punya akses kredensial?{" "}
                    <Link to="/register" className="text-[#2563EB] font-bold hover:underline">
                        Daftar di sini
                    </Link>
                </p>
            </div>

            {/* Kolom Kanan: Kredensial Demo Instan */}
            <div className="w-full lg:w-[280px] lg:border-l lg:border-gray-100 lg:pl-6 flex flex-col justify-center space-y-4 mt-6 lg:mt-0 pt-6 lg:pt-0 border-t border-gray-100 lg:border-t-0">
                <div className="space-y-1">
                    <h3 className="text-xs font-black text-gray-900 tracking-wider flex items-center gap-1.5 uppercase">
                        ⚡ Uji Coba Demo Cepat
                    </h3>
                    <p className="text-[10px] text-gray-400 font-semibold leading-normal">
                        Klik salah satu akun di bawah ini untuk mengisi form login secara otomatis.
                    </p>
                </div>
                
                <div className="space-y-2.5">
                    {[
                        { 
                            roleName: "Administrator", 
                            email: "admin@apotek.com", 
                            pass: "admin123", 
                            roleVal: "admin",
                            desc: "Kelola inventaris & transaksi",
                            bg: "bg-blue-50/50 text-blue-700 hover:bg-blue-50 border border-blue-100/50" 
                        },
                        { 
                            roleName: "Dokter Medis", 
                            email: "rafi24si@mahasiswa.pcr.ac.id", 
                            pass: "12345678", 
                            roleVal: "dokter",
                            desc: "Buat e-resep & rekam medis",
                            bg: "bg-emerald-50/50 text-emerald-700 hover:bg-emerald-50 border border-emerald-100/50" 
                        },
                        { 
                            roleName: "Apoteker Farmasi", 
                            email: "apoteker@apotek.com", 
                            pass: "apoteker123", 
                            roleVal: "apoteker",
                            desc: "Verifikasi resep & dispensing",
                            bg: "bg-purple-50/50 text-purple-700 hover:bg-purple-50 border border-purple-100/50" 
                        },
                        { 
                            roleName: "Member Customer", 
                            email: "member@apotek.com", 
                            pass: "member123", 
                            roleVal: "customer",
                            desc: "Pesan obat & klaim promo",
                            bg: "bg-amber-50/50 text-amber-700 hover:bg-amber-50 border border-amber-100/50" 
                        }
                    ].map((demo, idx) => (
                        <div 
                            key={idx}
                            onClick={() => {
                                setDataForm({
                                    email: demo.email,
                                    password: demo.pass,
                                    role: demo.roleVal
                                });
                            }}
                            className={`p-3 rounded-2xl cursor-pointer transition-all flex flex-col gap-1 shadow-xs hover:scale-[1.01] ${demo.bg}`}
                        >
                            <div className="flex justify-between items-center w-full">
                                <span className="font-bold text-[11px]">{demo.roleName}</span>
                                <span className="text-[9px] font-black opacity-80 uppercase tracking-wider">Pilih</span>
                            </div>
                            <span className="text-[10px] font-bold opacity-90 truncate">Email: {demo.email}</span>
                            <span className="text-[9px] opacity-75 leading-tight font-medium">{demo.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}