import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../utils/APIRoutes";

const AddCategory = () => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryLabel, setCategoryLabel] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("ADMIN_ACCESS")) {
      navigate("/admin");
    }
  }, [navigate]);

  // toast configurations
  const toastConfig = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    progress: undefined,
    theme: "dark",
    bodyClassName: "font-bold select-none",
    closeButton: false,
  };

  const postAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(addCategory, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryTitle,
          categoryDescription,
          categoryLabel,
        }),
      });

      const  result = await res.json();

      if (result.success === true) {
        toast.success("Successfully Added", toastConfig);
      }
      else{
        toast.error("Category Not Added", toastConfig);
      }
    } catch (error) {
      toast.error("Not Added, Try Again some later", toastConfig);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />

      <div className="bg-purple-300 dark:bg-slate-600 w-[100vw] h-[100vh] transition-all duration-1000">
        <div className="fixed right-10 bottom-10">
          <Checkbox />
        </div>
        <div className="flex">
          <div className="bg-teal-300 transition-all duration-1000 h-[100vh] shadow-2xl p-10 dark:shadow-4xl dark:bg-slate-800">
            <AdminNavbar />
          </div>
          <div className="pl-[20rem]">
            <p className="text-center text-white text-4xl pt-10 font-bold">
              ADD THE CATEGORY
            </p>
            <form className="flex flex-col">
              <div className="flex flex-col pt-20">
                <label htmlFor="title" className="text-xl text-white">
                  Enter the title of the Category
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="ex: Class 9 RBSE"
                  className="p-2 dark:bg-teal-800 dark:text-teal-100 text-black outline-none dark:placeholder:text-teal-300 placeholder:text-teal-900 bg-teal-100 transition-all w-96 duration-500 rounded ring-2 ring-teal-100 focus:ring-4 focus:ring-teal-500 mt-4"
                  onChange={(e) => {
                    setCategoryTitle(e.target.value);
                  }}
                  name="categoryTitle"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col pt-10">
                <label htmlFor="title" className="text-xl text-white">
                  Enter some Description of the Category
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Description of the Category"
                  className="p-2 dark:bg-teal-800 dark:text-teal-100 text-black outline-none dark:placeholder:text-teal-300 placeholder:text-teal-900 bg-teal-100 transition-all w-96 duration-500 rounded ring-2 ring-teal-100 focus:ring-4 focus:ring-teal-500 mt-4"
                  onChange={(e) => {
                    setCategoryDescription(e.target.value);
                  }}
                  name="categoryDescription"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col pt-10">
                <label htmlFor="title" className="text-xl text-white">
                  Enter the Label of the Category
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="example: class9CBSE"
                  className="p-2 dark:bg-teal-800 dark:text-teal-100 text-black outline-none dark:placeholder:text-teal-300 placeholder:text-teal-900 bg-teal-100 transition-all w-96 duration-500 rounded ring-2 ring-teal-100 focus:ring-4 focus:ring-teal-500 mt-4"
                  onChange={(e) => {
                    setCategoryLabel(e.target.value);
                  }}
                  name="categoryLabel"
                  autoComplete="off"
                />
              </div>
              <div className="pt-20">
                <input
                  type="submit"
                  value="ADD"
                  onClick={postAddCategory}
                  className="hover:text-white ml-10 dark:text-teal-100  dark:placeholder:text-teal-300 w-[10rem] text-lg font-bold transition-all duration-300 rounded hover:shadow-3xl p-2 dark:bg-teal-800 bg-teal-300 dark:hover:bg-teal-700 cursor-pointer hover:bg-teal-500"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
