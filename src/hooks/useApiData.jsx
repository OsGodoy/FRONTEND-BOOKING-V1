import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../api/booksApi";
import { getAuthors } from "../api/authorsApi";
import { getGenres } from "../api/genresApi";

export const useApiData = (filters = {}) => {
  const booksQuery = useQuery({
    queryKey: ["books", filters],
    queryFn: () => getBooks(filters),
  });

  const authorsQuery = useQuery({
    queryKey: ["authors"],
    queryFn: getAuthors,
  });

  const genresQuery = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  return {
    books: booksQuery.data ?? [],
    authors: authorsQuery.data ?? [],
    genres: genresQuery.data ?? [],
    isLoading: booksQuery.isLoading || authorsQuery.isLoading,
    error: booksQuery.error || authorsQuery.error,
  };
};
