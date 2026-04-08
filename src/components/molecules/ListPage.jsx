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
import { hoverBgFx, scaleFx } from "../../constants/styles";

const ListPage = ({
  list = [],
  cart = [],
  books,
  isLoading,
  title,
  emptyMessage,
  ItemComponent,
  total,
  clearCart,
  variant = "cart",
}) => {
  return (
    <DivContainerCenter className="max-w-100 md:max-w-140 lg:max-w-180 h-full">
      <DivContainerCenter className="flex-row gap-2">
        {variant === "cart" && (
          <DivContainerModal
            className={`flex-1 text-xs w-full p-0 mb-2 text-rose-400 border-rose-400/30 hover:bg-rose-950/30 transition-colors duration-150
          ${list.length === 0 && "opacity-50 pointer-events-none"}
          `}
          >
            <button
              onClick={clearCart}
              className={`w-full h-full p-2 cursor-pointer`}
            >
              <p className="text-responsive-xs">Limpiar</p>
            </button>
          </DivContainerModal>
        )}

        <DivContainerModal className="flex-2 font-semibold w-full p-2 mb-2 text-neutral-400">
          <p className="text-responsive-xs">{title}</p>
        </DivContainerModal>
      </DivContainerCenter>

      <div className="h-full w-full flex flex-col">
        {variant === "cart" && (
          <DivContainerModal className="sticky z-10 top-18 w-full p-2 mb-2 border-emerald-500 text-emerald-300 bg-emerald-950">
            {isLoading ? (
              <Loader className="animate-spin size-7 [animation-duration:2s]" />
            ) : (
              <p>
                Total: ${" "}
                <span className="font-semibold text-responsive-lg">
                  {total}
                </span>
              </p>
            )}
          </DivContainerModal>
        )}
        <DivContainerModal className={`h-full flex-col py-2 px-3`}>
          {isLoading ? (
            <Loading />
          ) : (
            <UlContainerCenter className="text-neutral-400 w-full h-full justify-start">
              {list.length === 0 ? (
                <DivContainerCenter className="text-neutral-400 text-responsive-sm h-full">
                  {emptyMessage}
                  <Link to="/#books-section">
                    <ButtonBorderAmber className="mt-2 p-2">
                      Seguir explorando
                    </ButtonBorderAmber>
                  </Link>
                </DivContainerCenter>
              ) : (
                books?.map((book) => (
                  <LiContainer
                    key={book.id}
                    className={`px-0 py-1 flex justify-start`}
                  >
                    <ItemComponent book={book} list={list} cart={cart} />
                  </LiContainer>
                ))
              )}
            </UlContainerCenter>
          )}
        </DivContainerModal>
      </div>
    </DivContainerCenter>
  );
};

export default ListPage;
