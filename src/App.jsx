import { Outlet } from "react-router-dom";
import { SidebarProvider } from "./contexts/SidebarContext";
import { SearchTopDrawerProvider } from "./contexts/SearchTopDrawerContext";
import { FilterProvider } from "./contexts/FilterContext";
import { UserMenuProvider } from "./contexts/UserMenuContext";
import { useSyncCartOnLogin } from "./hooks/useSyncCartOnLogin";
import { Toaster } from "sonner";

function App() {
  useSyncCartOnLogin();
  return (
    <>
      <Toaster richColors position="top-center" />
      <FilterProvider>
        <SearchTopDrawerProvider>
          <SidebarProvider>
            <UserMenuProvider>
              <Outlet />
            </UserMenuProvider>
          </SidebarProvider>
        </SearchTopDrawerProvider>
      </FilterProvider>
    </>
  );
}

export default App;
