import { ButtonBorderPurple } from "../atoms/Buttons";
import Card from "../atoms/Card";
import { Link } from "react-router-dom";
import BookCover from "./BookCover";
import ActionButton from "../atoms/ActionButton";
import { Heart, ShoppingCart, Trash } from "lucide-react";
import {
  useAddFavorite,
  useFavorites,
  useRemoveFavorite,
} from "../../hooks/useFavorites";
import { useAddToCart, useCart, useRemoveFromCart } from "../../hooks/useCart";

const BookCard = ({ book }) => {
  const { data: favorites = [] } = useFavorites();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const { data: cart = [] } = useCart();
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();

  const isFavoriteFn = (items, id) => items.some((i) => i.id === id);

  const isInCartFn = (items, id) => items.some((i) => i.id === id);

  return (
    book && (
      <Card className="text-neutral-400">
        <Card.Header className="relative">
          <BookCover book={book} />

          {/* CART BUTTON */}
          <div className="absolute top-3 left-3">
            <ActionButton
              itemId={book.id}
              items={cart}
              addMutation={addToCart}
              removeMutation={removeFromCart}
              isInListFn={isInCartFn}
              icons={{
                remove: <Trash className="stroke-1 text-neutral-400" />,
                toggle: (isActive, isLoading) => (
                  <ShoppingCart
                    className={`stroke-[1.5] transition-all ${
                      isActive
                        ? "fill-emerald-500/50 text-emerald-500 stroke-0 duration-300 active:scale-150"
                        : "text-neutral-500"
                    } ${isLoading ? "opacity-50" : ""}`}
                  />
                ),
              }}
            />
          </div>

          {/* FAVORITES BUTTON */}
          <div className="absolute top-3 right-3">
            <ActionButton
              itemId={book.id}
              items={favorites}
              addMutation={addFavorite}
              removeMutation={removeFavorite}
              isInListFn={isFavoriteFn}
              icons={{
                remove: <Trash className="stroke-1 text-neutral-400" />,
                toggle: (isActive, isLoading) => (
                  <Heart
                    className={`stroke-[1.5] transition-all ${
                      isActive
                        ? "fill-rose-500/50 text-rose-500 stroke-0 duration-300 active:scale-150"
                        : "text-neutral-500"
                    } ${isLoading ? "opacity-50" : ""}`}
                  />
                ),
              }}
            />
          </div>
        </Card.Header>

        <Card.Content>
          <h2 className="font-bold text-xl text-amber-400">{book.title}</h2>

          <p>
            <span className="font-semibold">
              {book.authors
                .map((author) =>
                  `${author.name} ${author.lastname || ""}`.trim(),
                )
                .join(", ")}
            </span>
          </p>

          <div className="text-sm">
            <p>{book.genres.map((genre) => genre.name).join(", ")}</p>
            <p className="text-neutral-500">En stock: {book.stock}</p>
          </div>
        </Card.Content>

        <Card.Footer className="flex-row items-center justify-between">
          <Link to={`/books/${book.id}`}>
            <ButtonBorderPurple className="text-sm p-3 px-8">
              Ver detalles
            </ButtonBorderPurple>
          </Link>

          <p className="text-sm flex flex-col items-end justify-center leading-4">
            Precio:{" "}
            <span className="text-lg font-bold text-emerald-400">
              $ {book.price}
            </span>
          </p>
        </Card.Footer>
      </Card>
    )
  );
};

export default BookCard;
