import { Link, useParams } from "react-router-dom";
import Loading from "../atoms/Loading";
import ErrorPage from "../atoms/ErrorPage";
import { useBookData } from "../../hooks/useBookData";
import { DivContainerCenter } from "../atoms/DivContainer";
import BookCardDetails from "./BookCardDetails";
import { ButtonBorderPurple } from "../atoms/Buttons";
import { ChevronsLeft } from "lucide-react";
import { useApiData } from "../../hooks/useApiData";
import Carousel from "./Carousel";
import BookCardSmall from "./BookCardSmall";
import HorizontalBookList from "./HorizontalBookList";

const BookDetails = () => {
  const { id } = useParams();
  const { book, isLoading, isError } = useBookData(id);

  const { books = [] } = useApiData();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center h-full">
        <ErrorPage />
      </div>
    );

  if (!book)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-amber-400">Libro no encontrado...</p>
      </div>
    );

  return (
    <DivContainerCenter className="text-white max-w-360 px-4">
      <Link
        to="/"
        className="text-responsive-xs mb-6 mt-2 sticky top-18 z-40 bg-neutral-950 self-start rounded shadow-lg shadow-neutral-950"
      >
        <ButtonBorderPurple className="flex items-center justify-center">
          <span>
            <ChevronsLeft className="size-4" />
          </span>
          Volver a la página de inicio
        </ButtonBorderPurple>
      </Link>
      <div className="flex flex-col items-center justify-center w-full max-w-80 md:max-w-100 lg:max-w-160">
        <BookCardDetails book={book} />
      </div>
      <Carousel title="También te puede interesar" className="xl:hidden">
        {books
          .filter((b) => b.id !== book.id)
          .slice(0, 8)
          .map((b) => (
            <div key={b.id} className="min-w-50 max-w-50">
              <BookCardSmall book={b} />
            </div>
          ))}
      </Carousel>
      <HorizontalBookList
        title="También te puede interesar"
        className="hidden xl:flex"
      >
        {books
          .filter((b) => b.id !== book.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 5)
          .map((b) => (
            <div key={b.id} className="min-w-50 max-w-50">
              <BookCardSmall book={b} />
            </div>
          ))}
      </HorizontalBookList>
    </DivContainerCenter>
  );
};

export default BookDetails;
