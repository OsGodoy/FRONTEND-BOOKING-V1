import { useQuery } from "@tanstack/react-query";
import { getBookById } from "../api/booksApi";

export const useBookData = (id) => {
  const bookQuery = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id),
    enabled: !!id,
  });

  return {
    book: bookQuery.data ?? null,
    isLoading: bookQuery.isLoading,
    isError: bookQuery.isError,
    error: bookQuery.error,
  };
};
