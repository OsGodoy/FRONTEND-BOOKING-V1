import { useGetCart, useClearCart } from "../hooks/useCartData";
import CartList from "../components/molecules/CartList";
import ListPage from "../components/molecules/ListPage";

import { useBooksData } from "../hooks/useBooksData";
import ErrorPage from "../components/atoms/ErrorPage";
import { DivContainerCenter } from "../components/atoms/DivContainer";

const CartPage = () => {
  const { cart: list } = useGetCart();

  const { mutate: clearCart, isPending } = useClearCart();

  const { books, isBooksLoading, isBooksError } = useBooksData({
    ids: list.map((item) => item.id),
  });

  if (isBooksError) return <ErrorPage />;

  const total = list.reduce((acc, item) => {
    const book = books.find((b) => b.id === item.id);
    return acc + (book?.price || 0) * item.quantity;
  }, 0);

  return (
    <DivContainerCenter className="h-full pt-2 px-4">
      <ListPage
        clearCart={clearCart}
        total={total}
        books={books}
        isBooksLoading={isBooksLoading}
        title="Mi Carrito"
        emptyMessage="Carrito vacío..."
        ItemComponent={CartList}
        list={list}
      />
    </DivContainerCenter>
  );
};

export default CartPage;
