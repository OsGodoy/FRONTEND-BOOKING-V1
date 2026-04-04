import { Link, NavLink } from "react-router-dom";
import { DivContainerCenter } from "../../../atoms/DivContainer";
import { useBottomNav } from "../../../../hooks/useBottomNav";

const BottomNavBar = () => {
  const { navItems, isSearchTopDrawer } = useBottomNav();

  return (
    <div
      className={`sticky bottom-0 w-full py-3 flex items-center justify-around text-neutral-500 bg-neutral-800 border-t border-neutral-700 transition duration-150
      ${
        isSearchTopDrawer
          ? "opacity-0 pointer-events-none"
          : "opacity-100 pointer-events-auto"
      }`}
    >
      {navItems.map((item, index) => {
        const Icon = item.icon;

        const content = (
          <DivContainerCenter
            className={`relative p-2 rounded-lg transition-colors duration-100`}
          >
            <Icon
              onClick={item.action}
              className={`${item.action ? "size-7 stroke-[1.5]" : ""}`}
            />

            {item.badge > 0 && (
              <span className="absolute -top-1 -right-3 h-5 w-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </DivContainerCenter>
        );

        if (item.to && !item.action) {
          return (
            <NavLink key={index} to={item.to}>
              {({ isActive }) => (
                <DivContainerCenter
                  className={`relative p-2 rounded-lg transition-colors duration-100
                  ${isActive && "bg-neutral-900"}`}
                >
                  <Icon />

                  {item.badge > 0 && (
                    <span
                      className={`absolute -top-1 -right-3 h-5 w-5 text-xs rounded-full flex items-center justify-center
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

export default BottomNavBar;
