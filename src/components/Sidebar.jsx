import { MdDashboard, MdOutlineAssignment, MdPeople, MdErrorOutline, MdOutlineRestaurantMenu, MdOutlineLocalDrink, MdOutlineCookie, MdOutlineStars } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col">
                <span id="logo-title" className="font-poppins text-[48px] text-gray-900">
                    Sedap <b id="logo-dot" className="text-hijau">.</b>
                </span>
                <span id="logo-subtitle" className="font-semibold text-gray-400">Modern Admin Dashboard</span>
            </div>

            {/* List Menu */}
            <li>
            <div id="sidebar-menu" className="mt-10">
                <ul id="menu-list" className="space-y-3">
                    <li>
                        <Link to="/" id="menu-1" className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:text-hijau hover:font-extrabold transition-all">
                            <MdDashboard className="mr-4 text-xl" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders" id="menu-2" className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:text-hijau hover:font-extrabold transition-all">
                            <MdOutlineAssignment className="mr-4 text-xl" />
                            <span>Orders</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/customers" id="menu-3" className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-green-200 hover:text-hijau hover:font-extrabold transition-all">
                            <MdPeople className="mr-4 text-xl" />
                            <span>Customers</span>
                        </Link>
                    </li>

                    {/* --- BAGIAN BARU: LIST MENU ERROR --- */}
                    <div className="pt-4 pb-2 px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        Menu
                    </div>
                    <li>
                        <Link to="/error-400" className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all">
                            <MdOutlineRestaurantMenu className="mr-4 text-xl" />
                            <span>Makanan</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/error-401" className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all">
                            <MdOutlineLocalDrink className="mr-4 text-xl" />
                            <span>Minuman</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/error-403" className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all">
                            <MdOutlineCookie className="mr-4 text-xl" />
                            <span>Snack</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/error-404" className="flex cursor-pointer items-center rounded-xl p-4 font-medium text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all">
                            <MdOutlineStars className="mr-4 text-xl" />
                            <span>Reward</span>
                        </Link>
                    </li>
                </ul>
            </div>

            </li>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="mb-10 flex items-center rounded-3xl bg-hijau px-6 py-6 shadow-xl shadow-green-100 relative overflow-hidden">
                    <div id="footer-text" className="text-xs text-white relative z-10">
                        <p className="leading-relaxed">Please organize your menus through button below!</p>
                        <button id="add-menu-button" className="mt-4 flex items-center justify-center space-x-2 rounded-xl bg-white px-4 py-2 w-full shadow-sm active:scale-95 transition-transform">
                            <FaPlus className="text-hijau text-xs" />
                            <span className="font-bold text-gray-800">Add Menus</span>
                        </button>
                    </div>
                    {/* Mengatur posisi avatar agar lebih rapi */}
                    <img id="footer-avatar" className="w-16 h-16 rounded-2xl object-cover border-2 border-white ml-2" src="img/Aidil.jpg" alt="avatar" />
                </div>
                <div className="px-2">
                    <span id="footer-brand" className="font-bold text-gray-800 block">Sedap Restaurant</span>
                    <p id="footer-copyright" className="text-xs text-gray-400 mt-1">&copy; 2026 All Rights Reserved</p>
                </div>
            </div>
        </div>
    );
}