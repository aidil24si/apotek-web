import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      {/* Menggunakan variabel warna latar yang konsisten dengan tema */}
      <div className="flex min-h-screen w-full bg-latar">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          
          {/* Konten utama dengan padding agar tidak menempel ke pinggir */}
          <main className="p-8">
             <Outlet/> {/* Render halaman sesuai route di sini */}
          </main>
        </div>
      </div>
    </div>
  );
}