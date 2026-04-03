import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainLayout from "./components/templates/MainLayout";
import HomePage from "./pages/Home";
import BookDetails from "./components/molecules/BookDetails";
import AuthLayout from "./components/templates/AuthLayout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import LogoutPage from "./components/molecules/LogoutPage";
import FavoritesPage from "./pages/Favorites";
import CartPage from "./pages/Cart";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "books/:id", element: <BookDetails /> },
          { path: "/favorites", element: <FavoritesPage /> },
          { path: "/cart", element: <CartPage /> },
        ],
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },
      { path: "logout", element: <LogoutPage /> },
    ],
  },
]);
