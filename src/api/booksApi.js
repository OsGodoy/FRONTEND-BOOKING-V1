import {
  getData,
  getDataById,
  postData,
  putData,
  deleteData,
} from "./apiFactory";

export const getBooks = async (filters = {}) => {
  const params = {
    ...filters,
    ids: filters.ids?.length ? filters.ids.join(",") : undefined,
  };

  return await getData("/books", params);
};

export const getBookById = async (id) => {
  return await getDataById("/books", id);
};

export const createBook = async (book) => {
  return await postData("/books", book);
};

export const updateBook = async (id, book) => {
  return await putData(`/books/${id}`, book);
};

export const deleteBook = async (id) => {
  return await deleteData(`/books/${id}`);
};

export const autoSaveBook = async (book) => {
  return await postData("/books", book, false); // El 'false' apaga el Sonner
};
