import { Link, useParams } from "react-router-dom";
import Loading from "../atoms/Loading";
import ErrorPage from "../atoms/ErrorPage";
import { useBookData } from "../../hooks/useBookData";
import { DivContainerCenter } from "../atoms/DivContainer";
import BookCardDetails from "./BookCardDetails";
import { ButtonBorderNeutral } from "../atoms/Buttons";
import { ChevronsLeft } from "lucide-react";

const BookDetails = () => {
  const { id } = useParams();
  const { book, isLoading, isError } = useBookData(id);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;

  if (!book) return <p className="text-amber-400">Libro no encontrado...</p>;

  return (
    <DivContainerCenter className="text-white">
      <Link to="/" className="text-xs mb-2 w-full">
        <ButtonBorderNeutral className="flex items-center justify-center ">
          <span>
            <ChevronsLeft className="size-4" />
          </span>
          Volver a la página de inicio
        </ButtonBorderNeutral>
      </Link>
      <div className="flex flex-col items-center justify-center w-full max-w-80">
        <BookCardDetails book={book} />
      </div>
    </DivContainerCenter>
  );
};

export default BookDetails;
