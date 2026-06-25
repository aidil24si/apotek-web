# Flow Autentikasi Apotek Sehat

## Overview
Sistem autentikasi menggunakan Supabase Auth dengan Role-Based Access Control (RBAC).

## Role yang Tersedia
- `admin` - Administrator (akses penuh ke dashboard)
- `customer` - Customer/Pasien (akses landing page)
- `dokter` - Dokter (akses landing page)
- `apoteker` - Apoteker (akses landing page)

---

## Flow Registrasi

### 1. User mengisi form registrasi
- Email
- Password (minimal 6 karakter)
- Konfirmasi Password
- Role (customer/dokter/apoteker)

### 2. Proses Registrasi
```
1. Validasi password match
2. Validasi password length (min 6)
3. Supabase Auth signUp (email + password)
4. Insert ke tabel profiles (id, email, role)
5. Logout user yang baru daftar
6. Redirect ke /login dengan pesan sukses
```

### 3. Setelah Registrasi
- User otomatis logout (tidak auto-login)
- Redirect ke halaman login
- Menampilkan pesan sukses: "Registrasi berhasil! Silakan login dengan akun Anda."

---

## Flow Login

### 1. User mengisi form login
- Email
- Password
- Role (default: admin)

### 2. Proses Login
```
1. Supabase Auth signInWithPassword (email + password)
2. Ambil role dari tabel profiles
3. Redirect berdasarkan role:
   - admin → /dashboard
   - customer/dokter/apoteker → /
```

### 3. Jika user sudah login
- Cek session aktif
- Ambil role dari profiles
- Redirect sesuai role

---

## Proteksi Route (ProtectedRoute)

### Halaman yang Dilindungi
- `/dashboard` - Hanya admin
- `/orders` - Hanya admin
- `/customers` - Hanya admin
- `/inventory` - Hanya admin

### Cara Kerja ProtectedRoute
```
1. Cek session aktif
2. Jika tidak ada session → redirect ke /login
3. Jika ada session, ambil role dari profiles
4. Cek apakah role user ada di allowedRoles
5. Jika tidak ada akses → redirect ke /
6. Jika ada akses → tampilkan halaman
```

### Implementasi di App.jsx
```jsx
<Route path="/dashboard" element={
  <ProtectedRoute allowedRoles={["admin"]}>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

## Database Schema

### Tabel: profiles
```sql
- id (UUID, Primary Key, references auth.users)
- email (VARCHAR)
- role (VARCHAR) - admin/customer/dokter/apoteker
- created_at (TIMESTAMP)
```

### Tabel: customers
```sql
- id_customer (VARCHAR, Primary Key) - Format: CUST-XXXX
- nama_lengkap (VARCHAR)
- jenis_kelamin (VARCHAR) - Laki-laki/Perempuan
- tanggal_lahir (DATE)
- nomor_hp (VARCHAR)
- alamat (TEXT)
- kelurahan (VARCHAR)
- tanggal_daftar (DATE)
```

### Tabel: customer_crm
```sql
- id_customer (VARCHAR, Primary Key, references customers)
- status_member (VARCHAR) - Aktif/Tidak Aktif
- level_membership (VARCHAR) - Non-Member/Silver/Gold/Platinum
- sumber_user (VARCHAR)
```

### Tabel: customer_transactions
```sql
- id_transaction (BIGSERIAL, Primary Key)
- id_customer (VARCHAR, references customers)
- total_transaksi (INT)
- total_belanja (BIGINT)
- metode_pembayaran (VARCHAR)
- produk_terakhir_dibeli (TEXT)
- tanggal_transaksi_terakhir (DATE)
- riwayat_komplain (TEXT)
- feedback_review (VARCHAR)
```

---

## RLS Policies

### profiles
- Users can view their own profile
- Admins can view all profiles
- Allow profile creation during registration
- Users can update their own profile

### customers
- Admins can view all customers
- Admins can manage customers (CRUD)

### customer_crm
- Admins can view all customer_crm
- Admins can manage customer_crm

### customer_transactions
- Admins can view all customer_transactions
- Admins can manage customer_transactions

---

## Testing Flow

### Test 1: Registrasi Customer
1. Buka `/register`
2. Isi form dengan email, password, role: customer
3. Klik "Daftar Sekarang"
4. Expected: Redirect ke `/login` dengan pesan sukses

### Test 2: Login sebagai Admin
1. Buka `/login`
2. Isi email & password admin
3. Pilih role: Admin
4. Klik "Masuk Sekarang"
5. Expected: Redirect ke `/dashboard`

### Test 3: Login sebagai Customer
1. Buka `/login`
2. Isi email & password customer
3. Pilih role: Customer
4. Klik "Masuk Sekarang"
5. Expected: Redirect ke `/` (landing page)

### Test 4: Akses Protected Route
1. Login sebagai customer
2. Coba akses `/dashboard`
3. Expected: Redirect ke `/` (tidak punya akses)

### Test 5: Tambah Customer
1. Login sebagai admin
2. Buka `/customers`
3. Klik "Tambah Member Baru"
4. Isi form dan submit
5. Expected: Data tersimpan di Supabase

---

## Troubleshooting

### Masalah: Setelah registrasi langsung ke dashboard
**Penyebab:** User tidak logout setelah registrasi
**Solusi:** Sudah diperbaiki dengan `await supabase.auth.signOut()` setelah insert profile

### Masalah: Login tidak redirect ke dashboard
**Penyebab:** Role di profiles tidak sesuai
**Solusi:** Pastikan role di tabel profiles menggunakan lowercase (admin, customer, dokter, apoteker)

### Masalah: ProtectedRoute tidak bekerja
**Penyebab:** Profile tidak ditemukan
**Solusi:** Pastikan tabel profiles sudah diisi dengan benar saat registrasi

---

## Catatan Penting

1. **Role harus konsisten**: Gunakan lowercase di semua tempat (admin, customer, dokter, apoteker)
2. **ID Customer**: Format CUST-XXXX (auto-generated)
3. **Password**: Minimal 6 karakter
4. **RLS**: Pastikan RLS policies aktif untuk keamanan data
5. **Session**: Supabase menggunakan JWT token untuk session management

---

## File Terkait

- `src/supabaseClient.js` - Konfigurasi Supabase
- `src/pages/auth/Login.jsx` - Halaman login
- `src/pages/auth/Register.jsx` - Halaman registrasi
- `src/components/ProtectedRoute.jsx` - Proteksi route
- `src/App.jsx` - Routing aplikasi
- `supabase-schema.sql` - Database schema