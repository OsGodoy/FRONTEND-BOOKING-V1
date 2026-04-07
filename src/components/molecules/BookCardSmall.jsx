import { ButtonBorderPurple } from "../atoms/Buttons";
import Card from "../atoms/Card";
import { Link } from "react-router-dom";
import BookCover from "./BookCover";

const BookCardSmall = ({ book }) => {
  return (
    book && (
      <Card className="text-neutral-400" variant="carousel">
        <Link to={`/books/${book.id}`} className="w-full">
          <Card.Header className="relative">
            <BookCover book={book} variant="carousel" />
          </Card.Header>
        </Link>

        <Card.Content>
          <h2 className="font-semibold text-amber-400 truncate">
            {book.title}
          </h2>

          <p className="text-responsive-xs truncate">
            {book.authors
              .map((author) => `${author.name} ${author.lastname || ""}`.trim())
              .join(", ")}
          </p>
        </Card.Content>

        <Card.Footer className="justify-center">
          <Link to={`/books/${book.id}`}>
            <ButtonBorderPurple className="text-responsive-xs p-2 px-4">
              Ver detalles
            </ButtonBorderPurple>
          </Link>
        </Card.Footer>
      </Card>
    )
  );
};

export default BookCardSmall;
