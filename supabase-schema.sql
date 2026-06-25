-- ============================================================
-- APOTEK SEHAT - SUPABASE DATABASE SCHEMA (VERSION 2)
-- ============================================================
-- Schema yang sudah disesuaikan dengan tabel yang ada di Supabase
-- ============================================================

-- 1. TABEL PROFILES (Data user & role setelah autentikasi)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR,
  role VARCHAR CHECK (role IN ('admin', 'customer', 'dokter', 'apoteker')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS untuk tabel profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: User dapat melihat profil mereka sendiri, Admin dapat melihat semua profil
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Insert profil baru saat registrasi (public/authenticated)
CREATE POLICY "Allow profile creation during registration" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Policy: Update profil sendiri
CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- 2. TABEL CUSTOMERS (Data pelanggan)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.customers (
  id_customer VARCHAR(50) PRIMARY KEY,
  nama_lengkap VARCHAR(255) NOT NULL,
  jenis_kelamin VARCHAR(20) CHECK (jenis_kelamin IN ('Laki-laki', 'Perempuan')),
  tanggal_lahir DATE,
  nomor_hp VARCHAR(20),
  alamat TEXT,
  kelurahan VARCHAR(100),
  tanggal_daftar DATE DEFAULT CURRENT_DATE
);

-- Enable RLS untuk tabel customers
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Policy: Admin dapat melihat semua customers
CREATE POLICY "Admins can view all customers" 
  ON public.customers 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admin dapat insert/update/delete customers
CREATE POLICY "Admins can manage customers" 
  ON public.customers 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 3. TABEL CUSTOMER_CRM (Data CRM pelanggan)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.customer_crm (
  id_customer VARCHAR(50) PRIMARY KEY REFERENCES customers(id_customer) ON DELETE CASCADE,
  status_member VARCHAR(20) CHECK (status_member IN ('Aktif', 'Tidak Aktif')),
  level_membership VARCHAR(50) CHECK (level_membership IN ('Non-Member', 'Silver', 'Gold', 'Platinum')),
  sumber_user VARCHAR(100)
);

-- Enable RLS untuk tabel customer_crm
ALTER TABLE public.customer_crm ENABLE ROW LEVEL SECURITY;

-- Policy: Admin dapat melihat semua customer_crm
CREATE POLICY "Admins can view all customer_crm" 
  ON public.customer_crm 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admin dapat manage customer_crm
CREATE POLICY "Admins can manage customer_crm" 
  ON public.customer_crm 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 4. TABEL CUSTOMER_TRANSACTIONS (Data transaksi pelanggan)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.customer_transactions (
  id_transaction BIGSERIAL PRIMARY KEY,
  id_customer VARCHAR(50) REFERENCES customers(id_customer) ON DELETE CASCADE,
  total_transaksi INT DEFAULT 0,
  total_belanja BIGINT DEFAULT 0,
  metode_pembayaran VARCHAR(50),
  produk_terakhir_dibeli TEXT,
  tanggal_transaksi_terakhir DATE,
  riwayat_komplain TEXT,
  feedback_review VARCHAR(100)
);

-- Enable RLS untuk tabel customer_transactions
ALTER TABLE public.customer_transactions ENABLE ROW LEVEL SECURITY;

-- Policy: Admin dapat melihat semua customer_transactions
CREATE POLICY "Admins can view all customer_transactions" 
  ON public.customer_transactions 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admin dapat manage customer_transactions
CREATE POLICY "Admins can manage customer_transactions" 
  ON public.customer_transactions 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 5. TABEL MEDICINES (Data obat untuk chatbot & analytics)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.medicines (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  stock INT DEFAULT 0,
  category VARCHAR,
  price NUMERIC,
  unit VARCHAR DEFAULT 'Tablet',
  description TEXT,
  manufacturer VARCHAR,
  expiry_date DATE,
  composition TEXT,
  side_effects TEXT,
  min_stock INT DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS untuk tabel medicines
ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang (termasuk anon/guest) dapat membaca data obat
CREATE POLICY "Public can read medicines" 
  ON public.medicines 
  FOR SELECT 
  USING (true);

-- Policy: Hanya admin yang dapat insert/update/delete medicines
CREATE POLICY "Admins can manage medicines" 
  ON public.medicines 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 6. TABEL PROMOTIONS (Data promosi untuk analytics admin)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.promotions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  promo_name VARCHAR NOT NULL,
  usage_count INT DEFAULT 0,
  target_segment VARCHAR,
  discount_percentage INT,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS untuk tabel promotions
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang dapat membaca data promosi
CREATE POLICY "Public can read promotions" 
  ON public.promotions 
  FOR SELECT 
  USING (true);

-- Policy: Hanya admin yang dapat manage promosi
CREATE POLICY "Admins can manage promotions" 
  ON public.promotions 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 7. INSERT SAMPLE DATA (Opsional - untuk testing)
-- ============================================================

-- Sample customers
INSERT INTO public.customers (id_customer, nama_lengkap, jenis_kelamin, tanggal_lahir, nomor_hp, alamat, kelurahan, tanggal_daftar)
VALUES
  ('CUST-001', 'John Doe', 'Laki-laki', '1990-05-15', '081234567890', 'Jl. Merdeka No. 1, Jakarta', 'Menteng', '2024-01-15'),
  ('CUST-002', 'Jane Smith', 'Perempuan', '1995-08-20', '087654321098', 'Jl. Sudirman No. 10, Jakarta', 'Tanah Abang', '2024-02-20'),
  ('CUST-003', 'Budi Santoso', 'Laki-laki', '1985-03-10', '089912345678', 'Jl. Gatot Subroto No. 5, Jakarta', 'Setiabudi', '2024-03-10')
ON CONFLICT (id_customer) DO NOTHING;

-- Sample customer_crm
INSERT INTO public.customer_crm (id_customer, status_member, level_membership, sumber_user)
VALUES
  ('CUST-001', 'Aktif', 'Gold', 'Instagram'),
  ('CUST-002', 'Aktif', 'Silver', 'WhatsApp'),
  ('CUST-003', 'Aktif', 'Platinum', 'Walk-in')
ON CONFLICT (id_customer) DO NOTHING;

-- Sample customer_transactions
INSERT INTO public.customer_transactions (id_customer, total_transaksi, total_belanja, metode_pembayaran, produk_terakhir_dibeli, tanggal_transaksi_terakhir, feedback_review)
VALUES
  ('CUST-001', 15, 1250000, 'QRIS', 'Paracetamol 500mg', '2024-12-01', 'Sangat Puas'),
  ('CUST-002', 8, 650000, 'GoPay', 'Vitamin C 1000mg', '2024-12-05', 'Puas'),
  ('CUST-003', 25, 2100000, 'Cash', 'Amoxicillin 500mg', '2024-12-10', 'Sangat Puas')
ON CONFLICT DO NOTHING;

-- Sample medicines
INSERT INTO public.medicines (name, stock, category, price, unit, description, manufacturer, expiry_date, composition, side_effects, min_stock)
VALUES
  ('Paracetamol 500mg', 150, 'Obat Bebas', 5000, 'Tablet', 'Obat penurun panas dan pereda nyeri ringan hingga sedang.', 'PT Kimia Farma', '2027-12-31', 'Paracetamol 500mg', 'Jarang terjadi, pada dosis tinggi dapat menyebabkan kerusakan hati.', 50),
  ('Amoxicillin 500mg', 20, 'Obat Keras', 12000, 'Strip', 'Antibiotik penisilin untuk mengobati berbagai macam infeksi bakteri.', 'PT Sanbe Farma', '2026-08-15', 'Amoxicillin trihydrate 500mg', 'Mual, muntah, ruam kulit, reaksi alergi pada pasien sensitif penisilin.', 30),
  ('Vitamin C 1000mg', 124, 'Vitamin', 85000, 'Tablet', 'Suplemen vitamin C untuk meningkatkan daya tahan tubuh.', 'PT Dexa Medica', '2026-12-31', 'Vitamin C 1000mg', 'Jarang terjadi, overdosis dapat menyebabkan sakit perut.', 20)
ON CONFLICT DO NOTHING;

-- Sample promotions
INSERT INTO public.promotions (promo_name, usage_count, target_segment, discount_percentage, start_date, end_date, is_active)
VALUES
  ('Flash Sale Vitamin', 245, 'Semua Customer', 30, '2026-01-01', '2026-12-31', true),
  ('Promo Obat Herbal', 189, 'Customer > 30 tahun', 20, '2026-01-01', '2026-06-30', true),
  ('Diskon Alat Kesehatan', 156, 'Customer Baru', 15, '2026-01-01', '2026-12-31', true)
ON CONFLICT DO NOTHING;

-- ============================================================
-- CATATAN PENTING:
-- ============================================================
-- 1. Tabel yang sudah dibuat di Supabase tidak perlu dibuat lagi
-- 2. Hanya jalankan bagian policies dan sample data yang belum ada
-- 3. Pastikan RLS policies sudah aktif untuk keamanan data
-- 4. Untuk testing, gunakan data sample yang sudah disediakan
-- ============================================================