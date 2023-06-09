import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import AdminStudentList from "../components/AdminStudentList";
import AdminTeacherList from "../components/AdminTeacherList";
import Checkbox from "../components/Checkbox";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const [visibleTeacher, setVisibleTeacher] = useState(true);
  const [visibleStudent, setVisibleStudent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const AdminToken = localStorage.getItem("ADMIN_ACCESS");

    if (!AdminToken) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleRadio1 = (e) => {
    e.preventDefault();
    if (visibleStudent === true) {
      setVisibleTeacher(true);
      setVisibleStudent(false);
    }
  };

  const handleRadio2 = (e) => {
    e.preventDefault();
    if (visibleTeacher === true) {
      setVisibleStudent(true);
      setVisibleTeacher(false);
    }
  };

  return (
    <>
      <div className="bg-purple-300 dark:bg-slate-600 w-[100vw] h-[100vh] transition-all duration-1000">
        <div className="fixed right-10 bottom-10">
          <Checkbox />
        </div>

        <div className="flex">
          <div className="bg-teal-300 transition-all duration-1000 h-[100vh] shadow-2xl p-10 dark:shadow-4xl dark:bg-slate-800">
            <AdminNavbar />
          </div>
          <div className="pt-[4rem] pl-[15rem]">
            <ul className="grid w-full gap-40 md:grid-cols-2">
              <li>
                <input
                  type="radio"
                  id="teachers"
                  name="list"
                  className="hidden peer"
                  defaultChecked
                  onClick={handleRadio1}
                />
                <label
                  htmlFor="teachers"
                  className={`inline-flex  w-[10rem]  items-center justify-between  p-5  bg-teal-200 rounded-lg cursor-pointer dark:hover:text-gray-300  transition-all duration-700   dark:hover:bg-gray-700 ${
                    visibleTeacher
                      ? " shadow-4xl bg-teal-700 dark:bg-slate-600 dark:text-slate-300 text-black"
                      : "text-white dark:text-slate-500  dark:bg-slate-300 hover:shadow-3xl hover:text-teal-600 hover:bg-teal-100"
                  }`}
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold select-none ">
                      TEACHERS
                    </div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="students"
                  name="list"
                  className="hidden peer"
                  onClick={handleRadio2}
                />
                <label
                  htmlFor="students"
                  className={`inline-flex text-center  w-[10rem]  items-center justify-between  p-5  bg-teal-200 rounded-lg cursor-pointer dark:hover:text-gray-300  transition-all duration-700   dark:hover:bg-gray-700 ${
                    visibleStudent
                      ? "shadow-4xl bg-teal-700 dark:bg-slate-600 dark:text-slate-300 text-black"
                      : "text-white dark:text-slate-500  dark:bg-slate-300 hover:shadow-3xl hover:text-teal-600 hover:bg-teal-100"
                  }`}
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold select-none ">
                      STUDENTS
                    </div>
                  </div>
                </label>
              </li>
            </ul>
            <div className="mt-[3rem] -ml-28">
              {visibleTeacher && (
                <div>
                  <AdminTeacherList />
                </div>
              )}
              {visibleStudent && (
                <div>
                  <AdminStudentList />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
