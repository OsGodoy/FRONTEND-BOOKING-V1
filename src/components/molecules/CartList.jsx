import {
  DivContainerCenter,
  DivContainerModal,
  DivContainerStart,
} from "../atoms/DivContainer";
import ActionButton from "../atoms/ActionButton";
import {
  useAddToCart,
  useDecreaseCartItem,
  useRemoveFromCart,
} from "../../hooks/useCart";
import { Trash } from "lucide-react";
import { ButtonCart } from "../atoms/Buttons";
import BookCover from "./BookCover";
import { Link } from "react-router-dom";

const CartList = ({ book, list }) => {
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const isInCartFn = (items, id) => items.some((i) => i.id === id);

  const decreaseFromCart = useDecreaseCartItem();

  const cartItem = list.find((item) => item.id === book.id);
  const quantity = cartItem?.quantity || 0;

  const bookTotal = book.price * quantity;

  return (
    <>
      <DivContainerModal className="flex-row p-2 lg:p-4 gap-2 rounded-lg lg:grid lg:grid-cols-2">
        <DivContainerCenter className="relative flex-1">
          <DivContainerCenter className="hidden lg:flex">
            <Link to={`/books/${book.id}`}>
              <BookCover book={book} variant={"cart"} />
            </Link>
          </DivContainerCenter>
          <div className="lg:absolute top-0 left-0">
            <ActionButton
              itemId={book.id}
              items={list}
              addMutation={addToCart}
              removeMutation={removeFromCart}
              variant="remove"
              isInListFn={isInCartFn}
              icons={{
                remove: <Trash className="stroke-1 text-neutral-400" />,
              }}
            />
          </div>
        </DivContainerCenter>
        <DivContainerCenter className="flex-7 lg:h-full">
          <DivContainerCenter className="flex-row flex-1 lg:flex-col">
            <DivContainerCenter className="flex-4 flex-row border-l lg:border lg:rounded border-neutral-800 px-4">
              <DivContainerStart className="lg:py-2 lg:h-full">
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
                <DivContainerStart className="hidden lg:block text-responsive-xs text-neutral-500">
                  <p>{book.genres.map((genre) => genre.name).join(", ")}</p>
                </DivContainerStart>
              </DivContainerStart>
            </DivContainerCenter>
            <DivContainerCenter className="flex-row flex-1 pr-2 lg:pr-4 lg:justify-end lg:my-2">
              <ButtonCart
                disabled={quantity === 1}
                onClick={() => decreaseFromCart.mutate(book.id)}
                className={`${quantity === 1 && "opacity-50 pointer-events-none"}
            `}
              >
                -
              </ButtonCart>
              <span className="w-8 flex items-center justify-center">
                {quantity}
              </span>
              <ButtonCart onClick={() => addToCart.mutate(book.id)}>
                +
              </ButtonCart>
            </DivContainerCenter>
          </DivContainerCenter>
          <DivContainerModal className="justify-end text-responsive-xs py-1 px-2 rounded border-neutral-800 border-2 border-dotted mt-2 lg:m-0 gap-1">
            Precio: $
            <span className="text-base lg:text-lg text-emerald-400">
              {bookTotal}
            </span>
          </DivContainerModal>
        </DivContainerCenter>
      </DivContainerModal>
    </>
  );
};

export default CartList;
