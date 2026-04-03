import { useState } from "react";
import { DivContainerCenter, DivContainerStart } from "../atoms/DivContainer";
import FavoriteButton from "../molecules/FavoriteButton";

const FavoritesList = ({ book }) => {
  const [removingId, setRemovingId] = useState(null);

  return (
    <>
      <DivContainerCenter>
        <FavoriteButton
          bookId={book.id}
          variant="remove"
          onRemoveStart={() => setRemovingId(book.id)}
          onRemoveEnd={() => setRemovingId(null)}
        />
      </DivContainerCenter>
      <DivContainerStart className="flex-6 border-l border-neutral-800 pl-4">
        <h2 className="text-amber-400 font-semibold">{book.title}</h2>
        <p className="text-xs">
          {book.authors
            .map((author) => `${author.name} ${author.lastname || ""}`.trim())
            .join(", ")}
        </p>
      </DivContainerStart>
    </>
  );
};

export default FavoritesList;
