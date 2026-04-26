import { useContext } from "react";
import { FilterContext } from "../../contexts/FilterContext";
import { DivContainerStart } from "../atoms/DivContainer";
import { useAuthorsData, useGenresData } from "../../hooks/useBooksData";
import { CircleX } from "lucide-react";
import { ButtonBorderAmber } from "../../components/atoms/Buttons";

const FilterInfo = () => {
  const { initialState, isFilters, setIsFilters } = useContext(FilterContext);
  const { authors } = useAuthorsData();
  const { genres } = useGenresData();

  const isFiltered =
    isFilters.author !== null ||
    isFilters.genre !== null ||
    isFilters.search !== "";

  if (!isFiltered) return null;

  const selectedAuthor = authors.find((a) => a.id === isFilters.author);

  const selectedGenre = genres.find((g) => g.id === isFilters.genre);

  return (
    <DivContainerStart className="px-0 pb-3 max-w-360">
      <ButtonBorderAmber className="text-responsive-xs flex items-center justify-center gap-1">
        {selectedAuthor && (
          <span>
            Autor: {selectedAuthor.name} {selectedAuthor.lastname}
          </span>
        )}
        {selectedGenre && <span>Género: {selectedGenre.name}</span>}
        {isFilters.search && <span>Búsqueda: {isFilters.search}</span>}
        <CircleX
          onClick={() => {
            setIsFilters(initialState);
          }}
          className="size-4 stroke-[1.5]"
        />
      </ButtonBorderAmber>
    </DivContainerStart>
  );
};

export default FilterInfo;
