import { useQuery } from "@tanstack/react-query";
import { getBookById } from "../api/booksApi";
import { queryKeys } from "../constants/queryKeys";
import { useGetDataById } from "./useQueryBase";

export const useBookByIdData = (id) => {
  const { data, isLoading, isError, error, isFetching, refetch } =
    useGetDataById(queryKeys.book(id), getBookById, id);

  return {
    book: data,
    isBookLoading: isLoading,
    isBookError: isError,
    bookError: error,
    isBookFetching: isFetching,
    refetchBook: refetch,
  };
};
