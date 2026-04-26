import { Crown, Menu } from "lucide-react";
import { useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import {
  DivContainerCenter,
  DivContainerEnd,
  DivContainerStart,
} from "../atoms/DivContainer";
import { useAuth } from "../../hooks/useAuthData";
import { ButtonBorderPurple } from "../atoms/Buttons";
import UserMenu from "./Menus/UserMenu";
import { Link } from "react-router-dom";
import HeaderNavBar from "./NavBars/HeaderNavBar/HeaderNavBar";
import { scaleFx } from "../../constants/styles";

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { isSidebar, setIsSidebar } = useContext(SidebarContext);

  return (
    <div className="sticky top-0 w-full p-4 md:py-0 flex items-center justify-center bg-neutral-900 border-b border-neutral-800 z-40">
      <DivContainerCenter className="flex-row max-w-360 gap-2">
        <Menu
          onClick={() => {
            setIsSidebar(!isSidebar);
          }}
          className={`size-7 stroke-[1.5] text-neutral-500 ${scaleFx("md")}`}
        />
        <DivContainerStart className="flex-1">
          <Link
            to="/#books-section"
            className="flex items-center justify-start gap-1 text-xl sm:text-3xl lg:text-4xl font-bold text-purple-500"
          >
            book's
            <span className="flex items-center text-amber-400">
              king <Crown className="size-5 sm:size-8 fill-amber-400" />
            </span>{" "}
          </Link>
        </DivContainerStart>
        <DivContainerEnd className="flex-row flex-1 gap-2 text-neutral-500">
          <DivContainerCenter className="hidden md:flex flex-1">
            <HeaderNavBar />
          </DivContainerCenter>
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Link to={"/auth/login"}>
              <ButtonBorderPurple className="text-responsive-xs">
                Iniciar Sesión
              </ButtonBorderPurple>
            </Link>
          )}
        </DivContainerEnd>
      </DivContainerCenter>
    </div>
  );
};

export default Header;
