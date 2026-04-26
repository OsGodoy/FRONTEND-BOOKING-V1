import { useBooksData } from "../../hooks/useBooksData";
import BookCard from "../molecules/BookCard";
import Loading from "../atoms/Loading";
import { DivContainerGrid } from "../atoms/DivContainer";
import ErrorPage from "../atoms/ErrorPage";
import { useContext } from "react";
import { FilterContext } from "../../contexts/FilterContext";

const BooksList = () => {
  const { isFilters } = useContext(FilterContext);
  const { books, isBooksLoading, isBooksError } = useBooksData(isFilters);

  if (isBooksLoading) return <Loading />;
  if (isBooksError) return <ErrorPage />;
  if (books.length === 0)
    return <p className="text-amber-400">Listado vacío...</p>;

  return (
    <DivContainerGrid padding="px-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </DivContainerGrid>
  );
};

export default BooksList;
