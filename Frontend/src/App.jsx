// import { StoreProvider } from "./contexts/storeContext";
import { Route, Routes } from "react-router-dom";
import { StoreProvider } from "./contexts/storeContext";
import Home from "./pages/home";
import Login from "./components/Login";
import Confirmation from "./components/Confirmation";
import RegistrationForm from "./components/RegistrationForm";
// import "leaflet/dist/leaflet.css";

function App() {
  return (
    <StoreProvider>
      <div className="relative">
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="otp-confirmation" element={<Confirmation />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </div>
    </StoreProvider>
  );
}

export default App;
