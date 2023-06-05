import React, { useEffect } from "react";
import SelectCard from "../components/SelectCard";
import { useNavigate } from "react-router-dom";

const SelectCategory = () => {
  useEffect(() => {
    document.title = "GURUCOOOL : SELECT CATEGORY"; // Set the title of the web page
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("teacher-token")){
      navigate("/")
    }
    if(localStorage.getItem("student-token")){
      navigate("/");
    }
  
    if(localStorage.getItem("ADMIN_ACCESS")){
      navigate("/");
    }

  }, [navigate])
  return (
    <>
      <div className="w-full h-screen bg-slate-100 dark:bg-slate-600">
      <div className="bg-teal-100 dark:bg-teal-800 py-8 border-b-2 border-teal-600">
        <div className="text-4xl text-center pt-5  font-bold select-none dark:text-green-200 font-Crimson
        rimson text-green-700">
          Select Category
        </div>

        <p className=" text-lg text-center pt-2 text-green-600 select-none font-Crimson dark:text-green-300">
          Select the category from the given categories from below which you
          will teach by this account.<br/>You can choose only one category from one account.
        </p>
      </div>
        <SelectCard />
      </div>
    </>
  );
};

export default SelectCategory;