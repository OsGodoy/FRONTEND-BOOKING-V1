import { ButtonBorderEmerald } from "../atoms/Buttons";
import Card from "../atoms/Card";
import { DivContainerBetween, DivContainerCenter } from "../atoms/DivContainer";
import { ImageOff } from "lucide-react";
import BookCover from "./BookCover";
import FavoriteButton from "./FavoriteButton";

const BookCardDetails = ({ book }) => {
  return (
    book && (
      <>
        <DivContainerCenter className="text-center">
          <h2 className="font-bold text-3xl text-amber-400 leading-8">
            {book.title}
          </h2>

          <p>
            <span className="text-xs">Autor: </span>
            <span className="font-semibold">
              {book.authors
                .map((a) => `${a.name} ${a.lastname || ""}`.trim())
                .join(", ")}
            </span>
          </p>

          <p className="text-xs text-neutral-400">
            {book.genres.map((g) => `${g.name}`.trim()).join(", ")}
          </p>
        </DivContainerCenter>

        <Card className="text-neutral-400 my-2">
          <Card.Header className="flex-2 relative">
            <BookCover book={book} />
            <div className="absolute top-3 right-3">
              <FavoriteButton bookId={book.id} />
            </div>
          </Card.Header>

          <Card.Content className="flex-12 text-sm overflow-y-scroll">
            <span className="underline">Sobre este libro:</span> {book.details}
          </Card.Content>
        </Card>
        <DivContainerBetween className="text-neutral-400">
          <p>En stock: {book.stock}</p>
          <p className="text-sm flex flex-col items-end justify-center leading-3">
            Precio:{" "}
            <span className="text-2xl font-bold text-emerald-400">
              $ {book.price}
            </span>
          </p>
        </DivContainerBetween>
        <ButtonBorderEmerald className="w-full my-2 font-semibold text-xl">
          COMPRAR
        </ButtonBorderEmerald>
      </>
    )
  );
};

export default BookCardDetails;
