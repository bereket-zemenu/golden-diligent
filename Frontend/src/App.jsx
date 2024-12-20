// import { StoreProvider } from "./contexts/storeContext";
import { Route, Routes } from "react-router-dom";
import { StoreProvider } from "./contexts/storeContext";
import Home from "./pages/home";
import Login from "./components/Login";
import Confirmation from "./components/Confirmation";
import RegistrationForm from "./components/RegistrationForm";
import OssList from "./components/ossList";
// import PageNav from "./components/PageNav";
// import "leaflet/dist/leaflet.css";

function App() {
  return (
    <StoreProvider>
      <div className="relative">
        {/* <PageNav /> */}
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="otp-confirmation" element={<Confirmation />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/list" element={<OssList />} />
        </Routes>
      </div>
    </StoreProvider>
  );
}

export default App;
