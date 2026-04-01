import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Sidebar from "../organisms/Sidebars/Sidebar";
import SearchTopDrawer from "../organisms/Drawers/SearchTopDrawer";
import ScrollToTopButton from "../../hooks/useScrollToTop";
import { useNavigationLoader } from "../../contexts/NavigationContext";
import { useEffect } from "react";
import LoaderPage from "../../pages/Loader";

const MainLayout = () => {
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
    <div className="min-h-dvh flex flex-col bg-neutral-950">
      {loading && <LoaderPage />}
      <Header />
      <Sidebar />
      <SearchTopDrawer />

      <main className="flex-1 flex px-4">
        <Outlet />
      </main>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default MainLayout;
