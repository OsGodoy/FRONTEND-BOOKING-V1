import { RemoveScroll } from "react-remove-scroll";
import { useContext, useState } from "react";
import { Search, X } from "lucide-react";
import { SearchTopDrawerContext } from "../../../contexts/SearchTopDrawerContext";
import SearchTopDrawerContent from "./SearchTopDrawerContent";
import { FilterContext } from "../../../contexts/FilterContext";
import { DivContainerCenter } from "../../atoms/DivContainer";

const SearchTopDrawer = () => {
  const { setIsFilters } = useContext(FilterContext);
  const { isSearchTopDrawer, setIsSearchTopDrawer } = useContext(
    SearchTopDrawerContext,
  );

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    setIsFilters((prev) => {
      if (searchValue.trim()) {
        return {
          author: null,
          genre: null,
          search: searchValue,
        };
      }

      return prev;
    });

    setIsSearchTopDrawer(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchValue.trim()) {
      handleSearch();
      setIsSearchTopDrawer(false);
    }
  };

  return (
    <RemoveScroll enabled={isSearchTopDrawer}>
      <DivContainerCenter
        className={`fixed inset-0 z-50 transition-opacity ${isSearchTopDrawer ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none duration-500"}`}
      >
        <div
          onClick={() => setIsSearchTopDrawer(false)}
          className="absolute inset-0"
        />

        <div
          className={`text-neutral-500 bg-neutral-800 border-x border-b border-neutral-700 p-3 w-full fixed top-0 transition-transform flex flex-col items-center justify-center ${isSearchTopDrawer ? "translate-y-0 duration-500" : "-translate-y-full duration-300"}`}
        >
          <div className="w-full max-w-120 lg:max-w-180">
            <section className="flex items-center justify-between w-full pb-3 border-b border-neutral-700">
              <div className="w-full flex items-center justify-center border border-neutral-600 rounded">
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  type="text"
                  placeholder="Buscar..."
                  className="flex-2 py-2 px-3 outline-0 placeholder-neutral-500 text-neutral-400"
                />

                {searchValue.trim() ? (
                  <button
                    onClick={handleSearch}
                    className="cursor-pointer mx-2"
                  >
                    <Search className="stroke-1 text-amber-400" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsSearchTopDrawer(false)}
                    className="cursor-pointer mx-2"
                  >
                    <X className="stroke-1 text-amber-400" />
                  </button>
                )}
              </div>
            </section>
            <div className="text-center pt-2 w-full">
              <SearchTopDrawerContent />
            </div>
          </div>
        </div>
      </DivContainerCenter>
    </RemoveScroll>
  );
};

export default SearchTopDrawer;
