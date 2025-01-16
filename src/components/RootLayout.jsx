import { useSelector } from "react-redux";
import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router";
const RootLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="mt-5">
      {isLoggedIn && <NavigationBar />}
      <Outlet />
    </div>
  );
};

export default RootLayout;
