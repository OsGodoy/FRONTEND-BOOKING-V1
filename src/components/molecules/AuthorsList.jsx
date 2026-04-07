import { useContext } from "react";
import { FilterContext } from "../../contexts/FilterContext";
import { useApiData } from "../../hooks/useApiData";
import { UlContainerCenter } from "../atoms/UlContainer";
import { SidebarContext } from "../../contexts/SidebarContext";
import { hoverBgFx } from "../../constants/styles";

const AuthorsList = () => {
  const { authors, isLoading, isError } = useApiData();
  const { setIsFilters } = useContext(FilterContext);
  const { setIsSidebar } = useContext(SidebarContext);

  return (
    <UlContainerCenter className="text-neutral-400 text-responsive-sm">
      {isLoading && <li>Cargando...</li>}
      {isError && <li>Error</li>}
      {!isLoading && !isError && authors.length === 0 && (
        <li>No hay autores</li>
      )}

      {authors.map((author) => (
        <li
          className={`w-full p-2 ${hoverBgFx("neutral-700")}`}
          key={author.id}
          onClick={() => {
            (setIsFilters((prev) => {
              if (prev.author === author.id) {
                return { author: null, genre: null, search: "" };
              }

              return { author: author.id, genre: null, search: "" };
            }),
              setIsSidebar(false));
          }}
        >
          <h3>
            {author.name} {author.lastname}
          </h3>
        </li>
      ))}
    </UlContainerCenter>
  );
};

export default AuthorsList;
