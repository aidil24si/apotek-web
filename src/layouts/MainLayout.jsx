// src/layouts/MainLayout.jsx
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar tetap di kiri */}
            <Sidebar />
            
            <div className="flex-1">
                {/* Header tetap di atas */}
                <Header />
                
                {/* Konten halaman berubah di sini */}
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}