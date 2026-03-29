import { Outlet } from "react-router-dom";
import Footer from "../organisms/Footer";
import LoaderPage from "../../pages/Loader";

const AuthLayout = () => {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-linear-to-b from-neutral-900 to-neutral-950 px-4">
      <LoaderPage />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
