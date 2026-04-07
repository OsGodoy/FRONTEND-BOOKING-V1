const CART_KEY = "cart";

export const getLocalCart = () => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const addLocalCartItem = (bookId) => {
  const cart = getLocalCart();

  const existing = cart.find((item) => item.id === bookId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: bookId, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const decreaseLocalCartItem = (bookId) => {
  let cart = getLocalCart();

  cart = cart
    .map((item) =>
      item.id === bookId ? { ...item, quantity: item.quantity - 1 } : item,
    )
    .filter((item) => item.quantity > 0);

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const removeLocalCartItem = (bookId) => {
  const cart = getLocalCart().filter((item) => item.id !== bookId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearLocalCart = () => {
  localStorage.removeItem(CART_KEY);
};
