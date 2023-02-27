import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Locations from "./pages/Locations";
import Weekly from "./pages/Weekly";
import SimpleBottomNavigation from "./Components/Navbar";
import SearchAppBar from "./Components/SearchBar";
function App() {
  return (
    <div>
      <BrowserRouter>
        <SearchAppBar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/weekly" element={<Weekly />} />
          <Route index path="/locations" element={<Locations />} />
        </Routes>
        <SimpleBottomNavigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
