import { Construction, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export default function ErrorPage({ errorCode = "404", errorTitle, errorImg }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6 animate-in fade-in zoom-in-95 duration-500 font-sans">
      
      {/* Coming Soon Card */}
      <Card className="max-w-2xl w-full p-8 md:p-12 rounded-[24px] border border-gray-100 shadow-lg bg-white">
        
        {/* Icon Construction */}
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-orange-50 rounded-full">
            <Construction className="w-16 h-16 text-orange-500" />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-7xl md:text-8xl font-black text-gray-900 leading-none tracking-tighter mb-4">
          {errorCode}
        </h1>

        {/* Badge Coming Soon */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full mb-6">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">
            Coming Soon
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-3 mb-8">
          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            {errorTitle || "Halaman Sedang Dalam Pengembangan"}
          </h3>
          <p className="text-gray-500 text-sm md:text-base font-medium max-w-md mx-auto leading-relaxed">
            Kami sedang bekerja keras untuk menghadirkan fitur ini. Nantikan kehadirannya dalam waktu dekat!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-bold text-gray-600 mb-2">
            <span>Progress Pengembangan</span>
            <span>65%</span>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-orange-400 to-yellow-400 h-full rounded-full transition-all duration-1000"
              style={{ width: "65%" }}
            ></div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-2xl mb-2">🚀</div>
            <p className="text-xs font-bold text-gray-700">Performa Optimal</p>
            <p className="text-[10px] text-gray-500 mt-1">Loading super cepat</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-2xl mb-2">🎨</div>
            <p className="text-xs font-bold text-gray-700">UI Modern</p>
            <p className="text-[10px] text-gray-500 mt-1">Desain yang elegan</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-xs font-bold text-gray-700">Keamanan Terjamin</p>
            <p className="text-[10px] text-gray-500 mt-1">Data terenkripsi</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => window.history.back()}
            className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-6 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95 flex items-center gap-2 h-auto text-sm"
          >
            <ArrowLeft className="text-lg" />
            <span>Kembali</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => window.location.href = "/"}
            className="border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-6 rounded-xl font-bold transition-all active:scale-95 h-auto text-sm"
          >
            Ke Beranda
          </Button>
        </div>

        {/* Contact Support */}
        <p className="mt-8 text-xs text-gray-400 font-medium">
          Ingin tahu lebih detail?{" "}
          <a href="#" className="text-[#2563EB] font-bold hover:underline transition-colors">
            Hubungi Tim Kami
          </a>
        </p>
      </Card>
    </div>
  );
}