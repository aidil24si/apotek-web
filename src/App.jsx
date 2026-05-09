import "./assets/tailwind.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import PageHeader from "./components/PageHeader";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Loading from "./components/Loading";

function App() {
  // Mengubah nama variabel menjadi LandingPage agar konsisten dengan nama file
  const LandingPage = React.lazy(() => import("./pages/LandingPage"));

  const Dashboard = React.lazy(() => import("./pages/Dashboard"));
  const Orders = React.lazy(() => import("./pages/Orders"));
  const Customers = React.lazy(() => import("./pages/Customers"));
  const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
  const Login = React.lazy(() => import("./pages/auth/Login"));
  const Register = React.lazy(() => import("./pages/auth/Register"));
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
  const Inventory = React.lazy(() => import("./pages/Inventory"));

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        
        {/* =========================================================
            1. ROUTE PUBLIK (Tanpa Sidebar)
            Diletakkan secara mandiri di luar MainLayout atau AuthLayout
        ========================================================= */}
        <Route path="/" element={<LandingPage />} />


        {/* =========================================================
            2. ROUTE AUTENTIKASI (Layout khusus Login/Register)
        ========================================================= */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>


        {/* =========================================================
            3. ROUTE ADMIN (Dengan Sidebar & Header)
            Semua route di dalam sini akan memiliki Layout Admin
        ========================================================= */}
        <Route element={<MainLayout />}>
          {/* Pindahkan Dashboard ke path /dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Main Routes lainnya */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/inventory" element={<Inventory />} />

          {/* Error Pages */}
          <Route
            path="/error-400"
            element={
              <ErrorPage
                errorCode="400"
                errorTitle="Bad Request: Permintaan tidak dapat dipahami oleh server karena sintaks yang salah."
                errorImg="https://illustrations.popsy.co/gray/falling.svg"
              />
            }
          />
          <Route
            path="/error-401"
            element={
              <ErrorPage
                errorCode="401"
                errorTitle="Unauthorized: Anda harus melakukan autentikasi terlebih dahulu untuk mengakses halaman ini."
                errorImg="https://illustrations.popsy.co/gray/falling.svg"
              />
            }
          />
          <Route
            path="/error-403"
            element={
              <ErrorPage
                errorCode="403"
                errorTitle="Forbidden: Anda tidak memiliki izin untuk mengakses sumber daya ini."
                errorImg="https://illustrations.popsy.co/gray/falling.svg"
              />
            }
          />

          {/* Fallback untuk route yang tidak terdaftar (404) */}
          <Route
            path="*"
            element={
              <ErrorPage
                errorCode="404"
                errorTitle="Halaman yang Anda cari tidak ditemukan."
                errorImg="https://illustrations.popsy.co/gray/falling.svg"
              />
            }
          />
        </Route>

      </Routes>
    </Suspense>
  );
}

export default App;