export const queryKeys = {
  auth: ["authUser"],

  books: (filters) => ["books", filters],
  book: (id) => ["book", id],
  authors: ["authors"],
  genres: ["genres"],

  cart: (user) => ["cart", user?.id],
  favorites: (user) => ["favorites", user?.id],
};
