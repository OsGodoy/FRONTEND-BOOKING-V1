import { Crown, Menu, Search } from "lucide-react";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { DivContainerCenter } from "../atoms/DivContainer";
import { SearchModalContext } from "../../contexts/SearchModalContext";

const Header = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
  const { isSearchModalOpen, setIsSearchModalOpen } =
    useContext(SearchModalContext);

  return (
    <div className="sticky top-0 w-full p-4 mb-4 flex items-center justify-center bg-neutral-900 border-b border-neutral-800">
      <h1 className="flex items-center justify-start w-full max-w-360 gap-1 text-2xl sm:text-4xl font-bold text-purple-500">
        booking{" "}
        <span>
          <Crown className="sm:size-8 text-amber-400 fill-amber-400" />
        </span>{" "}
      </h1>
      <DivContainerCenter className="flex-row gap-2">
        <Search
          onClick={() => {
            setIsSearchModalOpen(!isSearchModalOpen);
          }}
          className="text-neutral-500 size-7"
        />
        <Menu
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          className="text-neutral-500 size-7"
        />
      </DivContainerCenter>
    </div>
  );
};

export default Header;
