import api from "./axios";

export const getFavorites = async () => {
  const { data } = await api.get("/favorites");
  return data.data;
};

export const addFavorite = async (bookId) => {
  const { data } = await api.post(`/favorites/${bookId}`);
  return data.data;
};

export const removeFavorite = async (bookId) => {
  const { data } = await api.delete(`/favorites/${bookId}`);
  return data.data;
};
