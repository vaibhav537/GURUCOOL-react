import React, { useEffect, useState } from "react";
import Checkbox from "../components/Checkbox";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { deleteCategory } from "../utils/APIRoutes";

const DeleteCategory = () => {
  const [categoryTitle, setCategoryTitle] = useState("");
  const navigate = useNavigate();

  const toastConfig = {
    position: "bottom-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    progress: undefined,
    theme: "dark",
    bodyClassName: "font-bold select-none font-Nunito",
    closeButton: false,
  };

  useEffect(() => {
    document.title = "GURUCOOOL : DELETE CATEGORY"; // Set the title of the web page
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("ADMIN_ACCESS")) {
      navigate("/admin");
    }
  }, [navigate]);

  const deleteCat = async (e) => {
    e.preventDefault();
    try {
      if (!categoryTitle) {
        toast.error("Enter the Title First", toastConfig);
      } else {
        const  res = await fetch(`${deleteCategory}/${categoryTitle}`, {
          method: "DELETE",
        });

        const result = res.json();

        if (result.success === false) {
          toast.error("ERROR", toastConfig);
        } else {
          toast.success("Successfully Delete", toastConfig);
          setCategoryTitle("")
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Not Deleted, Try Again some later", toastConfig);
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
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
          <div className="pl-[20rem] pt-[10rem]">
            <p className=" text-center text-4xl pt-10 font-bold text-white select-none">
              DELETE THE CATEGORY
            </p>
            <form className="flex flex-col ">
              <div className="flex flex-col pt-20">
                <label htmlFor="title" className="text-xl text-white select-none">
                  Enter the title of the Category
                </label>
                <input
                  type="text"
                  id="title"
                  value={categoryTitle}
                  placeholder="ex: Class 9 RBSE"
                  className="p-2 dark:bg-teal-800 outline-none dark:placeholder:text-teal-300 placeholder:text-teal-900 bg-teal-100 transition-all w-96 duration-500 rounded ring-2 ring-teal-100 focus:ring-4 focus:ring-teal-500 mt-4"
                  onChange={(e) => {
                    setCategoryTitle(e.target.value);
                  }}
                  name="categoryTitle"
                  autoComplete="off"
                />
              </div>
              <div className="pt-20">
                <input
                  type="submit"
                  value="DELETE"
                  onClick={deleteCat}
                  className="hover:text-white ml-10 dark:placeholder:text-teal-300 w-[10rem] text-lg font-bold transition-all duration-300 rounded hover:shadow-3xl p-2 dark:bg-teal-800 bg-teal-300 dark:hover:bg-teal-700 cursor-pointer hover:bg-teal-500"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteCategory;
