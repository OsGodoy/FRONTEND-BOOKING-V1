import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Footer from "../organisms/Footer";
import LoaderPage from "../../pages/Loader";
import { useNavigationLoader } from "../../contexts/NavigationContext";
import { useEffect } from "react";

const AuthLayout = () => {
  const { loading, setLoading } = useNavigationLoader();
  const location = useLocation();

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-linear-to-b from-neutral-900 to-neutral-950 px-4">
      {loading && <LoaderPage />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
