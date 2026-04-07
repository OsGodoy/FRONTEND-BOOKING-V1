import { useCart, useClearCart } from "../hooks/useCart";
import CartList from "../components/molecules/CartList";
import ListPage from "../components/molecules/ListPage";

import { useApiData } from "../hooks/useApiData";
import ErrorPage from "../components/atoms/ErrorPage";
import { DivContainerCenter } from "../components/atoms/DivContainer";

const CartPage = () => {
  const { data: list = [] } = useCart();

  const { mutate: clearCart, isPending } = useClearCart();

  const { books, isLoading, isError } = useApiData({
    ids: list.map((item) => item.id),
  });

  if (isError) return <ErrorPage />;

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
        isLoading={isLoading}
        title="Mi Carrito"
        emptyMessage="Carrito vacío..."
        ItemComponent={CartList}
        list={list}
      />
    </DivContainerCenter>
  );
};

export default CartPage;
