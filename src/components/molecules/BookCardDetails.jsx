import { Heart, ShoppingCart } from "lucide-react";
import {
  useAddToCart,
  useGetCart,
  useRemoveFromCart,
} from "../../hooks/useCartData";
import {
  useAddFavorite,
  useGetFavorites,
  useRemoveFavorite,
} from "../../hooks/useFavoritesData";
import ActionButton from "../atoms/ActionButton";
import Card from "../atoms/Card";
import {
  DivContainerBetween,
  DivContainerCenter,
  DivContainerStart,
} from "../atoms/DivContainer";
import BookCover from "./BookCover";
import { ButtonBorderNeutral } from "../atoms/Buttons";

const BookCardDetails = ({ book }) => {
  const { favorites } = useGetFavorites();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();

  const { cart } = useGetCart();
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();

  const isFavoriteFn = (items, id) => items.some((i) => i.id === id);

  const isInCartFn = (items, id) => items.some((i) => i.id === id);

  return (
    book && (
      <>
        <DivContainerStart className="text-center">
          <h2 className="font-bold text-responsive-3xl text-amber-400 leading-8">
            {book.title}
          </h2>

          <p>
            <span className="font-semibold">
              {book.authors
                .map((a) => `${a.name} ${a.lastname || ""}`.trim())
                .join(", ")}
            </span>
          </p>

          <p className="text-responsive-xs text-neutral-400">
            {book.genres.map((g) => `${g.name}`.trim()).join(", ")}
          </p>
        </DivContainerStart>

        <Card className="text-neutral-400 my-2 lg:flex-row lg:p-3 lg:h-full">
          <Card.Header className="flex-2 relative lg:border-b-0 lg:border-r">
            <div className="max-w-50">
              <BookCover book={book} variant={"details"} />
            </div>
            <div className="absolute top-3 lg:top-0 right-3 lg:left-0 lg:w-7">
              <ActionButton
                itemId={book.id}
                items={favorites}
                addMutation={addFavorite}
                removeMutation={removeFavorite}
                isInListFn={isFavoriteFn}
                icons={{
                  toggle: (isActive, isLoading) => (
                    <Heart
                      className={`stroke-[1.5] transition-all ${
                        isActive
                          ? "fill-rose-500/50 text-rose-500 stroke-0 duration-300 active:scale-150"
                          : "text-neutral-500"
                      } ${isLoading && "pointer-events-none"}`}
                    />
                  ),
                }}
              />
            </div>
          </Card.Header>

          <Card.Content className="flex-12 lg:flex-6 text-responsive-sm overflow-y-scroll">
            <span className="underline">Sobre este libro:</span> {book.details}
          </Card.Content>
        </Card>
        <DivContainerCenter className="w-full my-2 font-semibold text-responsive-lg">
          <ActionButton
            itemId={book.id}
            items={cart}
            addMutation={addToCart}
            removeMutation={removeFromCart}
            isInListFn={isInCartFn}
            icons={{
              toggle: (isActive, isLoading) => (
                <p
                  className={`flex items-center justify-center w-full border rounded p-1 gap-1 transition-all ${
                    isActive
                      ? "text-emerald-400/90 border-emerald-400/90 bg-emerald-400/10 duration-300 active:scale-105"
                      : "text-neutral-500 border-neutral-400/90"
                  } ${isLoading && "pointer-events-none"}`}
                >
                  <ShoppingCart className="size-5" />{" "}
                  {isActive ? "EN EL CARRITO" : "AGREGAR AL CARRITO"}
                </p>
              ),
            }}
          />
        </DivContainerCenter>
        <DivContainerBetween className="text-neutral-400">
          <ButtonBorderNeutral className="text-responsive-sm px-2 pointer-events-none">
            En stock: {book.stock}
          </ButtonBorderNeutral>
          <p className="text-responsive-sm flex flex-col items-end justify-center leading-3">
            Precio:{" "}
            <span className="text-responsive-2xl font-bold text-emerald-400">
              $ {book.price}
            </span>
          </p>
        </DivContainerBetween>
      </>
    )
  );
};

export default BookCardDetails;
