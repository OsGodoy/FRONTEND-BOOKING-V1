import { Crown, Menu, Search, SquareUserRound } from "lucide-react";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { DivContainerCenter } from "../atoms/DivContainer";
import { SearchModalContext } from "../../contexts/SearchModalContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
  const { isSearchModalOpen, setIsSearchModalOpen } =
    useContext(SearchModalContext);

  return (
    <div className="sticky top-0 w-full p-4 mb-4 flex items-center justify-center bg-neutral-900 border-b border-neutral-800 z-40">
      <Link
        to="/"
        className="flex items-center justify-start w-full max-w-360 gap-1 text-2xl sm:text-4xl font-bold text-purple-500"
      >
        booking{" "}
        <span>
          <Crown className="sm:size-8 text-amber-400 fill-amber-400" />
        </span>{" "}
      </Link>
      <DivContainerCenter className="flex-row gap-3 text-neutral-500">
        <Link to={"/auth/login"}>
          <SquareUserRound className="size-7 stroke-[1.5] text-purple-500" />
        </Link>{" "}
        <Search
          onClick={() => {
            setIsSearchModalOpen(!isSearchModalOpen);
          }}
          className="size-7 stroke-[1.5]"
        />
        <Menu
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          className="size-7 stroke-[1.5]"
        />
      </DivContainerCenter>
    </div>
  );
};

export default Header;
