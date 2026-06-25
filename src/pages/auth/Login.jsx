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
        <div className="flex flex-col font-sans">
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
                    <Select defaultValue={dataForm.role} onValueChange={handleRoleChange}>
                        <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl font-semibold text-sm text-[#111827] px-4 py-5 shadow-inner focus:ring-4 focus:ring-blue-100 h-auto">
                            <SelectValue placeholder="Pilih Role" />
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded-xl border border-gray-100 shadow-xl">
                            <SelectItem value="admin" className="font-semibold text-sm py-2.5">Admin</SelectItem>
                            <SelectItem value="dokter" className="font-semibold text-sm py-2.5">Dokter</SelectItem>
                            <SelectItem value="apoteker" className="font-semibold text-sm py-2.5">Apoteker</SelectItem>
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
    );
}