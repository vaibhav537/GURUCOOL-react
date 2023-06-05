import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Contact from "./components/Contact";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import SelectCategory from "./components/SelectCategory";
import Loader from "./components/Loader";
import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import AdminHome from "./components/AdminHome";
import LoginAdmin from "./components/LoginAdmin";
import DeleteCategory from "./components/DeleteCategory";
import AddCategory from "./components/AddCategory";
import UpdateCategory from "./components/UpdateCategory";
import Ranking from "./components/Ranking";
import { initialState, reducer } from "./reducer/UseReducer";
import Lobby from "./components/Lobby";
import Room from "./components/Room";

export const UserContext = createContext();
export const TeacherContext = createContext();
export const StudentContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulating a 2 second delay in loading
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      )}
    </div>
  );
}

function AppRoutes() {
  const [showMenu, setShowMenu] = useState(true);

  const location = useLocation();

  const [state, dispatch] = useReducer(reducer, initialState);


  const noNav = useMemo(
    () => [
      "/admin",
      "/selectcategory",
      "/admin/home",
      "/admin/Addcategory",
      "/admin/DeleteCategory",
      "/admin/UpdateCategory",
      "/admin/Ranking",
      "/lobby"
    ],
    []
  );

  useEffect(() => {
    const isNoNav =
    noNav.includes(location.pathname) ||
    location.pathname.startsWith("/room/");

    setShowMenu(!isNoNav);

  }, [location.pathname, noNav]);

  return (
        <UserContext.Provider value={{ state, dispatch }}>
          {showMenu && <Navbar />}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/selectcategory" element={<SelectCategory />} />
            <Route exact path="/admin" element={<LoginAdmin />} />
            <Route exact path="/admin/home" element={<AdminHome />} />
            <Route
              exact
              path="/admin/DeleteCategory"
              element={<DeleteCategory />}
            />
            <Route exact path="/admin/Addcategory" element={<AddCategory />} />
            <Route
              exact
              path="/admin/UpdateCategory"
              element={<UpdateCategory />}
            />
            <Route exact path="/admin/Ranking" element={<Ranking />} />
            <Route exact path="/lobby" element={<Lobby />} />
            <Route path="/room/:roomId" element={<Room />} />
          </Routes>
          {showMenu && <Footer />}
        </UserContext.Provider>
  );
}

export default App;
