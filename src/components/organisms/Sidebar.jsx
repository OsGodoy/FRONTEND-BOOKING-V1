import { RemoveScroll } from "react-remove-scroll";
import { DivContainerCenter } from "../atoms/DivContainer";
import { useContext, useRef } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { X } from "lucide-react";
import SidebarContent from "../molecules/SidebarContent";

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsSidebarOpen(false));

  return (
    <RemoveScroll enabled={isSidebarOpen}>
      <DivContainerCenter
        className={`fixed inset-0 bg-neutral-950/80 transition-opacity
        ${isSidebarOpen ? "opacity-100 pointer-events-auto duration-200" : "opacity-0 pointer-events-none duration-700"}
        `}
      >
        <aside
          ref={ref}
          className={`text-neutral-500 bg-neutral-800 border-l border-b border-neutral-700 h-full w-3/4 fixed top-0 right-0 transition-transform flex flex-col ${isSidebarOpen ? "translate-x-0 duration-500" : "translate-x-full duration-300"}`}
        >
          <h3 className="text-lg p-4 border-b mb-2 border-neutral-700 flex justify-between w-full">
            Menú
            <span
              onClick={() => setIsSidebarOpen(false)}
              className="cursor-pointer"
            >
              <X className="stroke-1 text-amber-400" />
            </span>
          </h3>
          <div className="flex-1 overflow-y-auto">
            <SidebarContent />
          </div>
        </aside>
      </DivContainerCenter>
    </RemoveScroll>
  );
};

export default Sidebar;
