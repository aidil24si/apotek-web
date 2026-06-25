import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

// Import komponen premium Shadcn UI untuk standardisasi form pendaftaran akun
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { supabase } from "../../supabaseClient";

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    
    const [dataForm, setDataForm] = useState({ 
        email: "", 
        password: "", 
        confirmPassword: "",
        role: "customer"
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
        if (errorMsg) setErrorMsg("");
    };

    const handleRoleChange = (value) => {
        setDataForm({ ...dataForm, role: value });
        if (errorMsg) setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validasi kecocokan password sebelum mengirim request ke API
        if (dataForm.password !== dataForm.confirmPassword) {
            setErrorMsg("Konfirmasi kata sandi tidak cocok. Silakan periksa kembali.");
            return;
        }

        if (dataForm.password.length < 6) {
            setErrorMsg("Kata sandi harus minimal 6 karakter.");
            return;
        }

        setLoading(true);
        setErrorMsg("");

        try {
            // Registrasi dengan Supabase Auth
            const { data, error } = await supabase.auth.signUp({
                email: dataForm.email,
                password: dataForm.password,
            });

            if (error) {
                setErrorMsg(error.message || "Gagal mendaftar. Silakan coba lagi.");
                setLoading(false);
                return;
            }

            if (data.user) {
                // Simpan data profil ke tabel profiles
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: data.user.id,
                            email: dataForm.email,
                            role: dataForm.role,
                        }
                    ]);

                if (profileError) {
                    console.error("Error saving profile:", profileError);
                }

                // Logout user yang baru daftar (agar tidak auto-login)
                await supabase.auth.signOut();

                // Redirect ke halaman login dengan pesan sukses
                navigate("/login", { 
                    state: { message: "Registrasi berhasil! Silakan login dengan akun Anda." }
                });
            }
        } catch (err) {
            setErrorMsg("Terjadi kesalahan sistem. Silakan coba lagi.");
            setLoading(false);
        }
    };

    // Cek apakah user sudah login
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                // Jika sudah login, cek role dan redirect sesuai role
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();
                
                if (profile) {
                    if (profile.role === 'admin') {
                        navigate("/dashboard");
                    } else {
                        navigate("/");
                    }
                } else {
                    // Jika belum ada profile, logout dan ke login
                    await supabase.auth.signOut();
                    navigate("/login");
                }
            }
        };
        checkUser();
    }, [navigate]);

    return (
        <div className="flex flex-col font-sans">
            {/* Sub-Header Pendaftaran */}
            <div className="text-center mb-6">
                <h2 className="text-xl font-extrabold text-[#111827] tracking-tight">
                    Daftar Akun Baru ✨
                </h2>
                <p className="text-gray-400 text-xs font-medium mt-1">
                    Lengkapi data untuk akses sistem manajemen apotek
                </p>
            </div>

            {/* Banner Informasi Validasi Error */}
            {errorMsg && (
                <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-bold text-center animate-in fade-in zoom-in-95 duration-300">
                    {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input Email Address */}
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

                {/* Dropdown Role */}
                <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-[#111827] uppercase tracking-wider ml-0.5">
                        Role Pengguna
                    </Label>
                    <Select defaultValue={dataForm.role} onValueChange={handleRoleChange}>
                        <SelectTrigger className="w-full bg-[#F3F4F6] border-none rounded-xl font-semibold text-sm text-[#111827] px-4 py-5 shadow-inner focus:ring-4 focus:ring-blue-100 h-auto">
                            <SelectValue placeholder="Pilih Role" />
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded-xl border border-gray-100 shadow-xl">
                            <SelectItem value="customer" className="font-semibold text-sm py-2.5">Customer</SelectItem>
                            <SelectItem value="dokter" className="font-semibold text-sm py-2.5">Dokter</SelectItem>
                            <SelectItem value="apoteker" className="font-semibold text-sm py-2.5">Apoteker</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Input Password */}
                <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-xs font-bold text-[#111827] uppercase tracking-wider ml-0.5">
                        Password
                    </Label>
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

                {/* Input Konfirmasi Password */}
                <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword" className="text-xs font-bold text-[#111827] uppercase tracking-wider ml-0.5">
                        Konfirmasi Password
                    </Label>
                    <div className="relative group">
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            className="w-full py-5 bg-[#F3F4F6] border-none rounded-xl text-sm placeholder-gray-400 outline-none transition-all
                                       focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:border-[#2563EB] pr-12 shadow-inner h-auto"
                            placeholder="••••••••"
                            onChange={handleChange}
                        />
                        <button 
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showConfirmPassword ? <HiOutlineEyeOff size={16} /> : <HiOutlineEye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Tombol Submit Registrasi Shadcn */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-bold py-5 rounded-xl 
                               transition-all duration-300 shadow-lg shadow-blue-600/20 active:scale-[0.98] h-auto text-sm mt-5"
                >
                    {loading ? (
                        <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                    ) : (
                        <span>Daftar Sekarang</span>
                    )}
                </Button>
            </form>

            <p className="text-center text-xs font-medium text-gray-400 mt-6">
                Sudah memiliki akun terdaftar?{" "}
                <Link to="/login" className="text-[#2563EB] font-bold hover:underline">
                    Masuk di sini
                </Link>
            </p>
        </div>
    );
}