// import { StoreProvider } from "./contexts/storeContext";
import { Route, Routes } from "react-router-dom";
import { StoreProvider } from "./contexts/storeContext";
import Home from "./pages/home";

function App() {
  return (
    <StoreProvider>
      <div className="relative">
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </StoreProvider>
  );
}

export default App;
