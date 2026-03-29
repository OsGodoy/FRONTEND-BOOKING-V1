import { Outlet } from "react-router-dom";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Sidebar from "../organisms/Sidebar/Sidebar";
import SearchModal from "../organisms/Modal/SearchModal";
import LoaderPage from "../../pages/Loader";

const MainLayout = () => {
  return (
    <>
      <div className="min-h-dvh flex flex-col bg-neutral-950">
        <LoaderPage />
        <Header />
        <Sidebar />
        <SearchModal />
        <main className="flex-1 flex px-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
