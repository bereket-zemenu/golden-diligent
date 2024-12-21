import PageNav from "./components/PageNav";
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
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
