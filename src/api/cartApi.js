import api from "./axios";

const normalizeCart = (data) =>
  data.map((item) => ({
    id: item.book_id,
    quantity: item.quantity,
    title: item.title,
    price: Number(item.current_price),
  }));

export const getCart = async () => {
  const { data } = await api.get("/cart");
  return normalizeCart(data?.items ?? []);
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
