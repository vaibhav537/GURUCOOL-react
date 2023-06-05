import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Checkbox from "./Checkbox";
import { UserContext } from "../App";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    dispatch({
      type: "USER",
      payload: false,
    });
    
    navigate("/");
  };


  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <Link
            to={"/"}
            className={
              location.pathname === "/"
                ? "text-xl  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
                : "text-base  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
            }
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className={
              location.pathname === "/about"
                ? "text-xl  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
                : "text-base  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
            }
          >
            About
          </Link>
          <li
            className="list-none text-base cursor-pointer select-none text-black lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
            onClick={handleLogout}
          >
            Logout
          </li>
          <Link
            className={
              location.pathname === "/contact"
                ? "text-xl  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
                : "text-base  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
            }
            to={"/contact"}
          >
            Contact
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link
            to={"/"}
            className={
              location.pathname === "/"
                ? "text-xl  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
                : "text-base  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
            }
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className={
              location.pathname === "/about"
                ? "text-xl  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
                : "text-base  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
            }
          >
            About
          </Link>
          <Link
            className={
              location.pathname === "/login"
                ? "text-xl  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
                : "text-base  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
            }
            to={"/login"}
          >
            Login
          </Link>
          <Link
            className={
              location.pathname === "/register"
                ? "text-xl  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
                : "text-base  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
            }
            to={"/register"}
          >
            Register
          </Link>
          <Link
            className={
              location.pathname === "/contact"
                ? "text-xl  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
                : "text-base  text-black select-none lg:text-gray-500 hover:text-gray-300 transition-all duration-500"
            }
            to={"/contact"}
          >
            Contact
          </Link>
        </>
      );
    }
  };

  return (
    <>
      <div className="bg-slate-200 dark:bg-slate-800 nav transition-all duration-300">
        <div className="flex justify-start items-center p-1 px-6 lg:px-0 container ml-[35px]">
          <Link to={"/"}>
            <div className=" flex text-lg font-bold uppercase w-[30rem]">
              <img
                src="/logo.png"
                alt="..."
                height={50}
                width={50}
                className="dark:invert"
              />
              <p className="pt-4 dark:text-white pl-4 text-black select-none">
                GURU COOL
              </p>
            </div>
          </Link>
          <input
            type="checkbox"
            name="hamburger"
            className="peer hidden"
            id="hamburger"
          />
          <label
            htmlFor="hamburger"
            className="peer-checked:hamburger block relative cursor-pointer lg:hidden border-2 border-gray-300 peer-checked:border-2 peer-checked:border-white p-3 rounded-md transition-all "
          >
            <div className="m-auto w-6 h-0.5 rounded bg-gray-300 transition-all duration-300"></div>
            <div className="m-auto mt-2 w-6 h-0.5 rounded bg-gray-300 transition-all duration-300"></div>
          </label>

          <div className="translate-y-full ml-[30rem] peer-checked:translate-y-0  lg:translate-y-0 inset-0 fixed lg:static pt-20 lg:pt-0 bg-white lg:bg-transparent -z-10 lg:z-10 lg:h-auto transition-all duration-300 ease-in-out ">
            <div className="bg-white shadow-md lg:bg-transparent lg:shadow-none py-10 lg:py-0 flex flex-col lg:items-center lg:flex-row px-6 space-y-4 lg:space-y-0 lg:space-x-12">
              <RenderMenu />
            </div>
          </div>
          <div>
            <Checkbox />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
