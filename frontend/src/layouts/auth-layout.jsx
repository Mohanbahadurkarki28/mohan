import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen grid grid-cols-2">
      <div className="hidden sm:grid bg-purple-400">{/* IMAGE */}</div>

      <div className="col-span-2 sm:col-span-1 place-content-center mx-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
