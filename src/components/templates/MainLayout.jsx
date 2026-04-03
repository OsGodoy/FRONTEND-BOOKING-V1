import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Sidebar from "../organisms/NavBars/Sidebars/Sidebar";
import SearchTopDrawer from "../organisms/Drawers/SearchTopDrawer";
import ScrollToTopButton from "../../hooks/useScrollToTop";
import BottomNavBar from "../organisms/NavBars/BottomNavBar/BottomNavBar";

const MainLayout = () => {
  return (
    <div className="min-h-dvh flex flex-col bg-neutral-950">
      <Header />
      <Sidebar />
      <SearchTopDrawer />

      <main className="flex-1 flex px-4">
        <Outlet />
      </main>

      <ScrollToTopButton />
      <Footer />
      <BottomNavBar />
    </div>
  );
};

export default MainLayout;
