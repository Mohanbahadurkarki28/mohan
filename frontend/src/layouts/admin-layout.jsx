import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/use-auth";

const AdminLayout = () => {
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to={"/auth/login"} replace />;
  }
  if (user.role !== "ADMIN") {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default AdminLayout;
