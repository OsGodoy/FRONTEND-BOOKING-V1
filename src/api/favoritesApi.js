import { deleteData, getData, postData } from "./apiFactory";
import api from "./axios";

export const getFavorites = async () => {
  const data = await getData("/favorites");
  const items = data?.items ?? data ?? [];
  return normalizeFavs(items);
};

export const addFavorite = async (bookId) => {
  return await postData(`/favorites/${bookId}`);
};

export const removeFavorite = async (bookId) => {
  return await deleteData(`/favorites/${bookId}`);
};
