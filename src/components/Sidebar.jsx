import { MdDashboard, MdOutlineAssignment, MdPeople, MdOutlineMedicalServices, MdOutlineMedication, MdOutlineLocalPharmacy, MdOutlineHistoryEdu } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col">
                <span id="logo-title" className="font-poppins text-[40px] font-bold text-gray-900 tracking-tight">
                    Apotek<b className="text-biru">Sehat.</b>
                </span>
                <span className="font-semibold text-gray-400">Pharmacy Management System</span>
            </div>

            {/* Menu Navigasi */}
            <div id="sidebar-menu" className="mt-10">
                <ul className="space-y-3">
                    <li>
                        <Link to="/" className="flex items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-blue-50 hover:text-biru transition-all">
                            <MdDashboard className="mr-4 text-xl" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/transactions" className="flex items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-blue-50 hover:text-biru transition-all">
                            <MdOutlineAssignment className="mr-4 text-xl" />
                            <span>Transaksi Obat</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/patients" className="flex items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-blue-50 hover:text-biru transition-all">
                            <MdPeople className="mr-4 text-xl" />
                            <span>Data Pasien</span>
                        </Link>
                    </li>

                    <div className="pt-4 pb-2 px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Inventaris</div>
                    <li>
                        <Link to="/obat-keras" className="flex items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all">
                            <MdOutlineMedication className="mr-4 text-xl" />
                            <span>Obat Keras (G)</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/obat-bebas" className="flex items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-50 hover:text-green-600 transition-all">
                            <MdOutlineLocalPharmacy className="mr-4 text-xl" />
                            <span>Obat Bebas</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/resep" className="flex items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-all">
                            <MdOutlineHistoryEdu className="mr-4 text-xl" />
                            <span>Arsip Resep</span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Footer Sidebar */}
            <div className="mt-auto">
                <div className="mb-10 flex items-center rounded-3xl bg-biru px-6 py-6 shadow-xl shadow-blue-100 relative overflow-hidden text-white">
                    <div className="text-xs relative z-10">
                        <p className="leading-relaxed font-medium">Stok obat menipis? Segera lakukan restock!</p>
                        <button className="mt-4 flex items-center justify-center space-x-2 rounded-xl bg-white px-4 py-2 w-full text-gray-800 active:scale-95 transition-transform">
                            <FaPlus className="text-biru text-xs" />
                            <span className="font-bold">Tambah Stok</span>
                        </button>
                    </div>
                </div>
                <div className="px-2">
                    <span className="font-bold text-gray-800 block">Apotek Sehat v1.0</span>
                    <p className="text-xs text-gray-400 mt-1">&copy; 2026 Pharmacist Admin</p>
                </div>
            </div>
        </div>
    );
}