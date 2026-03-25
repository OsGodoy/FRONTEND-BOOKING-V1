import api from "./axios";

export const getAuthors = async () => {
  const { data } = await api.get("/authors");

  return data.data.authors;
};
