import { Heart, Trash } from "lucide-react";
import {
  useFavorites,
  useAddFavorite,
  useRemoveFavorite,
} from "../../hooks/useFavoritesData";

const FavoriteButton = ({
  bookId,
  variant = "toggle",
  onRemoveStart,
  onRemoveEnd,
}) => {
  const { favorites } = useFavorites();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const isFavorite = favorites.some((fav) => fav.id === bookId);

  const handleClick = () => {
    if (variant === "remove") {
      onRemoveStart?.();

      if (isFavorite) {
        removeFavorite.mutate(bookId, {
          onSettled: () => {
            onRemoveEnd?.();
          },
        });
      }
      return;
    }

    if (isFavorite) {
      removeFavorite.mutate(bookId);
    } else {
      addFavorite.mutate(bookId);
    }
  };

  return (
    <button onClick={handleClick}>
      {variant === "remove" ? (
        <div>
          <Trash className="stroke-1 text-neutral-400" />
        </div>
      ) : (
        <Heart
          className={`stroke-[1.5] transition-all ${
            isFavorite
              ? "fill-rose-500/50 text-rose-500 stroke-0 duration-300 active:scale-150"
              : "text-neutral-500"
          }`}
        />
      )}
    </button>
  );
};

export default FavoriteButton;
