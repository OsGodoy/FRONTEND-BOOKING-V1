import { Outlet } from "react-router-dom";
import { SidebarProvider } from "./contexts/SidebarContext";
import { SearchTopDrawerProvider } from "./contexts/SearchTopDrawerContext";
import { FilterProvider } from "./contexts/FilterContext";
import { UserMenuProvider } from "./contexts/UserMenuContext";

function App() {
  return (
    <FilterProvider>
      <SearchTopDrawerProvider>
        <SidebarProvider>
          <UserMenuProvider>
            <Outlet />
          </UserMenuProvider>
        </SidebarProvider>
      </SearchTopDrawerProvider>
    </FilterProvider>
  );
}

export default App;
