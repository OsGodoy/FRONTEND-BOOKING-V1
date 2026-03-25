import { RemoveScroll } from "react-remove-scroll";
import { DivContainerCenter } from "../atoms/DivContainer";
import { useContext, useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { X } from "lucide-react";
import { SearchModalContext } from "../../contexts/SearchModalContext";

const SearchModal = () => {
  const { isSearchModalOpen, setIsSearchModalOpen } =
    useContext(SearchModalContext);

  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsSearchModalOpen(false));

  return (
    <RemoveScroll enabled={isSearchModalOpen}>
      <DivContainerCenter
        className={`fixed inset-0 bg-neutral-950/80 transition-opacity
        ${isSearchModalOpen ? "opacity-100 pointer-events-auto duration-200" : "opacity-0 pointer-events-none duration-700"}
        `}
      >
        <div
          ref={ref}
          className={`text-neutral-500 bg-neutral-800 border-l border-b border-neutral-700 h-3/4 w-full fixed top-0 transition-transform flex flex-col ${isSearchModalOpen ? "translate-y-0 duration-500" : "-translate-y-full duration-300"}`}
        >
          <section className="p-4 border-b mb-2 border-neutral-700 flex justify-between w-full">
            <input type="text" placeholder="Buscar..." className="outline-0 placeholder-neutral-500 text-neutral-400" />
            <span
              onClick={() => setIsSearchModalOpen(false)}
              className="cursor-pointer"
            >
              <X className="stroke-1 text-amber-400" />
            </span>
          </section>
          {/* <div className="flex-1 overflow-y-auto">
            <SidebarContent />
          </div> */}
        </div>
      </DivContainerCenter>
    </RemoveScroll>
  );
};

export default SearchModal;
