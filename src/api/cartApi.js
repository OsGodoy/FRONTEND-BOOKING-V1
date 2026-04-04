import api from "./axios";

export const getCart = async () => {
  const { data } = await api.get("/cart");
  return data.data;
};

export const addCartItem = async (bookId) => {
  const { data } = await api.post(`/cart/${bookId}`);
  return data.data;
};

export const decreaseCartItem = async (bookId) => {
  const { data } = await api.patch(`/cart/${bookId}`);
  return data.data;
};

export const removeCartItem = async (bookId) => {
  const { data } = await api.delete(`/cart/${bookId}`);
  return data.data;
};

export const clearCart = async () => {
  const { data } = await api.delete("/cart");
  return data.data;
};
