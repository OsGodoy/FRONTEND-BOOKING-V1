import { Link } from "react-router-dom";
import { ButtonBorderAmber } from "../../components/atoms/Buttons";
import {
  DivContainerCenter,
  DivContainerModal,
} from "../../components/atoms/DivContainer";
import Loading from "../../components/atoms/Loading";
import {
  LiContainer,
  UlContainerCenter,
} from "../../components/atoms/UlContainer";
import { Loader } from "lucide-react";

const ListPage = ({
  title,
  emptyMessage,
  useHook,
  ItemComponent,
  variant = "cart",
  books,
  isLoading,
  total,
}) => {
  const { data: list = [] } = useHook();

  return (
    <DivContainerCenter>
      <DivContainerModal className="text-sm font-semibold w-full p-2 mb-2 text-neutral-400">
        {title}
      </DivContainerModal>

      <DivContainerModal className="h-full p-2 flex-col">
        {isLoading ? (
          <Loading />
        ) : (
          <UlContainerCenter className="text-neutral-400 w-full h-full justify-start">
            {list.length === 0 ? (
              <DivContainerCenter className="text-neutral-400 text-sm">
                {emptyMessage}
                <Link to="/">
                  <ButtonBorderAmber className="mt-2 p-2">
                    Seguir explorando
                  </ButtonBorderAmber>
                </Link>
              </DivContainerCenter>
            ) : (
              books?.map((book) => (
                <LiContainer
                  key={book.id}
                  className="border-t first:border-t-0 border-neutral-800 px-0 py-2 flex justify-start"
                >
                  <ItemComponent book={book} />
                </LiContainer>
              ))
            )}
          </UlContainerCenter>
        )}
      </DivContainerModal>
      {variant === "cart" && (
        <DivContainerModal className="font-semibold w-full p-2 mt-2 border-emerald-500 text-emerald-400">
          {isLoading ? (
            <Loader className="animate-spin [animation-duration:2s]" />
          ) : (
            <p>Total: {total}</p>
          )}
        </DivContainerModal>
      )}
    </DivContainerCenter>
  );
};

export default ListPage;
