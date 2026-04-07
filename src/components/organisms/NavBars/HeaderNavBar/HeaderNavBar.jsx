import { Link, NavLink } from "react-router-dom";
import { DivContainerCenter } from "../../../atoms/DivContainer";
import { useBottomNav } from "../../../../hooks/useBottomNav";
import { scaleFx } from "../../../../constants/styles";

const HeaderNavBar = () => {
  const { navItems } = useBottomNav();

  return (
    <div
      className={`flex items-center justify-around w-full py-3 text-neutral-500`}
    >
      {navItems.map((item, index) => {
        const Icon = item.icon;

        const content = (
          <DivContainerCenter
            className={`relative p-2 rounded-lg transition-colors duration-100`}
          >
            <Icon
              onClick={item.action}
              className={`${item.action ? "size-7 stroke-[1.5]" : ""} ${scaleFx("md")}`}
            />

            {item.badge > 0 && <span>{item.badge}</span>}
          </DivContainerCenter>
        );

        if (item.to && !item.action) {
          return (
            <NavLink key={index} to={item.to}>
              {({ isActive }) => (
                <DivContainerCenter
                  className={`relative p-2 rounded-lg transition-colors duration-100
                  ${isActive ? "bg-neutral-950" : `${scaleFx("md")}`}
                  `}
                >
                  <Icon />

                  {item.badge > 0 && (
                    <span
                      className={`absolute top-0 -right-1 h-4 w-4 text-responsive-xs rounded-full flex items-center justify-center
                    ${item.to === "/cart" ? "bg-emerald-500 text-black font-semibold" : "bg-rose-500 text-white"}
                    `}
                    >
                      {item.badge}
                    </span>
                  )}
                </DivContainerCenter>
              )}
            </NavLink>
          );
        }

        if (item.to && item.action) {
          return (
            <Link key={index} to={item.to}>
              {content}
            </Link>
          );
        }

        return (
          <button key={index} onClick={item.action}>
            {content}
          </button>
        );
      })}
    </div>
  );
};

export default HeaderNavBar;
