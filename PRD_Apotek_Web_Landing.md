# Product Requirements Document (PRD) — Apotek Sehat (Apotek Web)

## 1. Ringkasan Produk

**Apotek Sehat** adalah portal/aplikasi web untuk layanan kesehatan yang berfokus pada **pengelolaan kebutuhan obat** dan **konsultasi** melalui satu platform. Frontend dibangun dengan **React + Vite** dan UI memakai **Tailwind CSS** serta komponen **Shadcn UI**.

Aplikasi memiliki dua area besar:

1. **Landing Page (publik)**: halaman pemasaran/edukasi yang memperkenalkan fitur, katalog produk, promo, layanan konsultasi, dan chatbot.
2. **Portal Admin & Member (terautentikasi)**: diakses melalui route protected (role-based) dan layout khusus.

Dokumen ini menekankan **PRD Landing Page saat ini**: konten, elemen UI, alur navigasi, dan komponen yang muncul ketika user berada di route landing.

## 2. Tujuan (Goals)

1. Menyediakan halaman landing yang informatif untuk mendorong user:
   - Melihat kategori & katalog produk.
   - Mengakses demo admin/member.
   - Memahami layanan konsultasi online.
   - Menghubungi pihak apotek lewat footer.
2. Memberikan pengalaman browsing yang cepat dan modern (UI card, grid, dan CTA).
3. Menyediakan **chatbot** untuk bantuan instan mengenai ketersediaan obat, info dokter, dan alamat/jam operasional.

## 3. Ruang Lingkup (Scope)

### In Scope — Landing Page (`/`)

Halaman publik berisi:

- **Sticky header landing** dengan navigasi ke anchor section.
- **Hero section** (badge, headline, deskripsi, search box, tombol demo).
- **Kategori utama** (5 kartu kategori).
- **Katalog produk** (grid kartu produk + filter dropdown).
- **Promo Flash Sale** (countdown statis + CTA “Klaim Promo”).
- **Konsultasi health** (benefit list + CTA “Buat Tiket Konsultasi”).
- **Footer** (brand, navigasi internal, pusat bantuan, kontak apotek).
- **Chatbot widget** (toggle + percakapan).

### Out of Scope

- Integrasi backend checkout/keranjang sungguhan (di landing masih berupa UI dan navigasi).
- Fitur konsultasi berbasis tiket ke server (CTA saat ini hanya UI).
- Aksi “Cari/Filter/Add to cart” belum terhubung ke state/layanan dinamis.

## 4. Pengguna & Persona

- **Pengunjung baru (public)**: ingin memahami layanan dan melihat produk.
- **Calon admin/member**: ingin mencoba dengan tombol demo.
- **User yang membutuhkan bantuan cepat**: menggunakan chatbot.

## 5. User Journey di Landing Page

1. User membuka `/`.
2. User melihat **header** dengan tombol navigasi (Beranda, Katalog Produk, Promo, Konsultasi, Kontak).
3. User melakukan eksplorasi:
   - scroll ke section (home, produk, promo, konsultasi, kontak)
   - atau klik kategori/kartu produk (fungsi masih visual).
4. User dapat membuka chatbot (button di kanan bawah) untuk pertanyaan:
   - “Cek Ketersediaan Obat” (menampilkan beberapa obat dari data lokal)
   - “Info Dokter”
   - “Alamat & Jam Operasional”
   - “Lainnya”
5. User menyelesaikan kunjungan melalui footer (lihat info kontak atau akses `/login`).

## 6. Persyaratan Fungsional Landing Page

### 6.1 Sticky LandingHeader

**Komponen:** `src/components/LandingHeader.jsx`

**Fungsi utama:**

- Menampilkan brand “Apotek Aidil”.
- Navigasi internal berbasis **smooth scroll** ke anchor:
  - `home`, `produk`, `promo`, `konsultasi`, `kontak`.
- Tombol “Portal Admin” mengarah ke `'/login'`.
- Tombol cart hanya melakukan scroll ke `produk`.

### 6.2 Hero Section (`#home`)

**Lokasi:** `src/pages/LandingPage.jsx`

**Elemen utama:**

- Badge: “Sistem Apotek Digital”.
- Judul: “Layanan Kesehatan Dalam Satu Platform”.
- Deskripsi nilai produk.
- Search box UI modern:
  - Input: “Cari nama obat atau SKU...”.
  - Tombol “Cari” → smooth scroll ke section `produk`.
- CTA akses demo:
  - “Demo Admin” → `/demo`
  - “Demo Member” → `/member`

### 6.3 Kategori Utama

**Section:** tanpa id khusus (tepat setelah hero)

**Isi:** grid 5 kartu kategori:

- Obat Resep
- Obat Non-Resep
- Vitamin
- Alat Kesehatan
- Ibu & Anak

Setiap kartu merupakan **Card** dengan ikon dan nama kategori.

### 6.4 Katalog Produk (`#produk`)

**Fungsi utama:** menampilkan daftar produk sebagai grid kartu.

**Elemen utama:**

- Header katalog:
  - Judul: “Katalog Produk”.
  - Subjudul: “Daftar inventaris obat dan suplemen yang tersedia”.
- Filter dropdown berbasis Shadcn UI:
  - Default: `all`
  - Opsi: Semua Produk, Terbaru, Stok Terbanyak.
    > Catatan: implementasi filter saat ini bersifat UI (nilai tidak terlihat memfilter data statis).

**Grid produk:** 4 item statis, masing-masing kartu berisi:

- Foto produk (image eksternal).
- Nama produk.
- Rating dengan badge (AiFillStar).
- Sisa stok.
- Harga.
- Tombol ikon cart (FiShoppingCart).

### 6.5 Promo Flash Sale (`#promo`)

**Elemen utama:**

- Banner gradient biru dengan teks:
  - “Flash Sale”
  - “Diskon Inventaris hingga 30%”
  - Deskripsi promo.
- Countdown statis (Hari/Jam/Menit: 12 / 04 / 20).
- Tombol CTA:
  - “Klaim Promo” → smooth scroll ke `produk`.

### 6.6 Konsultasi Health (`#konsultasi`)

**Elemen utama:**

- Badge: “Apoteker Online”.
- Judul: “Pusat Layanan Konsultasi”.
- Deskripsi layanan.
- Checklist benefit (3 poin) dengan ikon check.
- CTA button outline:
  - “Buat Tiket Konsultasi”
    > Catatan: saat ini hanya UI (tidak ada navigasi/submit tiket terintegrasi).
- Area visual (gambar apoteker support).

### 6.7 Footer (`#kontak`)

**Komponen:** `<footer>` di `LandingPage.jsx`.

**Isi footer (4 kolom):**

1. Brand “Apotek Aidil” + deskripsi sistem.
   - Button/brand click → smooth scroll ke `home`.
   - Ikon sosial (Facebook, Instagram, Twitter) — tombol outline.
2. Navigasi sistem:
   - Beranda Utama → scroll `home`
   - Katalog Inventaris → scroll `produk`
   - Info Diskon → scroll `promo`
   - “Akses Admin” → link ke `/login`
3. Pusat bantuan:
   - Panduan Pasien, Kebijakan Privasi Data, Syarat & Ketentuan, FAQ
     > Saat ini berupa elemen `button/span` tanpa navigasi.
4. Kontak Apotek:
   - Alamat (Jl. Kesehatan No.123, Jakarta Selatan)
   - Telepon (021) 1234-5678

**Footer bawah:** copyright + informasi “Sistem Versi 2.0” dan status server “Normal”.

### 6.8 Chatbot Widget

**Komponen:** `src/components/Chatbot.jsx`

**Fungsi utama:**

- Toggle chatbot:
  - Tombol kecil di kanan bawah saat tertutup.
  - Panel fixed saat terbuka.
- Chat memulai pesan bot:
  - Greeting + daftar opsi (Cek Ketersediaan Obat, Info Dokter, Alamat & Jam Operasional, Lainnya).

**Alur respon: (simulasi, tidak real-time backend)**

- Saat opsi diklik:
  - User message ditambahkan.
  - Bot menjawab setelah delay (setTimeout).
- Untuk “Cek Ketersediaan Obat”:
  - Bot menggunakan `src/data/medicines.json`.
  - Menampilkan 4 obat teratas dengan stok.
- “Info Dokter”:
  - Menampilkan daftar dokter statis.
- “Alamat & Jam Operasional”:
  - Menampilkan alamat/jam operasional statis.
- Input teks manual:
  - Bot memberi respon default “Terima kasih...” setelah delay.

## 7. Persyaratan Non-Fungsional (NFR)

- Tampilan responsif (menggunakan grid dan `md:` / `lg:` breakpoints).
- UI konsisten memakai Shadcn UI components (Card, Badge, Button, Input, Select).
- Smooth scroll untuk anchor internal (landing header + tombol lain).
- Aksesibilitas dasar:
  - Kontras teks dan komponen jelas (class Tailwind).

## 8. Analitik & Metrik (Rekomendasi)

> Belum ada implementasi analitik di kode yang dibaca.

Disarankan metrik:

- CTR tombol demo admin/member.
- Scroll depth untuk section `produk`, `promo`, `konsultasi`, `kontak`.
- Aktivasi chatbot dan pilihan opsi yang paling sering.

## 9. Risiko & Celah Saat Ini

- Filter katalog dan tombol cart di kartu produk terlihat hanya UI, belum terhubung ke data/state.
- CTA konsultasi/promo tidak mengarah ke flow fungsional.
- Count down promo statis.

## 10. Deliverables

1. Landing page `/` sesuai spesifikasi UI & konten di section 6.
2. Chatbot widget berfungsi seperti simulasi dari section 6.8.
3. PRD dokumen implementasi sesuai ruang lingkup di atas.

## 11. Referensi Kode

- LandingPage: `src/pages/LandingPage.jsx`
- LandingHeader: `src/components/LandingHeader.jsx`
- Chatbot: `src/components/Chatbot.jsx`
- Routing: `src/App.jsx`
- Layout: `src/layouts/*`
