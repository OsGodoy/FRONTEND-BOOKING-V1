import { getData, postData, patchData, deleteData } from "./apiFactory";

const normalizeCart = (data) =>
  data.map((item) => ({
    id: item.book_id,
    quantity: item.quantity,
    title: item.title,
    price: Number(item.current_price),
  }));

export const getCart = async () => {
  const data = await getData("/cart");
  const items = data?.items ?? data ?? [];
  return normalizeCart(items);
};

export const addCartItem = async (bookId) => {
  return await postData(`/cart/${bookId}`);
};

export const decreaseCartItem = async (bookId) => {
  return await patchData(`/cart/${bookId}`);
};

export const removeCartItem = async (bookId) => {
  return await deleteData(`/cart/${bookId}`);
};

export const clearCart = async () => {
  return await deleteData("/cart");
};
