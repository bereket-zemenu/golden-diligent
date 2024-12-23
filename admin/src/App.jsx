import PageNav from "./components/PageNav";
import UserDetails from "./components/UserDetails";
import UsersList from "./components/UsersList";
import { Routes, Route, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <PageNav />
      <div className="">
        <BrowserRouter>
          <Routes>
            {" "}
            <Route path="/" element={<UsersList />} />
            <Route path="/user-details" element={<UserDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
