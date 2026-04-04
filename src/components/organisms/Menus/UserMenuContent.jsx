import { Link, useNavigate } from "react-router-dom";
import { LiContainer, UlContainerCenter } from "../../atoms/UlContainer";
import { useUserMenu } from "../../../hooks/useUserMenu";

const UserMenuContent = () => {
  const { userMenuList } = useUserMenu();

  return (
    <UlContainerCenter>
      {userMenuList.map((item) => {
        const Icon = item.icon;

        const content = (
          <LiContainer
            onClick={item.action}
            className={`flex items-center gap-2 py-2 text-neutral-400
              ${item.id === "perfil" && "text-amber-400"}
              ${item.id === "salir" && "text-rose-400 border-t border-neutral-800"}
            `}
          >
            {item.label}
            {Icon && <Icon className="size-4" />}
          </LiContainer>
        );

        if (item.link) {
          return (
            <Link key={item.id} to={item.link} className="w-full">
              {content}
            </Link>
          );
        }

        return (
          <div key={item.id} className="w-full">
            {content}
          </div>
        );
      })}
    </UlContainerCenter>
  );
};

export default UserMenuContent;
