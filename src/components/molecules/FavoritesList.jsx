import {
  DivContainerCenter,
  DivContainerModal,
  DivContainerStart,
} from "../atoms/DivContainer";
import { useAddFavorite, useRemoveFavorite } from "../../hooks/useFavorites";
import { ShoppingCart, Trash } from "lucide-react";
import ActionButton from "../atoms/ActionButton";
import { useAddToCart, useRemoveFromCart } from "../../hooks/useCart";
import BookCover from "./BookCover";
import { Link } from "react-router-dom";

const FavoritesList = ({ book, list, cart }) => {
  const addToFavorites = useAddFavorite();
  const removeFromFavorites = useRemoveFavorite();
  const isInFavoritesFn = (items, id) => items.some((i) => i.id === id);

  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const isInCartFn = (items, id) => items.some((i) => i.id === id);

  return (
    <>
      <DivContainerModal className="flex-row p-2 lg:p-4 gap-2 rounded-lg lg:grid lg:grid-cols-2">
        <DivContainerCenter className="relative h-full flex-1">
          <DivContainerCenter className="hidden lg:flex">
            <Link to={`/books/${book.id}`}>
              <BookCover book={book} variant={"cart"} />
            </Link>
          </DivContainerCenter>
          <div className="lg:absolute top-0 left-0">
            <ActionButton
              itemId={book.id}
              items={list}
              addMutation={addToFavorites}
              removeMutation={removeFromFavorites}
              variant="remove"
              isInListFn={isInFavoritesFn}
              icons={{
                remove: <Trash className="stroke-1 text-neutral-400" />,
              }}
            />
          </div>
        </DivContainerCenter>
        <DivContainerCenter className="lg:relative flex-4 flex-row lg:h-full border-l lg:border lg:rounded-md border-neutral-800 p-4">
          <DivContainerStart className="lg:h-full">
            <Link to={`/books/${book.id}`}>
              <h2 className="text-amber-400 font-semibold lg:text-lg hover:underline">
                {book.title}
              </h2>
            </Link>
            <p className="text-responsive-xs">
              {book.authors
                .map((author) =>
                  `${author.name} ${author.lastname || ""}`.trim(),
                )
                .join(", ")}
            </p>
            <DivContainerStart className="hidden lg:block text-responsive-xs text-neutral-500 mb-2">
              <p>{book.genres.map((genre) => genre.name).join(", ")}</p>
            </DivContainerStart>
            <div className="hidden w-full lg:flex flex-col h-30 p-2 text-responsive-xs overflow-y-scroll border border-neutral-800 rounded">
              <span className="underline">Sobre este libro:</span>{" "}
              {book.details}
            </div>
          </DivContainerStart>
          <DivContainerCenter className="lg:absolute top-2 right-2 max-w-8 pl-2 lg:p-0">
            <ActionButton
              itemId={book.id}
              items={cart}
              addMutation={addToCart}
              removeMutation={removeFromCart}
              isInListFn={isInCartFn}
              icons={{
                toggle: (isActive, isLoading) => (
                  <ShoppingCart
                    className={`stroke-[1.5] transition-all ${
                      isActive
                        ? "fill-emerald-500/50 text-emerald-500 stroke-0 duration-300 active:scale-150"
                        : "text-neutral-500"
                    } ${isLoading && "pointer-events-none"}`}
                  />
                ),
              }}
            />
          </DivContainerCenter>
        </DivContainerCenter>
      </DivContainerModal>
    </>
  );
};

export default FavoritesList;
