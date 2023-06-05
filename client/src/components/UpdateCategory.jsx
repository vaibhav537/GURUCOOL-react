import React, { useEffect, useState } from "react";
import Checkbox from "../components/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import AdminCategoryUpdateDialog from "./AdminCategoryUpdateDialog";

const UpdateCategory = () => {
  //UI HAS BEEN MADE BUT FUNCTIONALITY IS NOT DONE YET...
  const [title, setTitle] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryLabel, setCategoryLabel] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.title = "GURUCOOOL : UPDATE CATEGORY"; // Set the title of the web page
  }, []);

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
    if (!localStorage.getItem("ADMIN_ACCESS")) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleUpdateCategory = (event) => {
    event.preventDefault();
    if (!title) {
      toast.error("Title is required", toastConfig);
      return;
    }
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
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
            <p className=" text-center text-4xl pt-10 font-bold text-white">
              UPDATE THE CATEGORY
            </p>
            <form className="flex flex-col ">
              <div className="flex flex-col pt-20">
                <label
                  htmlFor="title"
                  className="text-xl select-none text-white"
                >
                  Enter the title of the Category
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="ex: Class 9 RBSE"
                  className="p-2 dark:bg-teal-800 dark:text-white text-teal-900 outline-none dark:placeholder:text-teal-300 placeholder:text-teal-900 bg-teal-100 transition-all w-96 duration-500 rounded ring-2 ring-teal-100 focus:ring-4 focus:ring-teal-500 mt-4"
                  name="Title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  autoComplete="off"
                />
                <div>
                  <h1 className="text-xl text-white mt-20 select-none">
                    Select that which fields you want to Update
                  </h1>
                  <div className="select-none">
                    <div>
                      <input
                        type="radio"
                        name="categoryTitle"
                        id="categoryTitle"
                        value="categoryTitle"
                        onChange={(e) => {
                          setCategoryTitle(e.target.value);
                        }}
                        className="w-4 h-4 my-3 mr-3 dark:accent-purple-300 text-purple-600 accent-purple-700 outline-none bg-gray-100 border-gray-300   dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="categoryTitle">Title of Category</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="categoryLabel"
                        id="categoryLabel"
                        value="categoryLabel"
                        onChange={(e) => {
                          setCategoryLabel(e.target.value);
                        }}
                        className="w-4 h-4   my-3 mr-3 dark:accent-purple-300 text-purple-600 accent-purple-700 outline-none bg-gray-100 border-gray-300   dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="categoryLabel">Label of Category</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="categoryDescription"
                        id="categoryDescription"
                        value="categoryDescription"
                        onChange={(e) => {
                          setCategoryDescription(e.target.value);
                        }}
                        className="w-4 h-4 my-3 mr-3 dark:accent-purple-300 text-purple-600 accent-purple-700 outline-none bg-gray-100 border-gray-300   dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="categoryDescription">
                        Description of Category
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-20">
                <input
                  type="submit"
                  value="Update"
                  className="hover:text-white uppercase ml-10 dark:placeholder:text-teal-300 w-[10rem] text-lg font-bold transition-all duration-300 rounded hover:shadow-3xl p-2 dark:bg-teal-800 bg-teal-300 dark:hover:bg-teal-700 cursor-pointer hover:bg-teal-500"
                  onClick={handleUpdateCategory}
                />
              </div>
            </form>
            <AdminCategoryUpdateDialog
              visible={visible}
              onClose={handleClose}
              categoryTitle={categoryTitle}
              categoryLabel={categoryLabel}
              categoryDescription={categoryDescription}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCategory;
