import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LandingHeader from "../components/LandingHeader";
import Chatbot from "../components/Chatbot";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaCapsules, FaHeartbeat, FaStethoscope, FaBaby, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { TbPrescription } from "react-icons/tb";
import { AiFillStar } from "react-icons/ai";
import { MdOutlineLocationOn, MdOutlinePhone, MdDashboard } from "react-icons/md";
import { BiMessageRoundedDots } from "react-icons/bi";

// Import jajaran komponen premium Shadcn UI untuk standardisasi e-health portal
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";

export default function LandingPage() {
  // State untuk parameter pencarian, filter kategori, dan pengurutan
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("all");

  // State untuk hitung mundur flash sale
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 4,
    minutes: 20,
    seconds: 0
  });

  // Logika hitung mundur flash sale dinamis
  useEffect(() => {
    let totalSeconds = timeLeft.days * 86400 + timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds;

    const timer = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(timer);
        return;
      }
      totalSeconds -= 1;

      const d = Math.floor(totalSeconds / 86400);
      const h = Math.floor((totalSeconds % 86400) / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Database dummy produk lengkap
  const allProducts = [
    { title: "Vitamin C 1000mg", category: "Vitamin", stock: 124, price: 85000, priceString: "Rp 85.000", rating: "4.9", img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "Omega 3 Fish Oil", category: "Vitamin", stock: 89, price: 150000, priceString: "Rp 150.000", rating: "4.9", img: "https://images.unsplash.com/photo-1550572017-edb7fd483669?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "Susu Formula Bayi", category: "Ibu & Anak", stock: 45, price: 180000, priceString: "Rp 180.000", rating: "4.9", img: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "Paracetamol 500mg", category: "Obat Non-Resep", stock: 530, price: 15000, priceString: "Rp 15.000", rating: "4.8", img: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "Amoxicillin 500mg", category: "Obat Resep", stock: 120, price: 20000, priceString: "Rp 20.000", rating: "4.7", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { title: "Tensimeter Digital", category: "Alat Kesehatan", stock: 15, price: 350000, priceString: "Rp 350.000", rating: "4.9", img: "https://images.unsplash.com/photo-1631549990815-3732057b545d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
  ];

  // Pemfilteran dan pengurutan obat secara reaktif
  const filteredProducts = allProducts
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "new") {
        return b.title.localeCompare(a.title);
      }
      if (sortBy === "stock") {
        return b.stock - a.stock;
      }
      return 0;
    });
  
  // Fungsi penanganan navigasi gulir halus (Smooth scroll anchors)
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(searchInput);
      scrollToSection("produk");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/60 font-sans text-gray-800 antialiased">
      
      {/* Header Landing Page */}
      <LandingHeader />

      {/* HERO SECTION */}
      <section id="home" className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
        <Card className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-12 overflow-hidden">
          <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge 
                variant="secondary" 
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold border border-blue-100/50 shadow-none hover:bg-blue-50"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                Sistem Apotek Digital
              </Badge>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                Layanan Kesehatan <br /> <span className="text-blue-600">Dalam Satu Platform</span>
              </h1>
              <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed">
                Cari, pesan, dan konsultasikan kebutuhan obat Anda dengan mudah. Terintegrasi langsung dengan sistem manajemen apotek kami.
              </p>
              
              {/* Kotak Pencarian Modern Shadcn */}
              <div className="flex bg-[#F3F4F6] p-1.5 rounded-2xl border border-transparent focus-within:ring-4 ring-blue-100 focus-within:bg-white transition-all max-w-md items-center shadow-inner">
                <div className="pl-3 text-gray-400">
                  <FiSearch size={18} />
                </div>
                <Input 
                  type="text" 
                  placeholder="Cari nama obat atau SKU..." 
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="border-none bg-transparent shadow-none focus-visible:ring-0 text-sm text-gray-700 py-2 h-auto"
                />
                <Button 
                  onClick={() => {
                    setSearchQuery(searchInput);
                    scrollToSection("produk");
                  }} 
                  className="bg-blue-600 text-white px-5 py-5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-600/10"
                >
                  Cari
                </Button>
              </div>

              {/* Demo Access Buttons */}
              <div className="flex gap-3 flex-wrap mt-4">
                <Link to="/demo" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-all">
                  Demo Admin
                </Link>
                <Link to="/member" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-all">
                  Demo Member
                </Link>
              </div>
            </div>
            
            <div className="hidden md:flex justify-end relative group">
              <div className="absolute inset-0 bg-blue-600/5 rounded-2xl filter blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Dashboard Illustration" 
                className="rounded-[2rem] shadow-md border border-gray-100 object-cover h-[350px] w-full relative z-10 hover:scale-[1.01] transition-transform duration-500" 
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* KATEGORI UTAMA */}
      <section className="px-4 md:px-12 py-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: <TbPrescription size={24}/>, name: "Obat Resep" },
            { icon: <FaCapsules size={24}/>, name: "Obat Non-Resep" },
            { icon: <FaHeartbeat size={24}/>, name: "Vitamin" },
            { icon: <FaStethoscope size={24}/>, name: "Alat Kesehatan" },
            { icon: <FaBaby size={24}/>, name: "Ibu & Anak" },
          ].map((cat, idx) => (
            <Card 
              key={idx} 
              onClick={() => {
                const newCat = activeCategory === cat.name ? "all" : cat.name;
                setActiveCategory(newCat);
                scrollToSection("produk");
              }}
              className={`bg-white p-4 rounded-2xl border shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-all group overflow-hidden ${
                activeCategory === cat.name ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-100"
              }`}
            >
              <CardContent className="p-0 flex items-center gap-4 w-full">
                <div className={`p-3 rounded-xl transition-colors duration-300 ${
                  activeCategory === cat.name ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                }`}>
                  {cat.icon}
                </div>
                <p className="font-bold text-gray-700 text-xs md:text-sm tracking-tight">{cat.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* PRODUK SECTION */}
      <section id="produk" className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
        <Card className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-8 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-5 mb-6 gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Katalog Produk</h2>
                <p className="text-gray-400 text-sm font-medium mt-0.5">Daftar inventaris obat dan suplemen yang tersedia</p>
              </div>
              
              {/* Dropdown Filter Berbasis Shadcn UI Select */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[200px] bg-gray-50 border-gray-200 rounded-xl font-semibold text-xs text-gray-700 px-4 py-5 focus:ring-4 focus:ring-blue-50">
                  <SelectValue placeholder="Pilih Filter" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-xl border border-gray-100 shadow-xl">
                  <SelectItem value="all" className="font-semibold text-xs py-2.5">Filter: Semua Produk</SelectItem>
                  <SelectItem value="new" className="font-semibold text-xs py-2.5">Terbaru</SelectItem>
                  <SelectItem value="stock" className="font-semibold text-xs py-2.5">Stok Terbanyak</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter Aktif */}
            {(activeCategory !== "all" || searchQuery !== "") && (
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <span className="text-xs text-gray-400 font-semibold">Filter aktif:</span>
                {activeCategory !== "all" && (
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border border-blue-100/50 hover:bg-blue-50 text-xs py-1 px-2.5 rounded-lg font-bold">
                    Kategori: {activeCategory}
                  </Badge>
                )}
                {searchQuery !== "" && (
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border border-blue-100/50 hover:bg-blue-50 text-xs py-1 px-2.5 rounded-lg font-bold">
                    Pencarian: "{searchQuery}"
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                    setSearchInput("");
                  }} 
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 text-[11px] font-bold py-1 px-2.5 h-auto rounded-lg transition-all"
                >
                  Reset Filter
                </Button>
              </div>
            )}

            {/* Grid Katalog Obat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((item, idx) => (
                <Card key={idx} className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-gray-200/80 transition-all bg-white group">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gray-50 overflow-hidden border-b border-gray-100 relative">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1.5 gap-2">
                        <h3 className="font-bold text-gray-900 text-sm truncate flex-1">{item.title}</h3>
                        <div className="flex items-center gap-1 text-yellow-600 text-[10px] font-bold bg-yellow-50 px-1.5 py-0.5 rounded-lg border border-yellow-100/50">
                          <AiFillStar /> {item.rating}
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs font-medium">Sisa Stok: <span className="font-bold text-gray-700">{item.stock}</span></p>
                      
                      <div className="flex justify-between items-center mt-5">
                        <p className="font-extrabold text-blue-600 text-base">{item.priceString}</p>
                        <Button 
                          size="icon"
                          className="bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-600 p-2 rounded-xl transition-all border border-gray-200/60 hover:border-blue-600 h-9 w-9"
                        >
                          <FiShoppingCart size={15} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400 text-sm font-medium">
                  Tidak ada produk yang cocok dengan kriteria pencarian atau kategori Anda.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* PROMO FLASH SALE SECTION */}
      <section id="promo" className="px-4 md:px-12 py-4 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-[2rem] border border-blue-400/20 shadow-lg shadow-blue-600/10 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between text-white gap-8">
          <div className="max-w-xl space-y-3">
            <Badge className="bg-white/20 text-white hover:bg-white/20 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border-none shadow-none gap-1.5">
              <TbPrescription size={15} /> Flash Sale
            </Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Diskon Inventaris hingga 30%</h2>
            <p className="text-blue-50/90 text-sm leading-relaxed font-medium">
              Dapatkan diskon untuk berbagai macam vitamin dan suplemen terpilih. Validasi keranjang Anda sebelum masa berlaku habis.
            </p>
          </div>
          
          <Card className="bg-white text-gray-900 p-6 rounded-2xl border-none shadow-xl flex flex-col items-center min-w-[270px]">
            <CardContent className="p-0 w-full flex flex-col items-center">
              <p className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-wider">Berakhir Dalam</p>
              <div className="flex gap-3 text-center">
                <div className="bg-gray-50 rounded-xl p-2.5 w-14 border border-gray-100">
                  <p className="text-xl font-extrabold text-blue-600">{String(timeLeft.days).padStart(2, "0")}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">Hari</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-2.5 w-14 border border-gray-100">
                  <p className="text-xl font-extrabold text-blue-600">{String(timeLeft.hours).padStart(2, "0")}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">Jam</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-2.5 w-14 border border-gray-100">
                  <p className="text-xl font-extrabold text-blue-600">{String(timeLeft.minutes).padStart(2, "0")}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">Menit</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-2.5 w-14 border border-gray-100">
                  <p className="text-xl font-extrabold text-blue-600">{String(timeLeft.seconds).padStart(2, "0")}</p>
                  <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">Detik</p>
                </div>
              </div>
              <Button 
                onClick={() => scrollToSection("produk")} 
                className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-600/10"
              >
                Klaim Promo
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* KONSULTASI HEALTH SECTION */}
      <section id="konsultasi" className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
        <Card className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 md:p-10 overflow-hidden">
          <CardContent className="p-0 flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1 space-y-5">
              <Badge className="bg-green-50 text-green-600 hover:bg-green-50 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-200/50 shadow-none gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Apoteker Online
              </Badge>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Pusat Layanan Konsultasi</h2>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                Dapatkan rekomendasi obat yang tepat secara langsung dari apoteker profesional kami tanpa biaya tambahan. Rekam medis akan tersimpan secara otomatis di sistem.
              </p>
              <ul className="space-y-2.5 text-sm text-gray-600 font-semibold">
                <li className="flex items-center gap-2.5"><BsCheckCircleFill className="text-blue-600 text-base" /> Respon cepat (SLA &lt; 5 Menit)</li>
                <li className="flex items-center gap-2.5"><BsCheckCircleFill className="text-blue-600 text-base" /> Apoteker Tersertifikasi SIPA</li>
                <li className="flex items-center gap-2.5"><BsCheckCircleFill className="text-blue-600 text-base" /> Terintegrasi dengan resep elektronik</li>
              </ul>
              <Button 
                variant="outline"
                className="border-gray-200 hover:border-blue-600 hover:bg-blue-50 text-blue-600 px-6 py-5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-sm mt-2"
              >
                <BiMessageRoundedDots size={18} /> Buat Tiket Konsultasi
              </Button>
            </div>
            <div className="flex-1 w-full relative bg-gray-50 rounded-[2rem] h-[300px] overflow-hidden border border-gray-100 shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Apoteker Support" 
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FOOTER SYSTEM */}
      <footer id="kontak" className="bg-white border-t border-gray-100 px-4 md:px-12 pt-12 pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("home")}>
              <div className="bg-blue-600 p-1.5 rounded-lg text-white font-bold w-8 h-8 flex items-center justify-center text-sm shadow-md shadow-blue-600/10">
                <MdDashboard size={16} />
              </div>
              <span className="text-lg font-extrabold text-gray-900 tracking-tight">Apotek Aidil</span>
            </div>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              Sistem informasi manajemen apotek terpadu yang mempermudah pasien dalam mengakses layanan kesehatan digital.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="bg-gray-50 border-gray-100 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 w-9 h-9"><FaFacebookF size={14}/></Button>
              <Button variant="outline" size="icon" className="bg-gray-50 border-gray-100 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 w-9 h-9"><FaInstagram size={14}/></Button>
              <Button variant="outline" size="icon" className="bg-gray-50 border-gray-100 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 w-9 h-9"><FaTwitter size={14}/></Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-xs uppercase tracking-wider">Navigasi Sistem</h4>
            <ul className="space-y-2.5 text-sm font-semibold text-gray-400">
              <li><button onClick={() => scrollToSection("home")} className="hover:text-blue-600 transition-colors">Beranda Utama</button></li>
              <li><button onClick={() => scrollToSection("produk")} className="hover:text-blue-600 transition-colors">Katalog Inventaris</button></li>
              <li><button onClick={() => scrollToSection("promo")} className="hover:text-blue-600 transition-colors">Info Diskon</button></li>
              <li><Link to="/login" className="hover:text-blue-700 transition-colors text-blue-600 font-bold">Akses Admin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-xs uppercase tracking-wider">Pusat Bantuan</h4>
            <ul className="space-y-2.5 text-sm font-semibold text-gray-400">
              <li><span className="cursor-pointer hover:text-blue-600 transition-colors">Panduan Pasien</span></li>
              <li><span className="cursor-pointer hover:text-blue-600 transition-colors">Kebijakan Privasi Data</span></li>
              <li><span className="cursor-pointer hover:text-blue-600 transition-colors">Syarat & Ketentuan Layanan</span></li>
              <li><span className="cursor-pointer hover:text-blue-600 transition-colors">FAQ</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 mb-4 text-xs uppercase tracking-wider">Kontak Apotek</h4>
            <div className="flex items-start gap-3 bg-gray-50/80 p-3 rounded-2xl border border-gray-100">
              <MdOutlineLocationOn size={20} className="text-blue-600 shrink-0 mt-0.5" />
              <span className="text-xs font-semibold text-gray-500 leading-normal">Gedung ApotekAidil Center, Jl. Kesehatan No. 123, Jakarta Selatan 12345</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-50/80 p-3 rounded-2xl border border-gray-100">
              <MdOutlinePhone size={18} className="text-blue-600 shrink-0" />
              <span className="text-xs font-bold text-gray-700">(021) 1234-5678</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
          <p>© 2026 Apotek Aidil System. Seluruh hak cipta dilindungi.</p>
          <div className="flex gap-4 font-bold">
            <span className="text-gray-300">Sistem Versi 2.0</span>
            <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-md border border-green-100">Status Server: Normal</span>
          </div>
        </div>
      </footer>

      {/* Chatbot Widget */}
      <Chatbot />

    </div>
  );
}
