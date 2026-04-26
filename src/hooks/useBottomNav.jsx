import { useContext } from "react";
import { SearchTopDrawerContext } from "../contexts/SearchTopDrawerContext";
import { useGetFavorites } from "./useFavoritesData";
import { Heart, House, Search, ShoppingCart } from "lucide-react";
import { useGetCart } from "./useCartData";

export const useBottomNav = () => {
  const { isSearchTopDrawer, setIsSearchTopDrawer } = useContext(
    SearchTopDrawerContext,
  );

  const { favorites } = useGetFavorites();

  const { cart } = useGetCart();

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
