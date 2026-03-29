import { useContext, useMemo } from "react";
import { useApiData } from "../../../hooks/useApiData";
import { UlContainerGrid } from "../../atoms/UlContainer";
import { FilterContext } from "../../../contexts/FilterContext";
import { SearchModalContext } from "../../../contexts/SearchModalContext";

const SearchModalContent = () => {
  const { setIsFilters } = useContext(FilterContext);
  const { setIsSearchModalOpen } = useContext(SearchModalContext);

  const {
    books = [],
    authors = [],
    genres = [],
    isLoading,
    error,
  } = useApiData();

  const getRandomItems = (books, authors, genres, limit = 5) => {
    const combined = [
      ...books.map((item) => ({ ...item, type: "book" })),
      ...authors.map((item) => ({ ...item, type: "author" })),
      ...genres.map((item) => ({ ...item, type: "genre" })),
    ];

    const shuffled = combined.sort(() => Math.random() - 0.5);

    return shuffled.slice(0, limit);
  };

  const items = useMemo(() => {
    return getRandomItems(books, authors, genres, 6);
  }, [books, authors, genres]);

  return (
    <UlContainerGrid className="flex flex-row">
      {isLoading && <li>Cargando...</li>}
      {error && <li>Error</li>}

      {items.map((item) => (
        <li
          key={`${item.type}-${item.id}`}
          className="text-purple-500 text-xs w-fit border px-2 py-1 rounded leading-3.5"
          onClick={() => {
            setIsFilters(() => {
              if (item.type === "author") {
                return { author: item.id, genre: null, search: "" };
              }

              if (item.type === "genre") {
                return { author: null, genre: item.id, search: "" };
              }

              if (item.type === "book") {
                return { author: null, genre: null, search: item.title };
              }

              return {};
            });

            setIsSearchModalOpen(false);
          }}
        >
          {item.type === "book" && <h3>{item.title}</h3>}
          {item.type === "author" && (
            <h3>
              {item.name} {item.lastname}
            </h3>
          )}
          {item.type === "genre" && <h3>{item.name}</h3>}
        </li>
      ))}
    </UlContainerGrid>
  );
};

export default SearchModalContent;
