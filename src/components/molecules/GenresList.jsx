import { useContext } from "react";
import { FilterContext } from "../../contexts/FilterContext";
import { SidebarContext } from "../../contexts/SidebarContext";
import { useGenresData } from "../../hooks/useBooksData";
import { UlContainerCenter } from "../atoms/UlContainer";
import { hoverBgFx } from "../../constants/styles";

const GenresList = () => {
  const { genres = [], isGenresLoading, isGenresError } = useGenresData();
  const { setIsFilters } = useContext(FilterContext);
  const { setIsSidebar } = useContext(SidebarContext);

  return (
    <UlContainerCenter className="text-neutral-400 text-responsive-sm">
      {isGenresLoading && <li>Cargando...</li>}
      {isGenresError && <li>Error</li>}
      {!isGenresLoading && !isGenresError && genres.length === 0 && (
        <li>No hay géneros</li>
      )}

      {genres.map((genre) => (
        <li
          className={`w-full p-2 ${hoverBgFx("neutral-700")}`}
          key={genre.id}
          onClick={() => {
            (setIsFilters((prev) => {
              if (prev.genre === genre.id) {
                return { author: null, genre: null, search: "" };
              }

              return { author: null, genre: genre.id, search: "" };
            }),
              setIsSidebar(false));
          }}
        >
          <h3>{genre.name}</h3>
        </li>
      ))}
    </UlContainerCenter>
  );
};

export default GenresList;
