import { useContext, useMemo } from "react";
import { useBooksData } from "../../../hooks/useBooksData";
import { UlContainerGrid } from "../../atoms/UlContainer";
import { FilterContext } from "../../../contexts/FilterContext";
import { SearchTopDrawerContext } from "../../../contexts/SearchTopDrawerContext";
import { ButtonBorderPurple } from "../../atoms/Buttons";

const SearchTopDrawerContent = () => {
  const { setIsFilters } = useContext(FilterContext);
  const { setIsSearchTopDrawer } = useContext(SearchTopDrawerContext);

  const {
    books = [],
    authors = [],
    genres = [],
    isLoading,
    isError,
  } = useBooksData();

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
      {isError && <li>Error</li>}

      {items.map((item) => (
        <ButtonBorderPurple
          key={`${item.type}-${item.id}`}
          className="text-responsive-xs w-fit leading-3.5"
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

            setIsSearchTopDrawer(false);
          }}
        >
          {item.type === "book" && <h3>{item.title}</h3>}
          {item.type === "author" && (
            <h3>
              {item.name} {item.lastname}
            </h3>
          )}
          {item.type === "genre" && <h3>{item.name}</h3>}
        </ButtonBorderPurple>
      ))}
    </UlContainerGrid>
  );
};

export default SearchTopDrawerContent;
