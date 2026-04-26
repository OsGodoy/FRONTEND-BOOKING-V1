import { useGetData } from "../hooks/useQueryBase";
import { queryKeys } from "../constants/queryKeys";
import { getBooks } from "../api/booksApi";
import { getAuthors } from "../api/authorsApi";
import { getGenres } from "../api/genresApi";

export const useBooksData = (filters = {}) => {
  const { data, isLoading, isError, error, isFetching, refetch } = useGetData(
    queryKeys.books,
    getBooks,
    filters,
  );

  return {
    books: data,
    isBooksLoading: isLoading,
    isBooksError: isError,
    booksError: error,
    isBooksFetching: isFetching,
    refetchBooks: refetch,
  };
};

export const useAuthorsData = () => {
  const { data, isLoading, isError, error } = useGetData(
    queryKeys.authors,
    getAuthors,
  );

  return {
    authors: data,
    isAuthorsLoading: isLoading,
    isAuthorsError: isError,
    authorsError: error,
  };
};

export const useGenresData = () => {
  const { data, isLoading, isError, error } = useGetData(
    queryKeys.genres,
    getGenres,
  );

  return {
    genres: data,
    isGenresLoading: isLoading,
    isGenresError: isError,
    genresError: error,
  };
};
