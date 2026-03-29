import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import MainLayout from "./components/templates/MainLayout";
import { SidebarProvider } from "./contexts/SidebarContext";
import { SearchModalProvider } from "./contexts/SearchModalContext";
import { FilterProvider } from "./contexts/FilterContext";
import LoginPage from "./pages/Login";
import AuthLayout from "./components/templates/AuthLayout";
import RegisterPage from "./pages/Register";

function App() {
  return (
    <FilterProvider>
      <SearchModalProvider>
        <SidebarProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/auth">
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>
            </Route>
          </Routes>
        </SidebarProvider>
      </SearchModalProvider>
    </FilterProvider>
  );
}

export default App;
