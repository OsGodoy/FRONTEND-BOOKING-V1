import ErrorPage from "../components/atoms/ErrorPage";
import FavoritesList from "../components/molecules/FavoritesList";
import ListPage from "../components/molecules/ListPage";
import { useApiData } from "../hooks/useApiData";
import { useFavorites } from "../hooks/useFavorites";

const FavoritesPage = () => {
  const { data: list = [] } = useFavorites();

  const { books, isLoading, isError } = useApiData({
    ids: list.map((item) => item.id),
  });

  if (isError) return <ErrorPage />;

  return (
    <ListPage
      books={books}
      isLoading={isLoading}
      title="Mis Favoritos"
      variant="favorites"
      emptyMessage="Aún no tienes favoritos..."
      useHook={useFavorites}
      ItemComponent={FavoritesList}
    />
  );
};

export default FavoritesPage;
