import { DivContainerCenter, DivContainerStart } from "../atoms/DivContainer";
import ActionButton from "../atoms/ActionButton";
import {
  useAddToCart,
  useCart,
  useDecreaseCartItem,
  useRemoveFromCart,
} from "../../hooks/useCart";
import { Trash } from "lucide-react";
import { ButtonCart } from "../atoms/Buttons";

const CartList = ({ book }) => {
  const { data: cart = [] } = useCart();
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const isInCartFn = (items, id) => items.some((i) => i.id === id);

  const decreaseFromCart = useDecreaseCartItem();

  const cartItem = cart.find((item) => item.id === book.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <>
      <DivContainerCenter className="flex-1">
        <ActionButton
          itemId={book.id}
          items={cart}
          addMutation={addToCart}
          removeMutation={removeFromCart}
          variant="remove"
          isInListFn={isInCartFn}
          icons={{
            remove: <Trash className="stroke-1 text-neutral-400" />,
          }}
        />
      </DivContainerCenter>
      <DivContainerCenter className="flex-4 flex-row border-l border-neutral-800 px-4">
        <DivContainerStart>
          <h2 className="text-amber-400 font-semibold">{book.title}</h2>
          <p className="text-xs">
            {book.authors
              .map((author) => `${author.name} ${author.lastname || ""}`.trim())
              .join(", ")}
          </p>
        </DivContainerStart>
      </DivContainerCenter>
      <DivContainerCenter className="flex-row pr-2">
        <ButtonCart
          disabled={quantity === 1}
          onClick={() => decreaseFromCart.mutate(book.id)}
          className={`${quantity === 1 && "opacity-50"}
            `}
        >
          -
        </ButtonCart>
        <span className="w-8 flex items-center justify-center text-emerald-400">
          {quantity}
        </span>
        <ButtonCart onClick={() => addToCart.mutate(book.id)}>+</ButtonCart>
      </DivContainerCenter>
    </>
  );
};

export default CartList;
