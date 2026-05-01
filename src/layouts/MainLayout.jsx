import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <div className="flex min-h-screen w-full bg-[#f3f4f6]">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          
          <Outlet/> {/* Render halaman sesuai route di sini */}
        </div>
      </div>
    </div>
  );
}