import { useContext, useRef } from "react";
import { UserMenuContext } from "../../../contexts/UserMenuContext";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { RemoveScroll } from "react-remove-scroll";
import { SquareUserRound } from "lucide-react";
import { DivContainerModal } from "../../atoms/DivContainer";
import UserMenuContent from "./UserMenuContent";

const UserMenu = () => {
  const { isUserMenu, setIsUserMenu } = useContext(UserMenuContext);

  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsUserMenu(false));

  return (
    <div ref={ref} className="relative">
      <SquareUserRound
        onClick={() => {
          setIsUserMenu(!isUserMenu);
        }}
        className="size-7 stroke-[1.5] text-purple-500"
      />

      <RemoveScroll enabled={isUserMenu}>
        <div
          className={`absolute top-8 -right-10 transition-opacity duration-100 z-50
          ${isUserMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
        >
          <DivContainerModal className="rounded p-0">
            <UserMenuContent />
          </DivContainerModal>
        </div>
      </RemoveScroll>
    </div>
  );
};

export default UserMenu;
