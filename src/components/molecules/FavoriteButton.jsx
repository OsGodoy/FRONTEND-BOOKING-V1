// src/components/FavoriteButton.jsx
import { Heart } from "lucide-react";
import {
  useFavorites,
  useAddFavorite,
  useRemoveFavorite,
} from "../../hooks/useFavorites";

const FavoriteButton = ({ bookId }) => {
  const { data: favorites = [] } = useFavorites();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const isFavorite = favorites.some((fav) => fav.id === bookId);

  const handleClick = () => {
    if (isFavorite) {
      removeFavorite.mutate(bookId);
    } else {
      addFavorite.mutate(bookId);
    }
  };

  return (
    <button onClick={handleClick}>
      <Heart
        className={`stroke-[1.5] transition-all ${
          isFavorite
            ? "fill-rose-500/50 text-rose-500 stroke-0 duration-300 active:scale-150"
            : "text-neutral-500"
        }`}
      />
    </button>
  );
};

export default FavoriteButton;
