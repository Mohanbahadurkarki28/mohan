import { Link, useNavigate } from "react-router-dom";

import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import MobileNav from "./common/mobile-nav";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, removeAuth, user } = useAuth();

  const handleLogout = () => {
    removeAuth();
    navigate("/");
  };
  return (
    <header className="w-full border-b">
      <nav className="w-11/12  h-12 mx-auto flex items-center justify-between">
        <h2>MOHAN SOLUTIONS</h2>
        <ul className="hidden sm:flex items-center gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/hostels">Hostels</Link>
          </li>
          <li>
            <Link to="/bookings">Bookings</Link>
          </li>
          {user && user.role === "ADMIN" && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
          {token ? (
            <li>
              <button
                className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
          )}
        </ul>
        <div className="block sm:hidden">
          <MobileNav />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
