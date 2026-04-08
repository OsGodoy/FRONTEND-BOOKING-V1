import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Footer from "../organisms/Footer";

const AuthLayout = () => {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-linear-to-b from-neutral-900 to-neutral-950 px-4">
      <main className="flex-1 flex w-full min-h-0">
        <div className="flex-1 flex items-center justify-center min-h-0 w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
