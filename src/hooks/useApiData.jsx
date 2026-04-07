import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../api/booksApi";
import { getAuthors } from "../api/authorsApi";
import { getGenres } from "../api/genresApi";
import { queryKeys } from "../constants/queryKeys";

export const useApiData = (filters = {}) => {
  const booksQuery = useQuery({
    queryKey: queryKeys.books(filters),
    queryFn: () => getBooks(filters),
  });

  const authorsQuery = useQuery({
    queryKey: queryKeys.authors,
    queryFn: getAuthors,
  });

  const genresQuery = useQuery({
    queryKey: queryKeys.genres,
    queryFn: getGenres,
  });
  return {
    books: booksQuery.data ?? [],
    authors: authorsQuery.data ?? [],
    genres: genresQuery.data ?? [],
    isLoading: booksQuery.isLoading || authorsQuery.isLoading,
    isError: booksQuery.isError || authorsQuery.isError,
    error: booksQuery.error || authorsQuery.error,
  };
};
