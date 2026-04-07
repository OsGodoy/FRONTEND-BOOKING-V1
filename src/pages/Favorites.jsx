import { DivContainerCenter } from "../components/atoms/DivContainer";
import ErrorPage from "../components/atoms/ErrorPage";
import FavoritesList from "../components/molecules/FavoritesList";
import ListPage from "../components/molecules/ListPage";
import { useApiData } from "../hooks/useApiData";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";

const FavoritesPage = () => {
  const { data: list = [] } = useFavorites();
  const { data: cart = [] } = useCart();

  const { books, isLoading, isError } = useApiData({
    ids: list.map((item) => item.id),
  });

  if (isError) return <ErrorPage />;

  return (
    <DivContainerCenter className="h-full pt-2 px-4">
      <ListPage
        books={books}
        isLoading={isLoading}
        title="Mis Favoritos"
        variant="favorites"
        emptyMessage="Aún no tienes favoritos..."
        ItemComponent={FavoritesList}
        list={list}
        cart={cart}
      />
    </DivContainerCenter>
  );
};

export default FavoritesPage;
