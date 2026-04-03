import api from "./axios";

export const getBooks = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.author) params.append("author", filters.author);
  if (filters.genre) params.append("genre", filters.genre);
  if (filters.search) params.append("search", filters.search);

  if (filters.ids?.length) {
    params.append("ids", filters.ids.join(","));
  }

  const { data } = await api.get(`/books?${params.toString()}`);

  return data.data.books;
};

export const getBookById = async (id) => {
  const { data } = await api.get(`/books/${id}`);
  return data.data.book;
};

export const createBook = async (book) => {
  const { data } = await api.post("/books", book);
  return data.data.books;
};
