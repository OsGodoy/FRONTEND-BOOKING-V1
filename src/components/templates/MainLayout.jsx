import { Outlet } from "react-router-dom";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Sidebar from "../organisms/NavBars/Sidebars/Sidebar";
import SearchTopDrawer from "../organisms/Drawers/SearchTopDrawer";
import ScrollToTopButton from "../../hooks/useScrollToTop";
import BottomNavBar from "../organisms/NavBars/BottomNavBar/BottomNavBar";
import { useRef } from "react";

const MainLayout = () => {
  return (
    <div className="min-h-dvh flex flex-col bg-neutral-950 pb-20">
      <Header />
      <Sidebar />
      <SearchTopDrawer />

      <main className="flex-1 flex w-full min-h-0">
        <div className="flex-1 flex items-center justify-center min-h-0 w-full">
          <Outlet />
        </div>
      </main>

      <ScrollToTopButton />
      <Footer />
      <BottomNavBar />
    </div>
  );
};

export default MainLayout;
