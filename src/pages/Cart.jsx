import { useCart } from "../hooks/useCart";
import CartList from "../components/molecules/CartList";
import ListPage from "../components/molecules/ListPage";

import { useApiData } from "../hooks/useApiData";
import ErrorPage from "../components/atoms/ErrorPage";

const CartPage = () => {
  const { data: list = [] } = useCart();

  const { books, isLoading, isError } = useApiData({
    ids: list.map((item) => item.id),
  });

  if (isError) return <ErrorPage />;

  const total = list.reduce((acc, item) => {
    const book = books.find((b) => b.id === item.id);
    return acc + (book?.price || 0) * item.quantity;
  }, 0);

  return (
    <ListPage
      total={total}
      books={books}
      isLoading={isLoading}
      title="Mi Carrito"
      emptyMessage="Carrito vacío..."
      useHook={useCart}
      ItemComponent={CartList}
    />
  );
};

export default CartPage;
