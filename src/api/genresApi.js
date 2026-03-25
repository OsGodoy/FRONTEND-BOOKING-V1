import api from "./axios";

export const getGenres = async () => {
  const { data } = await api.get("/genres");
  return data.data.genres;
};
