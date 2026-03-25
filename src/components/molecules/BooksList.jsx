import { useApiData } from "../../hooks/useApiData";
import BookCard from "../molecules/BookCard";
import Loading from "../atoms/Loading";
import { DivContainerGrid } from "../atoms/DivContainer";
import ErrorPage from "../atoms/ErrorPage";

const BooksList = () => {
  const { books, isLoading, error } = useApiData();

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;
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
