import { DivContainerCenter } from "../components/atoms/DivContainer";
import ErrorPage from "../components/atoms/ErrorPage";
import FavoritesList from "../components/molecules/FavoritesList";
import ListPage from "../components/molecules/ListPage";
import { useBooksData } from "../hooks/useBooksData";
import { useGetCart } from "../hooks/useCartData";
import { useGetFavorites } from "../hooks/useFavoritesData";

const FavoritesPage = () => {
  const { favorites: list } = useGetFavorites();
  const { cart } = useGetCart();

  const { books, isBooksLoading, isBooksError } = useBooksData({
    ids: list.map((item) => item.id),
  });

  if (isBooksError) return <ErrorPage />;

  return (
    <DivContainerCenter className="h-full pt-2 px-4">
      <ListPage
        books={books}
        isBooksLoading={isBooksLoading}
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
