import { ButtonBorderPurple } from "../atoms/Buttons";
import Card from "../atoms/Card";
import { Link } from "react-router-dom";
import BookCover from "./BookCover";

const BookCard = ({ book }) => {
  return (
    book && (
      <Card className="text-neutral-400">
        <Card.Header>
          <BookCover book={book} />
        </Card.Header>

        <Card.Content>
          <h2 className="font-bold text-xl text-amber-400">{book.title}</h2>

          <p>
            <span className="font-semibold">
              {book.authors
                .map((a) => `${a.name} ${a.lastname || ""}`.trim())
                .join(", ")}
            </span>
          </p>
          <div className="text-sm">
            <p>{book.genres.map((g) => `${g.name}`.trim()).join(", ")}</p>
            <p className="text-neutral-500">En stock: {book.stock}</p>
          </div>
        </Card.Content>

        <Card.Footer className="flex-row items-center justify-between">
          <Link to={`/books/${book.id}`}>
            <ButtonBorderPurple className="text-sm p-3 px-8">
              Ver detalles
            </ButtonBorderPurple>
          </Link>
          <p className="text-sm flex flex-col items-end justify-center leading-4">
            Precio:{" "}
            <span className="text-lg font-bold text-emerald-400">
              $ {book.price}
            </span>
          </p>
        </Card.Footer>
      </Card>
    )
  );
};

export default BookCard;
