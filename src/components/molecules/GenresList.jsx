import { useContext } from "react";
import { FilterContext } from "../../contexts/FilterContext";
import { SidebarContext } from "../../contexts/SidebarContext";
import { useApiData } from "../../hooks/useApiData";
import { UlContainerCenter } from "../atoms/UlContainer";

const GenresList = () => {
  const { genres = [], isLoading, error } = useApiData();
  const { setIsFilters } = useContext(FilterContext);
  const { setIsSidebarOpen } = useContext(SidebarContext);

  return (
    <UlContainerCenter className="p-2 gap-4 text-neutral-400 text-sm">
      {isLoading && <li>Cargando...</li>}
      {error && <li>Error</li>}
      {!isLoading && !error && genres.length === 0 && <li>No hay géneros</li>}

      {genres.map((genre) => (
        <li
          className="w-full"
          key={genre.id}
          onClick={() => {
            (setIsFilters((prev) => {
              if (prev.genre === genre.id) {
                return { author: null, genre: null, search: "" };
              }

              return { author: null, genre: genre.id, search: "" };
            }),
              setIsSidebarOpen(false));
          }}
        >
          <h3>{genre.name}</h3>
        </li>
      ))}
    </UlContainerCenter>
  );
};

export default GenresList;
