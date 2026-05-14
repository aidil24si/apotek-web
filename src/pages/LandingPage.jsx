import React from "react";
import { Link } from "react-router-dom";
import LandingHeader from "../components/LandingHeader"; // Sesuaikan path ini dengan lokasi file Anda!
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaCapsules, FaHeartbeat, FaStethoscope, FaBaby, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { TbPrescription } from "react-icons/tb";
import { AiFillStar } from "react-icons/ai";
import { MdOutlineLocationOn, MdOutlinePhone, MdDashboard } from "react-icons/md";
import { BiMessageRoundedDots } from "react-icons/bi";

export default function LandingPage() {
  
  // Fungsi scroll tetap ada di sini untuk digunakan oleh tombol di dalam halaman (seperti tombol cari, footer, dll)
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* PANGGIL KOMPONEN HEADER DI SINI */}
      <LandingHeader />

      {/* HERO SECTION */}
      <section id="home" className="px-6 md:px-12 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Sistem Apotek Digital
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Layanan Kesehatan <br /> <span className="text-blue-600">Dalam Satu Platform</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Cari, pesan, dan konsultasikan kebutuhan obat Anda dengan mudah. Terintegrasi langsung dengan sistem manajemen apotek kami.
            </p>
            <div className="flex bg-gray-50 p-1.5 rounded-lg border border-gray-200 focus-within:ring-2 ring-blue-600/20 focus-within:border-blue-600 transition-all max-w-md">
              <div className="flex items-center pl-3 text-gray-400">
                <FiSearch size={18} />
              </div>
              <input type="text" placeholder="Cari nama obat atau SKU..." className="w-full px-3 py-2 outline-none text-sm text-gray-700 bg-transparent" />
              <button onClick={() => scrollToSection("produk")} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">Cari</button>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
            <img src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Dashboard Illustration" className="rounded-xl shadow-md border border-gray-200 object-cover h-[350px] w-full" />
          </div>
        </div>
      </section>

      {/* KATEGORI */}
      <section className="px-6 md:px-12 py-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: <TbPrescription size={24}/>, name: "Obat Resep" },
            { icon: <FaCapsules size={24}/>, name: "Obat Non-Resep" },
            { icon: <FaHeartbeat size={24}/>, name: "Vitamin" },
            { icon: <FaStethoscope size={24}/>, name: "Alat Kesehatan" },
            { icon: <FaBaby size={24}/>, name: "Ibu & Anak" },
          ].map((cat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {cat.icon}
              </div>
              <p className="font-semibold text-gray-700 text-sm">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUK SECTION */}
      <section id="produk" className="px-6 md:px-12 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-100 pb-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Katalog Produk</h2>
              <p className="text-gray-500 text-sm mt-1">Daftar inventaris obat dan suplemen yang tersedia</p>
            </div>
            <select className="mt-4 md:mt-0 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50 outline-none focus:border-blue-600">
              <option>Filter: Semua Produk</option>
              <option>Terbaru</option>
              <option>Stok Terbanyak</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Vitamin C 1000mg", stock: "124", price: "Rp 85.000", rating: "4.9", img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
              { title: "Omega 3 Fish Oil", stock: "89", price: "Rp 150.000", rating: "4.9", img: "https://images.unsplash.com/photo-1550572017-edb7fd483669?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
              { title: "Susu Formula Bayi", stock: "45", price: "Rp 180.000", rating: "4.9", img: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
              { title: "Paracetamol 500mg", stock: "530", price: "Rp 15.000", rating: "4.8", img: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            ].map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white">
                <div className="h-40 bg-gray-100 overflow-hidden border-b border-gray-200">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-sm truncate pr-2">{item.title}</h3>
                    <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold bg-yellow-50 px-1.5 py-0.5 rounded">
                      <AiFillStar /> {item.rating}
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs mb-3">Sisa Stok: <span className="font-semibold text-gray-700">{item.stock}</span></p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="font-bold text-blue-600 text-sm">{item.price}</p>
                    <button className="bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-700 p-2 rounded-lg transition-colors border border-gray-200 hover:border-blue-600">
                      <FiShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMO SECTION */}
      <section id="promo" className="px-6 md:px-12 py-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl border border-blue-400 shadow-md p-6 md:p-8 flex flex-col md:flex-row items-center justify-between text-white">
          <div className="max-w-xl mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-3 bg-white/20 w-max px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
              <TbPrescription size={16} /> Flash Sale
            </div>
            <h2 className="text-2xl font-bold mb-2">Diskon Inventaris hingga 30%</h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Dapatkan diskon untuk berbagai macam vitamin dan suplemen terpilih. Validasi keranjang Anda sebelum masa berlaku habis.
            </p>
          </div>
          <div className="bg-white text-gray-900 p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center min-w-[250px]">
            <p className="text-xs text-gray-500 font-semibold mb-3 uppercase tracking-wide">Berakhir Dalam</p>
            <div className="flex gap-3 text-center">
              <div className="bg-gray-100 rounded-lg p-2 w-14 border border-gray-200">
                <p className="text-lg font-bold text-blue-600">12</p>
                <p className="text-[9px] text-gray-500 uppercase">Hari</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-2 w-14 border border-gray-200">
                <p className="text-lg font-bold text-blue-600">04</p>
                <p className="text-[9px] text-gray-500 uppercase">Jam</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-2 w-14 border border-gray-200">
                <p className="text-lg font-bold text-blue-600">20</p>
                <p className="text-[9px] text-gray-500 uppercase">Menit</p>
              </div>
            </div>
            <button onClick={() => scrollToSection("produk")} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition">
              Klaim Promo
            </button>
          </div>
        </div>
      </section>

      {/* KONSULTASI SECTION */}
      <section id="konsultasi" className="px-6 md:px-12 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 md:p-10 flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 space-y-5">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1 rounded-md text-xs font-semibold border border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Apoteker Online
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Pusat Layanan Konsultasi</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Dapatkan rekomendasi obat yang tepat secara langsung dari apoteker profesional kami tanpa biaya tambahan. Rekam medis akan tersimpan secara otomatis di sistem.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2"><BsCheckCircleFill className="text-blue-600" /> Respon cepat (SLA &lt; 5 Menit)</li>
              <li className="flex items-center gap-2"><BsCheckCircleFill className="text-blue-600" /> Apoteker Tersertifikasi SIPA</li>
              <li className="flex items-center gap-2"><BsCheckCircleFill className="text-blue-600" /> Terintegrasi dengan resep elektronik</li>
            </ul>
            <button className="bg-white border border-gray-300 hover:border-blue-600 hover:bg-blue-50 text-blue-600 px-6 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow-sm mt-2">
              <BiMessageRoundedDots size={18} /> Buat Tiket Konsultasi
            </button>
          </div>
          <div className="flex-1 w-full relative bg-gray-100 rounded-xl h-[300px] overflow-hidden border border-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Apoteker Support" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* FOOTER / KONTAK SECTION */}
      <footer id="kontak" className="bg-white border-t border-gray-200 px-6 md:px-12 pt-12 pb-8 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("home")}>
              <div className="bg-blue-600 p-1.5 rounded text-white font-bold w-7 h-7 flex items-center justify-center text-sm shadow-sm">
                <MdDashboard />
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">Apotek Aidil</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Sistem informasi manajemen apotek terpadu yang mempermudah pasien dalam mengakses layanan kesehatan digital.
            </p>
            <div className="flex gap-2">
              <button className="bg-gray-50 border border-gray-200 p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-600 transition"><FaFacebookF size={14}/></button>
              <button className="bg-gray-50 border border-gray-200 p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-600 transition"><FaInstagram size={14}/></button>
              <button className="bg-gray-50 border border-gray-200 p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-600 transition"><FaTwitter size={14}/></button>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Navigasi Sistem</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><button onClick={() => scrollToSection("home")} className="hover:text-blue-600 transition">Beranda Utama</button></li>
              <li><button onClick={() => scrollToSection("produk")} className="hover:text-blue-600 transition">Katalog Inventaris</button></li>
              <li><button onClick={() => scrollToSection("promo")} className="hover:text-blue-600 transition">Info Diskon</button></li>
              <li><Link to="/login" className="hover:text-blue-600 transition font-medium text-blue-600">Akses Admin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Pusat Bantuan</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><span className="cursor-pointer hover:text-blue-600 transition">Panduan Pasien</span></li>
              <li><span className="cursor-pointer hover:text-blue-600 transition">Kebijakan Privasi Data</span></li>
              <li><span className="cursor-pointer hover:text-blue-600 transition">Syarat & Ketentuan Layanan</span></li>
              <li><span className="cursor-pointer hover:text-blue-600 transition">FAQ</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Kontak Apotek</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <MdOutlineLocationOn size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <span className="leading-tight">Gedung ApotekAidil Center, Jl. Kesehatan No. 123, Jakarta Selatan 12345</span>
              </li>
              <li className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <MdOutlinePhone size={18} className="text-blue-600 shrink-0" />
                <span className="font-semibold text-gray-700">(021) 1234-5678</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 Apotek Aidil System. Seluruh hak cipta dilindungi.</p>
          <div className="flex gap-4 font-medium">
            <span className="cursor-pointer hover:text-blue-600">Sistem Versi 2.0</span>
            <span className="cursor-pointer hover:text-blue-600">Status Server: Normal</span>
          </div>
        </div>
      </footer>

    </div>
  );
}