import { RemoveScroll } from "react-remove-scroll";
import { DivContainerCenter } from "../../atoms/DivContainer";
import { useContext, useRef, useState } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { Search, X } from "lucide-react";
import { SearchTopDrawerContext } from "../../../contexts/SearchTopDrawerContext";
import SearchTopDrawerContent from "./SearchTopDrawerContent";
import { FilterContext } from "../../../contexts/FilterContext";

const SearchTopDrawer = () => {
  const { setIsFilters } = useContext(FilterContext);
  const { isSearchTopDrawer, setIsSearchTopDrawer } = useContext(
    SearchTopDrawerContext,
  );

  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsSearchTopDrawer(false));

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
        className={`fixed inset-0 transition-opacity z-50
        ${isSearchTopDrawer ? "pointer-events-auto duration-200" : "pointer-events-none duration-700"}
        `}
      >
        <div
          ref={ref}
          className={`text-neutral-500 bg-neutral-800 border-x border-b border-neutral-700 p-3 w-full fixed top-0 transition-transform flex flex-col ${isSearchTopDrawer ? "translate-y-0 duration-500" : "-translate-y-full duration-300"}`}
        >
          <section className="flex items-center justify-between w-full pb-3 border-b border-neutral-700">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Buscar..."
              className="flex-2 py-2 px-3 outline-0 placeholder-neutral-500 text-neutral-400 border border-neutral-600 rounded"
            />
            {searchValue.trim() ? (
              <button onClick={handleSearch} className="cursor-pointer ml-2">
                <Search className="stroke-1 text-amber-400" />
              </button>
            ) : (
              <button
                onClick={() => setIsSearchTopDrawer(false)}
                className="cursor-pointer ml-2"
              >
                <X className="stroke-1 text-amber-400" />
              </button>
            )}
          </section>
          <div className="text-center pt-2">
            <SearchTopDrawerContent />
          </div>
        </div>
      </DivContainerCenter>
    </RemoveScroll>
  );
};

export default SearchTopDrawer;
