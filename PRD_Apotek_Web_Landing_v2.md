# Product Requirements Document (PRD)

Aplikasi Manajemen Apotek "Apotek Sehat" — **Landing Page Public**

---

## 1. Executive Summary

**Apotek Sehat** adalah sistem informasi manajemen apotek terpadu yang mengintegrasikan layanan kesehatan digital dengan manajemen inventaris obat. Frontend dibangun menggunakan **React + Vite**, styling **Tailwind CSS**, dan design system **Shadcn UI**.

**Dokumen PRD ini** menjelaskan secara terstruktur semua komponen/section yang tampil saat user berada di **Landing Page** (route **`/`**).

---

## 2. Product Overview

### 2.1 Deskripsi Produk (Ringkas)

Aplikasi memiliki dua area besar:

1. **Landing Page (publik)** — memperkenalkan layanan, katalog produk, promo, konsultasi, dan chatbot.
2. **Portal Admin & Member (terautentikasi)** — diakses melalui routing dengan role-based protection.

### 2.2 Value Proposition (Landing Page)

- Memberi gambaran cepat tentang layanan apotek digital.
- Menyajikan kategori dan katalog produk.
- Memberi promo flash sale.
- Memfasilitasi konsultasi apoteker (UI CTA).
- Menyediakan engagement dengan **chatbot widget**.

---

## 3. Objectives & Goals

### 3.1 Objectives

- Meningkatkan awareness layanan apotek digital.
- Mendorong visitor mencoba **Demo Admin** atau **Demo Member**.
- Membantu visitor menemukan informasi produk & layanan konsultasi.
- Menjawab pertanyaan umum via chatbot.

### 3.2 Goals (Landing)

- UI modern, konsisten, dan responsif.
- Navigasi antar section menggunakan **smooth scroll** anchor.
- Interaksi tambahan melalui chatbot.

---

## 4. Target Users

### 4.1 Persona

1. **Pengunjung baru (public visitor)**
   - Butuh pemahaman cepat layanan dan produk.
2. **Calon admin/member**
   - Ingin mencoba melalui tombol demo.
3. **User yang butuh jawaban cepat**
   - Menggunakan chatbot untuk ketersediaan obat, dokter, alamat/jam operasional.

---

## 5. Features & Functionalities (Landing Page Public)

### 5.1 Routing & Layout (Konfigurasi yang Memunculkan Landing)

- Route publik: **`/` → `src/pages/LandingPage.jsx`**
- Header landing: `src/components/LandingHeader.jsx`
- Widget chatbot: `src/components/Chatbot.jsx`

---

### 5.2 Landing Header (Sticky)

**File:** `src/components/LandingHeader.jsx`

**Saat user berada di landing**, komponen ini muncul sebagai navbar sticky berisi:

- Brand: **"Apotek Aidil"**
- Subtitle: **"Modern Health Dashboard"**
- Navigasi internal (smooth scroll) ke anchor:
  - `home`, `produk`, `promo`, `konsultasi`, `kontak`
- Tombol:
  - **Portal Admin** → `/login`
  - Icon cart → scroll ke `produk`

---

### 5.3 Hero Section (`#home`)

**File:** `src/pages/LandingPage.jsx`

**Konten utama:**

- Badge: **"Sistem Apotek Digital"**
- Judul besar: **"Layanan Kesehatan Dalam Satu Platform"**
- Deskripsi nilai produk
- Search box UI:
  - Input placeholder: "Cari nama obat atau SKU..."
  - Tombol **Cari** → scroll ke section **`produk`**
- Tombol CTA demo:
  - **Demo Admin** → `/demo`
  - **Demo Member** → `/member`
- Visual ilustrasi (hanya tampak di desktop)

---

### 5.4 Kategori Utama

**Posisi:** setelah hero

**Isi:** grid 5 kartu kategori:

- Obat Resep
- Obat Non-Resep
- Vitamin
- Alat Kesehatan
- Ibu & Anak

Setiap kartu menggunakan Card styling + hover effect.

---

### 5.5 Katalog Produk (`#produk`)

**File:** `src/pages/LandingPage.jsx`

**Bagian ini berisi:**

1. Header katalog
   - Judul: "Katalog Produk"
   - Subjudul: "Daftar inventaris obat dan suplemen yang tersedia"
2. Filter dropdown (Shadcn `Select`)
   - Default: `all`
   - Opsi: "Semua Produk", "Terbaru", "Stok Terbanyak"
   - Catatan: filter bersifat UI (produk yang ditampilkan statis)
3. Grid produk (4 kartu statis)
   - Gambar produk
   - Nama produk
   - Rating (AiFillStar + angka)
   - Sisa stok
   - Harga
   - Tombol cart (ikon FiShoppingCart)

---

### 5.6 Promo Flash Sale (`#promo`)

**File:** `src/pages/LandingPage.jsx`

**Konten:**

- Banner gradient biru
- Badge: "Flash Sale"
- Heading: "Diskon Inventaris hingga 30%"
- Deskripsi promo
- Countdown statis:
  - 12 Hari
  - 04 Jam
  - 20 Menit
- Tombol **Klaim Promo** → scroll ke section `produk`

---

### 5.7 Konsultasi Health (`#konsultasi`)

**File:** `src/pages/LandingPage.jsx`

**Konten:**

- Badge: "Apoteker Online"
- Judul: "Pusat Layanan Konsultasi"
- Deskripsi layanan
- Checklist benefit (3 poin):
  - Respon cepat (SLA < 5 Menit)
  - Apoteker Tersertifikasi SIPA
  - Terintegrasi dengan resep elektronik
- CTA: **"Buat Tiket Konsultasi"** (outline button)
  - Catatan: CTA saat ini UI (belum ada routing/submit tiket)
- Gambar ilustrasi apoteker

---

### 5.8 Footer Sistem (`#kontak`)

**File:** `src/pages/LandingPage.jsx`

**Struktur footer:** 4 kolom + baris bawah

1. Kolom Brand
   - Klik brand → scroll ke `home`
   - Deskripsi sistem
   - Ikon sosial (Facebook/Instagram/Twitter) sebagai tombol UI
2. Kolom Navigasi Sistem
   - Beranda Utama → scroll `home`
   - Katalog Inventaris → scroll `produk`
   - Info Diskon → scroll `promo`
   - Akses Admin → `/login`
3. Kolom Pusat Bantuan
   - Panduan Pasien, Kebijakan Privasi Data, Syarat & Ketentuan, FAQ
   - Catatan: berupa `button/span` tanpa navigasi
4. Kolom Kontak Apotek
   - Alamat + telepon

**Footer bawah:** copyright + status “Sistem Versi 2.0” dan “Status Server: Normal”.

---

### 5.9 Chatbot Widget

**File:** `src/components/Chatbot.jsx`

**Perilaku saat berada di landing:**

- Button toggle fixed di kanan bawah (muncul jika chatbot tertutup)
- Panel chatbot fixed saat terbuka

**Isi percakapan:**

- Pesan awal bot + opsi:
  - Cek Ketersediaan Obat
  - Info Dokter
  - Alamat & Jam Operasional
  - Lainnya

**Respon chatbot (simulasi):**

- Klik opsi:
  - User message ditambahkan
  - Bot merespons setelah delay (`setTimeout`)
- Khusus "Cek Ketersediaan Obat":
  - Menggunakan `src/data/medicines.json`
  - Menampilkan subset obat

---

## 6. Functional Scope vs Out of Scope (Landing)

### In Scope

- Semua section landing sesuai bagian 5.
- Smooth scroll anchor.
- Chatbot simulasi berbasis lokal.

### Out of Scope (saat ini)

- Integrasi backend untuk pencarian/filter produk.
- Keranjang belanja sungguhan dari tombol cart.
- CTA konsultasi/promo yang mengarah ke flow fungsional.
- Countdown promo yang dinamis.

---

## 7. Technical Notes

- Styling: Tailwind CSS
- UI components: Shadcn UI
- Routing: React Router DOM
- Data chatbot: lokal `src/data/medicines.json`
- Komponen: `LandingHeader`, `LandingPage`, `Chatbot`

---

## 8. Success Metrics (Rekomendasi)

- CTR tombol **Demo Admin** dan **Demo Member**
- Scroll depth ke `produk`, `promo`, `konsultasi`, `kontak`
- Aktivasi chatbot dan frekuensi pilihan opsi

---

## 9. Risks & Gaps

- Filter produk dan tombol cart saat ini dominan UI (belum connected ke state/backend).
- CTA konsultasi/promo belum terhubung ke proses fungsional.
- Countdown promo masih statis.

---

## 10. Deliverables

- Dokumen PRD terstruktur untuk Landing Page publik:
  - `PRD_Apotek_Web_Landing_v2.md`
- Referensi implementasi:
  - `src/pages/LandingPage.jsx`
  - `src/components/LandingHeader.jsx`
  - `src/components/Chatbot.jsx`

---

**Document Version:** 2.0
**Last Updated:** 2026-06-29
**Status:** Draft (Landing Page Public)
