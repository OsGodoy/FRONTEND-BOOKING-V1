import { DivContainerCenter, DivContainerStart } from "../atoms/DivContainer";
import {
  useAddFavorite,
  useFavorites,
  useRemoveFavorite,
} from "../../hooks/useFavorites";
import { Trash } from "lucide-react";
import ActionButton from "../atoms/ActionButton";

const FavoritesList = ({ book }) => {
  const { data: favorites = [] } = useFavorites();
  const addToFavorites = useAddFavorite();
  const removeFromFavorites = useRemoveFavorite();
  const isInFavoritesFn = (items, id) => items.some((i) => i.id === id);

  return (
    <>
      <DivContainerCenter>
        <ActionButton
          itemId={book.id}
          items={favorites}
          addMutation={addToFavorites}
          removeMutation={removeFromFavorites}
          variant="remove"
          isInListFn={isInFavoritesFn}
          icons={{
            remove: <Trash className="stroke-1 text-neutral-400" />,
          }}
        />
      </DivContainerCenter>
      <DivContainerStart className="flex-6 border-l border-neutral-800 pl-4">
        <h2 className="text-amber-400 font-semibold">{book.title}</h2>
        <p className="text-xs">
          {book.authors
            .map((author) => `${author.name} ${author.lastname || ""}`.trim())
            .join(", ")}
        </p>
      </DivContainerStart>
    </>
  );
};

export default FavoritesList;
