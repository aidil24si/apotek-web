import { useState, useEffect } from "react"; // Tambah useEffect untuk daur hidup data
import { useNavigate } from "react-router-dom"; 
import { supabase } from "../supabaseClient"; // Hubungkan jembatan Supabase kamu
import PageHeader from "../components/PageHeader";
import { FaSearch, FaUserPlus, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineLocationOn, MdCardMembership } from "react-icons/md";

// Import komponen Shadcn UI yang presisi sesuai arsitektur proyekmu
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";

// Data dummy cadangan tetap dipertahankan jika Supabase belum terisi data sama sekali
const DUMMY_MEMBERS_FALLBACK = [
  { id_customer: "CUST-001", nama_lengkap: "Andi Wahyuni", jenis_kelamin: "Laki-laki", tanggal_lahir: "1990-05-15", nomor_hp: "083342331444", alamat: "Jl. HR. Soebrantas No. 8", kelurahan: "Sidomulyo Barat", tanggal_daftar: "2024-01-15" },
  { id_customer: "CUST-002", nama_lengkap: "Andi Setiawan", jenis_kelamin: "Laki-laki", tanggal_lahir: "1992-03-20", nomor_hp: "086756332150", alamat: "Jl. Delima No. 196", kelurahan: "Delima", tanggal_daftar: "2024-02-20" },
  { id_customer: "CUST-003", nama_lengkap: "Oka Putra", jenis_kelamin: "Laki-laki", tanggal_lahir: "1988-07-10", nomor_hp: "087665963761", alamat: "Jl. Rajawali No. 50", kelurahan: "Sialang Munggu", tanggal_daftar: "2024-03-10" },
  { id_customer: "CUST-004", nama_lengkap: "Lestari Sari", jenis_kelamin: "Perempuan", tanggal_lahir: "1995-11-25", nomor_hp: "088173347748", alamat: "Jl. Rajawali No. 163", kelurahan: "Tuah Karya", tanggal_daftar: "2024-04-05" },
  { id_customer: "CUST-005", nama_lengkap: "Budi Pratama", jenis_kelamin: "Laki-laki", tanggal_lahir: "1983-09-30", nomor_hp: "082149938334", alamat: "Jl. Rajawali No. 184", kelurahan: "Tobek Godang", tanggal_daftar: "2024-05-12" }
];

export default function Customers() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Indikator loading database
    const [customersList, setCustomersList] = useState([]);

    // State penampung input form member baru
    const [formData, setFormData] = useState({
        nama_lengkap: "",
        jenis_kelamin: "Laki-laki",
        tanggal_lahir: "",
        nomor_hp: "",
        alamat: "",
        kelurahan: "Delima"
    });

    // Ambil data dari Supabase saat komponen dirender pertama kali
    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setIsLoading(true);
        try {
            // Ambil data dari tabel 'customers' di Supabase
            const { data, error } = await supabase
                .from("customers")
                .select("*")
                .order("created_at", { ascending: false }); // Urutkan data terbaru di paling atas

            if (error) throw error;

            // Jika database kosong, pakai data dummy sebagai fallback awal
            if (data && data.length > 0) {
                setCustomersList(data);
            } else {
                setCustomersList(DUMMY_MEMBERS_FALLBACK);
            }
        } catch (error) {
            console.error("Gagal memuat data dari Supabase:", error.message);
            // Tetap tampilkan data fallback lokal jika koneksi internet terganggu/error
            setCustomersList(DUMMY_MEMBERS_FALLBACK);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Generate ID customer otomatis
    const generateCustomerId = () => {
        const timestamp = Date.now().toString().slice(-4);
        return `CUST-${timestamp}`;
    };

    // Fungsi eksekusi simpan member baru ke Supabase
    const handleAddMember = async (e) => {
        e.preventDefault();

        if (!formData.nama_lengkap || !formData.nomor_hp || !formData.alamat) {
            alert("Harap isi semua kolom data member!");
            return;
        }

        // Generate ID Otomatis
        const newId = generateCustomerId();

        const newMember = {
            id_customer: newId,
            nama_lengkap: formData.nama_lengkap,
            jenis_kelamin: formData.jenis_kelamin,
            tanggal_lahir: formData.tanggal_lahir || null,
            nomor_hp: formData.nomor_hp,
            alamat: formData.alamat,
            kelurahan: formData.kelurahan,
            tanggal_daftar: new Date().toISOString().split('T')[0]
        };

        try {
            const { error } = await supabase
                .from("customers")
                .insert([newMember]);

            if (error) throw error;

            // Jika sukses, tarik ulang data terbaru dari Supabase
            await fetchCustomers();
            setFormData({ 
                nama_lengkap: "", 
                jenis_kelamin: "Laki-laki",
                tanggal_lahir: "",
                nomor_hp: "", 
                alamat: "", 
                kelurahan: "Delima" 
            });
            setIsModalOpen(false);
        } catch (error) {
            alert("Gagal menambahkan member ke database: " + error.message);
        }
    };

    const filteredPatients = customersList.filter(p => 
        p.nama_lengkap?.toLowerCase().includes(search.toLowerCase()) || 
        p.id_customer?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-[#F9FAFB] min-h-screen font-sans">
            
            <PageHeader title="Kelola Member & Pasien" breadcrumb={["Apotek", "Daftar Member"]}>
                <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-[#2563EB] text-white px-6 py-6 rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all hover:bg-blue-700 border-none"
                >
                    <FaUserPlus className="text-lg" />
                    <span>Tambah Member Baru</span>
                </Button>
            </PageHeader>

            <Card className="rounded-[2rem] p-4 md:p-8 shadow-sm border border-gray-100 mt-6 bg-white overflow-hidden">
                <CardContent className="p-0">
                    
                    <div className="relative mb-8 max-w-md flex items-center">
                        <Input 
                            type="text" 
                            placeholder="Cari Nama Member atau ID (Contoh: AP-1000)..." 
                            className="w-full pl-12 pr-4 py-6 bg-[#F3F4F6] rounded-2xl border-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:bg-white text-sm text-[#111827] transition-all"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FaSearch className="absolute left-4 text-gray-400 pointer-events-none" />
                    </div>

                    {isLoading ? (
                        <div className="py-20 text-center text-sm font-semibold text-gray-400 animate-pulse">
                            Menghubungkan & Memuat Data Supabase Cloud...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b border-gray-100 hover:bg-transparent">
                    <TableHead className="px-4 pb-5 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">ID Customer</TableHead>
                    <TableHead className="px-4 pb-5 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">Nama Lengkap</TableHead>
                    <TableHead className="px-4 pb-5 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">Alamat & Kelurahan</TableHead>
                    <TableHead className="px-4 pb-5 font-semibold text-gray-500 text-[12px] uppercase tracking-wider">No. Telepon</TableHead>
                    <TableHead className="px-4 pb-5 font-semibold text-center text-gray-500 text-[12px] uppercase tracking-wider">Jenis Kelamin</TableHead>
                    <TableHead className="px-4 pb-5 font-semibold text-center text-gray-500 text-[12px] uppercase tracking-wider">Tanggal Daftar</TableHead>
                    <TableHead className="px-4 pb-5 font-semibold text-center text-gray-500 text-[12px] uppercase tracking-wider">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPatients.map((patient) => (
                                        <TableRow key={patient.id_customer} className="group hover:bg-gray-50/50 transition-all duration-300 border-b border-gray-50">
                                            <TableCell className="px-4 py-5 font-bold text-[#2563EB] text-sm whitespace-nowrap">
                                                {patient.id_customer}
                                            </TableCell>
                                            <TableCell className="px-4 py-5">
                                                <p className="font-bold text-[#111827] text-sm group-hover:text-[#2563EB] transition-colors">
                                                    {patient.nama_lengkap}
                                                </p>
                                            </TableCell>
                                            <TableCell className="px-4 py-5 text-gray-500 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <MdOutlineLocationOn className="text-gray-400 text-lg shrink-0" />
                                                    <span className="truncate max-w-[220px] font-medium">
                                                        {patient.alamat}, {patient.kelurahan || "Tampan"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-5 text-gray-600 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-2 bg-blue-50 text-[#2563EB] rounded-xl">
                                                        <FaPhoneAlt className="text-[10px]" />
                                                    </div>
                                                    <span className="font-semibold">{patient.nomor_hp}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-4 py-5 text-center font-bold text-gray-700 text-sm">
                                                {patient.jenis_kelamin || "-"}
                                            </TableCell>
                                            <TableCell className="px-4 py-5 text-center text-gray-600 text-sm">
                                                {patient.tanggal_daftar ? new Date(patient.tanggal_daftar).toLocaleDateString('id-ID') : "-"}
                                            </TableCell>
                                            <TableCell className="px-4 py-5 text-center">
                                                <Button 
                                                    variant="outline"
                                                    onClick={() => navigate(`/customers/${patient.id_customer}`)}
                                                    className="bg-white border border-gray-200 text-[#2563EB] font-bold text-[11px] px-4 py-2 h-auto rounded-xl shadow-sm hover:bg-[#2563EB] hover:text-white transition-all"
                                                >
                                                    Detail Profil
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* MODAL POP-UP DIALOG */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-white max-w-md p-6 rounded-[2rem] border-none shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <MdCardMembership className="text-[#2563EB] text-2xl" />
                            <span>Registrasi Member Baru</span>
                        </DialogTitle>
                    </DialogHeader>
                    
                    <form onSubmit={handleAddMember} className="space-y-4 mt-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-wider">Nama Lengkap Pasien</label>
                            <Input 
                                type="text" 
                                name="nama_lengkap"
                                value={formData.nama_lengkap}
                                onChange={handleInputChange}
                                placeholder="Masukkan nama lengkap..." 
                                className="bg-gray-50 focus-visible:ring-[#2563EB] py-5 rounded-xl border-none" 
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-wider">Jenis Kelamin</label>
                            <select 
                                name="jenis_kelamin"
                                value={formData.jenis_kelamin}
                                onChange={handleInputChange}
                                className="w-full bg-gray-50 p-3 rounded-xl border-none text-sm text-gray-700 font-medium focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                            >
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-wider">Tanggal Lahir</label>
                            <Input 
                                type="date" 
                                name="tanggal_lahir"
                                value={formData.tanggal_lahir}
                                onChange={handleInputChange}
                                className="bg-gray-50 focus-visible:ring-[#2563EB] py-5 rounded-xl border-none" 
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-wider">No. Handphone</label>
                            <Input 
                                type="text" 
                                name="nomor_hp"
                                value={formData.nomor_hp}
                                onChange={handleInputChange}
                                placeholder="Contoh: 0821xxxxxxxx" 
                                className="bg-gray-50 focus-visible:ring-[#2563EB] py-5 rounded-xl border-none" 
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-wider">Alamat Jalan</label>
                            <Input 
                                type="text" 
                                name="alamat"
                                value={formData.alamat}
                                onChange={handleInputChange}
                                placeholder="Nama jalan dan nomor rumah..." 
                                className="bg-gray-50 focus-visible:ring-[#2563EB] py-5 rounded-xl border-none" 
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-wider">Kelurahan (Kecamatan Tampan)</label>
                            <select 
                                name="kelurahan"
                                value={formData.kelurahan}
                                onChange={handleInputChange}
                                className="w-full bg-gray-50 p-3 rounded-xl border-none text-sm text-gray-700 font-medium focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                            >
                                <option value="Delima">Delima</option>
                                <option value="Sidomulyo Barat">Sidomulyo Barat</option>
                                <option value="Sialang Munggu">Sialang Munggu</option>
                                <option value="Tuah Karya">Tuah Karya</option>
                                <option value="Tobek Godang">Tobek Godang</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-6">
                            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-xl border-gray-200">
                                Batal
                            </Button>
                            <Button type="submit" className="bg-[#2563EB] hover:bg-blue-700 rounded-xl px-6 border-none text-white font-bold">
                                Daftarkan Pasien
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}