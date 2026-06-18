import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2, UserCheck, Users, UserPlus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";

// Data Dummy Member Apotek
const INITIAL_MEMBERS = [
  { id: "MBR-001", name: "Budi Santoso", phone: "081234567890", email: "budi@gmail.com", points: 120, status: "Aktif", joinDate: "12 Jan 2026" },
  { id: "MBR-002", name: "Siti Rahma", phone: "089876543210", email: "siti.rahma@yahoo.com", points: 450, status: "Aktif", joinDate: "05 Feb 2026" },
  { id: "MBR-003", name: "Andi Wijaya", phone: "085211223344", email: "andi.wj@gmail.com", points: 35, status: "Tidak Aktif", joinDate: "20 Mar 2026" },
  { id: "MBR-004", name: "Dewi Lestari", phone: "081399887766", email: "dewi.les@gmail.com", points: 210, status: "Aktif", joinDate: "02 Mei 2026" },
];

export default function Members() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [search, setSearch] = useState("");

  // Filter data berdasarkan pencarian nama atau ID
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* HEADER HALAMAN */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kelola Member</h1>
          <p className="text-sm font-medium text-gray-500">
            Manajemen data pelanggan setia dan program poin hadiah Apotek.
          </p>
        </div>
        <Button className="flex items-center gap-2 rounded-xl bg-blue-600 font-semibold hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Tambah Member
        </Button>
      </div>

      {/* KARTU STATISTIK (RINGKASAN) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl border border-gray-100 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Member</CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{members.length} Orang</div>
            <p className="text-xs font-medium text-gray-400 mt-1">Terdaftar di sistem</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-gray-100 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider font-sans">Member Aktif</CardTitle>
            <UserCheck className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {members.filter(m => m.status === "Aktif").length} Orang
            </div>
            <p className="text-xs font-medium text-emerald-600 mt-1">Sering bertransaksi</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-gray-100 shadow-xs sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Poin Beredar</CardTitle>
            <UserPlus className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {members.reduce((acc, curr) => acc + curr.points, 0)} Pts
            </div>
            <p className="text-xs font-medium text-gray-400 mt-1">Siap ditukarkan reward</p>
          </CardContent>
        </Card>
      </div>

      {/* FILTER & TABEL UTAMA */}
      <Card className="rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
        <CardHeader className="p-4 border-b border-gray-50 bg-white">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Cari nama atau ID member..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-xl border-gray-200 focus:ring-blue-500"
            />
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50/70">
              <TableRow>
                <TableHead className="font-bold text-gray-700 w-[120px]">ID Member</TableHead>
                <TableHead className="font-bold text-gray-700">Nama Lengkap</TableHead>
                <TableHead className="font-bold text-gray-700">Kontak</TableHead>
                <TableHead className="font-bold text-gray-700">Tanggal Gabung</TableHead>
                <TableHead className="font-bold text-gray-700 text-right">Poin</TableHead>
                <TableHead className="font-bold text-gray-700 text-center">Status</TableHead>
                <TableHead className="font-bold text-gray-700 text-center w-[100px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <TableRow key={member.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-semibold text-blue-600">{member.id}</TableCell>
                    <TableCell className="font-medium text-gray-900">{member.name}</TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-900">{member.phone}</div>
                      <div className="text-xs text-gray-400">{member.email}</div>
                    </TableCell>
                    <TableCell className="text-gray-500">{member.joinDate}</TableCell>
                    <TableCell className="text-right font-bold text-amber-600">{member.points} Pts</TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        className={`rounded-lg px-2 py-1 font-semibold ${
                          member.status === "Aktif" 
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50" 
                            : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600 rounded-lg">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600 rounded-lg">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center font-medium text-gray-400">
                    Tidak ada data member yang cocok.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}