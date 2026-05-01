import { useState } from "react";
import { FaBell, FaSearch, FaUserMd } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div className="flex items-center justify-between bg-white px-10 py-4 shadow-sm relative">
            <div className="relative flex w-1/2 items-center">
                <input
                    type="text"
                    placeholder="Cari Obat, Resep, atau Pasien..."
                    className="w-full rounded-xl bg-gray-50 py-3 pl-4 pr-12 outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    onClick={() => setIsSearchOpen(true)}
                    readOnly
                />
                <FaSearch className="absolute right-4 text-gray-400" />
            </div>

            {/* Modal Search Improvisasi */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[999] flex items-start justify-center bg-black/40 pt-24 backdrop-blur-sm">
                    <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800 font-poppins">Pencarian Cepat Medis</h3>
                            <button onClick={() => setIsSearchOpen(false)} className="h-8 w-8 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500">✕</button>
                        </div>
                        <input autoFocus type="text" placeholder="Ketik nama obat (misal: Paracetamol)..." className="w-full p-5 bg-gray-50 rounded-2xl outline-none border-2 border-biru shadow-inner" />
                        <div className="mt-6 flex flex-wrap gap-2">
                            <span className="text-xs font-bold text-gray-400 uppercase w-full mb-2">Kategori Populer:</span>
                            {["Antibiotik", "Vitamin C", "Resep #402", "Insulin"].map(item => (
                                <span key={item} className="text-xs bg-blue-50 px-3 py-1 rounded-full text-biru cursor-pointer hover:bg-biru hover:text-white transition-colors">{item}</span>
                            ))}
                        </div>
                    </div>
                    <div className="fixed inset-0 -z-10" onClick={() => setIsSearchOpen(false)}></div>
                </div>
            )}

            <div className="flex items-center gap-8">
                <div className="flex items-center gap-4">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-biru">
                        <FaBell size={20} />
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">12</span>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-400"><SlSettings /></div>
                </div>
                <div className="h-10 w-[1px] bg-gray-200"></div>
                <div className="flex items-center gap-4 group relative">
                    <div className="text-right">
                        <p className="text-xs text-gray-400">Apoteker Jaga,</p>
                        <p className="text-sm font-bold text-gray-900">apt. Aidil Ikhsan</p>
                    </div>
                    <div className="h-12 w-12 rounded-full border-2 border-biru p-0.5 flex items-center justify-center bg-blue-50 text-biru">
                        <FaUserMd size={24} />
                    </div>
                </div>
            </div>
        </div>
    );
}