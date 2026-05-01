import "./assets/tailwind.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import PageHeader from "./components/PageHeader";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Loading from "./components/Loading";


function App() {
  const Dashboard = React.lazy(() => import("./pages/Dashboard"));
  const Orders = React.lazy(() => import("./pages/Orders"));
  const Customers = React.lazy(() => import("./pages/Customers"));
  const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
  const Login = React.lazy(() => import("./pages/auth/Login"));
  const Register = React.lazy(() => import("./pages/auth/Register"));
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Main Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />

          {/* Error Pages Test Routes sesuai instruksi latihan */}
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
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
