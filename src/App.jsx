import "./assets/tailwind.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router tetap ada
import React, { Suspense } from "react";

// Layouts & Components
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";

// Lazy Loading Pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />

            {/* UBAH DI SINI: Sesuaikan dengan link di Sidebar */}
            <Route path="/transactions" element={<Orders />} />
            <Route path="/patients" element={<Customers />} />

            <Route
              path="/error-400"
              element={
                <ErrorPage
                  errorCode="400"
                  errorTitle="Bad Request: Permintaan tidak dapat dipahami."
                  errorImg="https://illustrations.popsy.co/gray/falling.svg"
                />
              }
            />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            {/* ... */}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
