import { useContext } from "react";
import { SearchTopDrawerContext } from "../contexts/SearchTopDrawerContext";
import { useFavorites } from "./useFavorites";
import { Heart, House, Search, ShoppingCart } from "lucide-react";
import { useCart } from "./useCart";

export const useBottomNav = () => {
  const { isSearchTopDrawer, setIsSearchTopDrawer } = useContext(
    SearchTopDrawerContext,
  );

  const { data: favorites = [] } = useFavorites();

  const { data: cart = [] } = useCart();

  const toggleSearch = () => {
    setIsSearchTopDrawer(!isSearchTopDrawer);
  };

  const navItems = [
    {
      to: "/cart",
      icon: ShoppingCart,
      badge: cart.length,
    },
    {
      to: "/",
      icon: Search,
      action: toggleSearch,
    },
    {
      to: "/",
      icon: House,
    },
    {
      to: "/favorites",
      icon: Heart,
      badge: favorites.length,
    },
  ];

  return {
    navItems,
    isSearchTopDrawer,
  };
};
