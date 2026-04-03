import { ChevronDown } from "lucide-react";
import { LiContainer, UlContainerCenter } from "../../../atoms/UlContainer";
import { useContext, useEffect, useState } from "react";
import AuthorsList from "../../../molecules/AuthorsList";
import { SidebarContext } from "../../../../contexts/SidebarContext";

import GenresList from "../../../molecules/GenresList";
import { Link } from "react-router-dom";

const SidebarContent = () => {
  const [isActive, setIsActive] = useState(null);
  const { isSidebar } = useContext(SidebarContext);

  useEffect(() => {
    if (!isSidebar) {
      setIsActive(null);
    }
  }, [isSidebar]);

  const items = [
    {
      id: "authors",
      label: "Autores",
      content: <AuthorsList />,
    },
    {
      id: "genres",
      label: "Géneros",
      content: <GenresList />,
    },
  ];

  return (
    <UlContainerCenter className="text-neutral-400">
      {items.map((item) => {
        const isOpen = isActive === item.id;

        return (
          <div key={item.id} className="w-full">
            <LiContainer
              onClick={() => setIsActive(isOpen ? null : item.id)}
              className="bg-neutral-900/40 flex"
            >
              <h3
                className={`transition-colors duration-300 ${isOpen && "text-purple-400"}`}
              >
                {item.label}
              </h3>
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
              <Link to="/">{item.content}</Link>
            </div>
          </div>
        );
      })}
    </UlContainerCenter>
  );
};

export default SidebarContent;
