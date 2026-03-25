import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import MainLayout from "./components/templates/MainLayout";
import { SidebarProvider } from "./contexts/SidebarContext";
import { SearchModalProvider } from "./contexts/SearchModalContext";
import { FilterProvider } from "./contexts/FilterContext";

function App() {
  return (
    <FilterProvider>
      <SearchModalProvider>
        <SidebarProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Routes>
        </SidebarProvider>
      </SearchModalProvider>
    </FilterProvider>
  );
}

export default App;
