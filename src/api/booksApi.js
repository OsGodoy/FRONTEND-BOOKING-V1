import api from "./axios";

export const getBooks = async () => {
  const { data } = await api.get("/books");
  return data.data.books;
};

export const createBook = async (book) => {
  const { data } = await api.post("/books", book);
  return data.data.books;
};
