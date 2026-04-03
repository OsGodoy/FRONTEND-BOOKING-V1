import {
  DivContainerCenter,
  DivContainerModal,
} from "../components/atoms/DivContainer";
import Loading from "../components/atoms/Loading";
import ErrorPage from "../components/atoms/ErrorPage";
import { useApiData } from "../hooks/useApiData";
import {
  LiContainer,
  UlContainerCenter,
} from "../components/atoms/UlContainer";
import { useFavorites } from "../hooks/useFavorites";
import { ButtonBorderAmber } from "../components/atoms/Buttons";
import { Link } from "react-router-dom";
import FavoritesList from "../components/molecules/FavoritesList";

const FavoritesPage = () => {
  const { data: favorites = [] } = useFavorites();
  const { books, isLoading, isError } = useApiData({
    ids: favorites.map((f) => f.id),
  });

  if (isError) return <ErrorPage />;

  return (
    <DivContainerCenter className="min-h-full">
      <DivContainerModal className="text-sm font-semibold w-full p-2 mb-2 text-neutral-400">
        Mis Favoritos
      </DivContainerModal>
      <DivContainerModal className="h-full p-2">
        {isLoading ? (
          <Loading />
        ) : (
          <UlContainerCenter className="text-neutral-400 w-full h-full justify-start">
            {favorites.length === 0 ? (
              <DivContainerCenter className="text-neutral-400 text-sm">
                Aún no tienes favoritos...
                <Link to="/">
                  <ButtonBorderAmber className="mt-2 p-2">
                    Seguir explorando
                  </ButtonBorderAmber>
                </Link>
              </DivContainerCenter>
            ) : (
              <>
                {books.map((book) => (
                  <LiContainer
                    key={book.id}
                    className="border-t first:border-t-0 border-neutral-800 px-0 py-2 flex justify-start"
                  >
                    <FavoritesList book={book} />
                  </LiContainer>
                ))}
              </>
            )}
          </UlContainerCenter>
        )}
      </DivContainerModal>
    </DivContainerCenter>
  );
};

export default FavoritesPage;
