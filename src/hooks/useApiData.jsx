import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../api/booksApi";
import { getAuthors } from "../api/authorsApi";

export const useApiData = () => {
  const booksQuery = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const authorsQuery = useQuery({
    queryKey: ["authors"],
    queryFn: getAuthors,
  });

  return {
    books: booksQuery.data ?? [],
    authors: authorsQuery.data ?? [],
    isLoading: booksQuery.isLoading || authorsQuery.isLoading,
    error: booksQuery.error || authorsQuery.error,
  };
};
