import { Outlet } from "react-router-dom";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Sidebar from "../organisms/Sidebar";
import SearchModal from "../organisms/SearchModal";

const MainLayout = () => {
  return (
    <>
      <div className="min-h-dvh flex flex-col bg-neutral-950">
        <Header />
        <Sidebar />
        <SearchModal />
        <main className="flex-1 flex">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
