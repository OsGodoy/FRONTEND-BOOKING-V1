import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import MainLayout from "./components/templates/MainLayout";
import { SidebarProvider } from "./contexts/SidebarContext";
import { SearchModalProvider } from "./contexts/SearchModalContext";

function App() {
  return (
    <SearchModalProvider>
      <SidebarProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </SidebarProvider>
    </SearchModalProvider>
  );
}

export default App;
