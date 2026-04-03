import { Crown, Menu, Search, SquareUserRound } from "lucide-react";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { DivContainerEnd } from "../atoms/DivContainer";
import { useAuth } from "../../hooks/useAuthData";
import { ButtonBorderPurple } from "../atoms/Buttons";
import UserMenu from "./Menus/UserMenu";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { isSidebar, setIsSidebar } = useContext(SidebarContext);

  return (
    <div className="sticky top-0 w-full p-4 mb-4 flex items-center justify-between bg-neutral-900 border-b border-neutral-800 z-40">
      <Link
        to="/"
        className="flex flex-1 items-center justify-start gap-1 text-2xl sm:text-4xl font-bold text-purple-500"
      >
        book's
        <span className="flex items-center text-amber-400">
          king <Crown className="sm:size-8 fill-amber-400" />
        </span>{" "}
      </Link>
      <DivContainerEnd className="flex-row flex-1 gap-3 text-neutral-500">
        {isAuthenticated ? (
          <UserMenu />
        ) : (
          <Link to={"/auth/login"}>
            <ButtonBorderPurple className="text-sm">
              Iniciar Sesión
            </ButtonBorderPurple>
          </Link>
        )}

        <Menu
          onClick={() => {
            setIsSidebar(!isSidebar);
          }}
          className="size-7 stroke-[1.5]"
        />
      </DivContainerEnd>
    </div>
  );
};

export default Header;
