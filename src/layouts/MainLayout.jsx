import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "../components/ui/scroll-area";

export default function MainLayout() {
  return (
    <div className="flex h-[100dvh] w-full bg-[#F9FAFB] overflow-hidden font-sans antialiased text-slate-900">
      
      {/* Sidebar Desktop */}
      <div className="hidden md:flex shrink-0 border-r border-gray-100 bg-white">
        <Sidebar />
      </div>

      {/* Area Kanan */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        <Header />
        
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div className="p-4 md:p-8">
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
                <Outlet />
              </div>
            </div>
          </ScrollArea>
        </main>
      </div>

    </div>
  );
}