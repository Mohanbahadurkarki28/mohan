import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Bookings from "./pages/bookings/Bookings";
import Home from "./pages/home/Home";
import Hostel from "./pages/hostels/Hostel";
import Hostels from "./pages/hostels/Hostels";

import AuthLayout from "./layouts/auth-layout";
import MainLayout from "./layouts/main-layout";

import NewHostel from "./pages/admin/new-hostel";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";

import { useCoordinates } from "./hooks/use-coordinates";
import AdminLayout from "./layouts/admin-layout";
import AdminHome from "./pages/admin/admin-home";

function App() {
  const { initializeCoordinates } = useCoordinates();

  useEffect(() => {
    initializeCoordinates();
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/bookings" element={<Bookings />} />

          <Route path="/hostels">
            <Route path="" element={<Hostels />} />
            <Route path=":hostelId" element={<Hostel />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="new-hostel" element={<NewHostel />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
