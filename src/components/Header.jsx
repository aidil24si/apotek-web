import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSearch, FaBars } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

// Import jajaran komponen premium Shadcn UI untuk Header standar enterprise
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Pembersihan storage token diletakkan di sini jika diperlukan
        navigate("/");
    };

    return (
        <div id="header-container" className="flex items-center justify-between bg-white px-4 md:px-10 py-4 shadow-sm border-b border-gray-100 relative z-30 font-sans">
            
            {/* Bagian Kiri (Logo Mobile & Tombol Hamburger) */}
            <div className="flex items-center gap-4 md:hidden">
                <button className="text-gray-500 hover:text-[#2563EB] transition-colors p-2 rounded-xl hover:bg-gray-50">
                    <FaBars size={20} />
                </button>
            </div>

            {/* BAR PENCARIAN UTAMA (Menggunakan Dialog Shadcn UI) */}
            <div id="search-bar" className="relative w-full max-w-md items-center hidden md:flex">
                <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                    <DialogTrigger asChild>
                        <div className="relative w-full group cursor-pointer">
                            <Input
                                type="text"
                                placeholder="Cari Data Obat..."
                                className="w-full bg-gray-50 border-none rounded-xl py-5 pl-4 pr-12 outline-none cursor-pointer transition-all text-sm h-auto shadow-inner group-hover:bg-gray-100/70"
                                readOnly
                            />
                            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#2563EB] transition-colors" />
                        </div>
                    </DialogTrigger>
                    
                    <DialogContent className="sm:max-w-[600px] rounded-[24px] p-6 bg-white border border-gray-100 shadow-2xl animate-in zoom-in-95">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold text-gray-800 tracking-tight">Cari Data Cepat</DialogTitle>
                        </DialogHeader>
                        <div className="relative mt-4 group">
                            <Input 
                                autoFocus 
                                type="text" 
                                placeholder="Ketik nama obat atau kategori..." 
                                className="w-full py-6 bg-gray-50 rounded-xl border-2 border-transparent focus-visible:border-[#2563EB] focus-visible:ring-4 focus-visible:ring-blue-100 shadow-inner text-base h-auto transition-all pl-4 pr-12"
                            />
                            <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-[#2563EB] text-lg" />
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2 items-center">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sering dicari:</span>
                            {["Paracetamol", "Antasida", "Vitamin C", "Amoxicillin"].map(item => (
                                <span 
                                    key={item} 
                                    className="text-xs bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full text-gray-600 cursor-pointer hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] font-semibold transition-all"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* AREA UTILITAS & PROFIL (KANAN) */}
            <div id="icons-container" className="flex items-center gap-4 md:gap-6">
                
                {/* Tombol Trigger Pencarian khusus Layar Mobile */}
                <button 
                    className="md:hidden text-gray-500 hover:text-[#2563EB] p-2 hover:bg-gray-50 rounded-xl transition-colors"
                    onClick={() => setIsSearchOpen(true)}
                >
                    <FaSearch size={18} />
                </button>

                {/* Barisan Ikon Notifikasi & Menu Sistem */}
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] cursor-pointer hover:bg-blue-100/80 transition-colors">
                        <FaBell size={16} />
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
                            3
                        </span>
                    </div>
                    <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer text-xl transition-colors">
                        <FcAreaChart size={20} />
                    </div>
                    <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
                        <SlSettings size={16} />
                    </div>
                </div>

                <div className="hidden md:block h-6 w-[1px] bg-gray-200"></div>

                {/* SEKSI MENU DROP PROFIL (Menggunakan Dropdown Menu Shadcn UI) */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                        <div className="flex items-center gap-3 group cursor-pointer text-left">
                            <div className="text-right hidden md:block">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">Welcome,</p>
                                <p className="text-sm font-extrabold text-gray-900 tracking-tight group-hover:text-[#2563EB] transition-colors">Aidil Ikhsan</p>
                            </div>
                            <Avatar className="h-10 w-10 border-2 border-[#2563EB] p-0.5 transition-transform duration-300 group-hover:scale-105 bg-white">
                                <AvatarImage src="/img/Aidil.jpg" className="rounded-full object-cover" />
                                <AvatarFallback className="font-bold text-xs bg-blue-50 text-[#2563EB]">AI</AvatarFallback>
                            </Avatar>
                        </div>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent className="w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl p-2 mt-2 mr-4 animate-in slide-in-from-top-2" align="end">
                        <DropdownMenuLabel className="p-3 text-center">
                            <p className="font-extrabold text-gray-800 text-sm">Aidil Ikhsan</p>
                            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5">Apoteker Utama</p>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-100" />
                        <DropdownMenuItem className="p-2.5 text-xs font-bold text-gray-600 rounded-xl cursor-pointer focus:bg-blue-50 focus:text-[#2563EB] transition-colors">
                            Edit Profil Akun
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            onClick={handleLogout}
                            className="p-2.5 text-xs font-bold text-red-600 rounded-xl cursor-pointer focus:bg-red-50 focus:text-red-600 transition-colors"
                        >
                            Keluar / Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </div>
    );
}