export const getLocalFavorites = () => {
  const data = localStorage.getItem("favorites");
  return data ? JSON.parse(data) : [];
};

export const addLocalFavorite = (bookId) => {
  const favorites = getLocalFavorites();

  if (!favorites.includes(bookId)) {
    favorites.push(bookId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const removeLocalFavorite = (bookId) => {
  const favorites = getLocalFavorites().filter((id) => id !== bookId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};
