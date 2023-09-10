import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) return <Navigate to={"/login"} />;

  return (
    <>
      <Outlet />
    </>
  );
};

export default UserLayout;
