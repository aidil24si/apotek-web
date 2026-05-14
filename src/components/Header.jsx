import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan import ini
import { FaBell, FaSearch, FaBars } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate(); // Inisialisasi fungsi navigasi

    // Fungsi untuk menangani proses logout
    const handleLogout = () => {
        // Jika Anda menggunakan localStorage/sessionStorage, Anda bisa menghapusnya di sini
        // contoh: localStorage.removeItem("token");
        
        // Arahkan kembali ke halaman login (atau "/" jika ingin ke landing page)
        navigate("/");
    };

    return (
        <div id="header-container" className="flex items-center justify-between bg-white px-4 md:px-10 py-4 shadow-sm relative z-30">
            
            {/* Bagian Kiri (Logo Mobile & Tombol Hamburger) */}
            <div className="flex items-center gap-4 md:hidden">
                <button className="text-gray-500 hover:text-[#2563EB] transition-colors p-2">
                    <FaBars size={20} />
                </button>
            </div>

            {/* Search Bar (Tersembunyi di Mobile, Tampil di Desktop) */}
            <div id="search-bar" className="relative hidden md:flex w-full max-w-md items-center">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Cari Data Obat..."
                    className="w-full rounded-xl bg-gray-50 py-2.5 pl-4 pr-12 outline-none focus:ring-2 focus:ring-[#2563EB]/20 cursor-pointer border border-transparent focus:bg-white transition-all text-sm"
                    onClick={() => setIsSearchOpen(true)}
                    readOnly
                />
                <FaSearch id="search-icon" className="absolute right-4 text-gray-400" />
            </div>

            {/* Modal Pencarian Aktif */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[999] flex items-start justify-center bg-black/40 pt-16 md:pt-24 backdrop-blur-sm animate-in fade-in duration-300 p-4">
                    <div className="w-full max-w-2xl rounded-3xl bg-white p-6 md:p-8 shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Cari Data Cepat</h3>
                            <button 
                                onClick={() => setIsSearchOpen(false)}
                                className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="relative">
                            <input 
                                autoFocus 
                                type="text" 
                                placeholder="Ketik nama obat atau kategori..." 
                                className="w-full p-4 md:p-5 bg-gray-50 rounded-2xl outline-none border-2 border-[#2563EB] shadow-inner text-sm md:text-base focus:bg-white transition-colors" 
                            />
                            <FaSearch className="absolute right-5 top-5 md:top-6 text-[#2563EB] text-lg md:text-xl" />
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                            <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase flex items-center">Sering dicari:</span>
                            {["Paracetamol", "Antasida", "Vitamin C", "Amoxicillin"].map(item => (
                                <span 
                                    key={item} 
                                    className="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600 cursor-pointer hover:bg-[#2563EB]/10 hover:text-[#2563EB] font-medium transition-colors"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                    {/* Background Click to Close */}
                    <div className="fixed inset-0 -z-10" onClick={() => setIsSearchOpen(false)}></div>
                </div>
            )}

            {/* Icon & Profile Section (Kanan) */}
            <div id="icons-container" className="flex items-center gap-4 md:gap-8">
                
                {/* Search Icon untuk Mobile */}
                <button 
                    className="md:hidden text-gray-500 hover:text-[#2563EB]"
                    onClick={() => setIsSearchOpen(true)}
                >
                    <FaSearch size={18} />
                </button>

                {/* Icons Area */}
                <div className="flex items-center gap-2 md:gap-4">
                    <div id="notification-icon" className="relative flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] cursor-pointer hover:bg-blue-100 transition-colors">
                        <FaBell size={18} className="md:w-5 md:h-5" />
                        <span id="notification-badge" className="absolute -right-1 -top-1 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-red-500 text-[9px] md:text-[10px] font-bold text-white border-2 border-white">
                            3
                        </span>
                    </div>
                    {/* Sembunyikan ikon tambahan di mobile agar tidak sempit */}
                    <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer text-xl transition-colors">
                        <FcAreaChart />
                    </div>
                    <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer text-gray-400 hover:text-gray-600 text-xl transition-colors">
                        <SlSettings />
                    </div>
                </div>

                {/* Garis Pemisah (Hanya Desktop) */}
                <div className="hidden md:block h-8 w-[1px] bg-gray-200"></div>

                {/* Profile Tooltip */}
                <div id="profile-container" className="flex items-center gap-3 md:gap-4 relative group cursor-pointer">
                    <div className="text-right hidden md:block">
                        <p className="text-[11px] text-gray-400 font-medium">Welcome,</p>
                        <p className="text-sm font-bold text-gray-900 tracking-tight">Aidil Ikhsan</p>
                    </div>
                    <div className="relative">
                        <img
                            id="profile-avatar"
                            src="/img/Aidil.jpg"
                            alt="Profile"
                            className="h-9 w-9 md:h-11 md:w-11 rounded-full border-2 border-[#2563EB] object-cover p-0.5 group-hover:scale-105 transition-transform bg-white"
                            onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Aidil+Ikhsan&background=EFF6FF&color=2563EB" }}
                        />
                        {/* Tooltip Card (Muncul saat di-hover pada Desktop) */}
                        <div className="absolute top-14 right-0 hidden md:group-hover:block w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl p-5 z-50 animate-in slide-in-from-top-2">
                            <div className="text-center">
                                <p className="font-bold text-gray-800">Aidil Ikhsan</p>
                                <p className="text-[10px] text-gray-400 mb-4 font-medium uppercase tracking-wider">Apoteker Utama</p>
                                <div className="space-y-2">
                                    <button className="w-full py-2 bg-gray-50 rounded-lg text-xs font-bold text-gray-600 hover:bg-[#2563EB]/10 hover:text-[#2563EB] transition-colors">
                                        Edit Profile
                                    </button>
                                    {/* EVENT ONCLICK DITAMBAHKAN DI SINI */}
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full py-2 bg-red-50 rounded-lg text-xs font-bold text-red-600 hover:bg-red-100 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}