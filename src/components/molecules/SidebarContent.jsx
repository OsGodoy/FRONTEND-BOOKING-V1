import { ChevronDown } from "lucide-react";
import { LiContainer, UlContainerCenter } from "../atoms/UlContainer";
import { useContext, useEffect, useState } from "react";
import AuthorsList from "../molecules/AuthorsList";
import { SidebarContext } from "../../contexts/SidebarContext";

const SidebarContent = () => {
  const [isActive, setIsActive] = useState(null);
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if (!isSidebarOpen) {
      setIsActive(null);
    }
  }, [isSidebarOpen]);

  const items = [
    {
      id: "authors",
      label: "Autores",
      content: <AuthorsList />,
    },
    {
      id: "genres",
      label: "Géneros",
      content: <AuthorsList />,
    },
  ];

  return (
    <UlContainerCenter className="text-neutral-300">
      {items.map((item) => {
        const isOpen = isActive === item.id;

        return (
          <div key={item.id} className="w-full">
            <LiContainer
              onClick={() => setIsActive(isOpen ? null : item.id)}
              className="bg-neutral-900/40 flex"
            >
              {item.label}
              <ChevronDown
                className={`stroke-1 text-purple-500 transition-transform duration-300
                ${isOpen && "scale-y-[-1]"}`}
              />
            </LiContainer>

            <div
              className={`w-full overflow-scroll transition-all border-b  border-neutral-700
              ${isOpen ? "max-h-80 opacity-100 duration-500" : "max-h-0 opacity-0 duration-300"}
              `}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </UlContainerCenter>
  );
};

export default SidebarContent;
