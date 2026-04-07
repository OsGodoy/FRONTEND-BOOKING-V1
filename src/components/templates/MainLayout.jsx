import { Outlet } from "react-router-dom";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Sidebar from "../organisms/NavBars/Sidebars/Sidebar";
import SearchTopDrawer from "../organisms/Drawers/SearchTopDrawer";
import ScrollToTopButton from "../../hooks/useScrollToTop";
import BottomNavBar from "../organisms/NavBars/BottomNavBar/BottomNavBar";
import { useRef } from "react";

const MainLayout = () => {
  const scrollRef = useRef(null);

  return (
    <div
      ref={scrollRef}
      className="min-h-dvh flex flex-col bg-neutral-950 h-screen overflow-y-scroll"
    >
      <Header />
      <Sidebar />
      <SearchTopDrawer />

      <main className="flex-1 flex items-start justify-center w-full">
        <Outlet />
      </main>

      <ScrollToTopButton scrollRef={scrollRef} />
      <Footer />
      <BottomNavBar />
    </div>
  );
};

export default MainLayout;
