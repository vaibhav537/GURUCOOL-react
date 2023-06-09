import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("ADMIN_ACCESS");
    navigate("/admin");
  };
  return (
    <div>
      <div>
        <img
          src="/images/AdminLogo.png"
          alt="LOGO"
          className="select-none pl-10 ml+-[7px] w-[166px] mb-5  transition-all duration-1000 dark:invert-[1]"
        />
        <p className=" text-xl ml-[24px] font-extrabold  dark:text-slate-200 transition-all duration-1000 select-none  text-teal-900 drop-shadow-2xl font-Garamond dark:shadow-white">
          MEET IN - ADMIN
        </p>
        <ul className="flex flex-col mt-[3rem]">
          <Link
            to={"/admin/home"}
            className={
              location.pathname === "/admin/home"
                ? " border-black bg-teal-200 select-none  flex uppercase items-center  border-2 justify-center p-2 font-Crimson font-semibold mb-[2rem] text-[23px]  rounded hover:border-gray-500 text-black hover:text-teal-700 transition-all"
                : "text-black border-teal-300 dark:border-slate-800 select-none  flex uppercase items-center  border-2 justify-center p-2 font-Crimson font-semibold mb-[2rem] text-[23px]   lg:text-gray-500 hover:text-teal-700 transition-all "
            }
          >
            Home
          </Link>
          <Link
            to={"/admin/Addcategory"}
            className={
              location.pathname === "/admin/Addcategory"
                ? " border-black bg-teal-200 select-none  flex uppercase items-center  border-2 justify-center p-2 font-Crimson font-semibold mb-[2rem] text-[23px]  rounded hover:border-gray-500 text-black hover:text-teal-700 transition-all"
                : "text-black border-teal-300 dark:border-slate-800 select-none  flex uppercase items-center  border-2 justify-center p-2 font-Crimson font-semibold mb-[2rem] text-[23px]   lg:text-gray-500 hover:text-teal-700 transition-all "
            }
          >
            Add Category
          </Link>
          <Link
            to={"/admin/DeleteCategory"}
            className={
              location.pathname === "/admin/DeleteCategory"
                ? " border-black bg-teal-200 select-none  flex uppercase items-center  border-2 justify-center p-2 font-Crimson font-semibold mb-[2rem] text-[23px]  rounded hover:border-gray-500 text-black hover:text-teal-700 transition-all"
                : "text-black border-teal-300 dark:border-slate-800 select-none  flex uppercase items-center  border-2 justify-center p-2 font-Crimson font-semibold mb-[2rem] text-[23px]   lg:text-gray-500 hover:text-teal-700 transition-all "
            }
          >
            DELETE CATEGORY
          </Link>
          <Link
            to={"/admin/UpdateCategory"}
            className={
              location.pathname === "/admin/UpdateCategory"
                ? " border-black bg-teal-200 select-none  flex uppercase items-center  border-2 justify-center p-2 font-Crimson font-semibold mb-[2rem] text-[23px]  rounded hover:border-gray-500 text-black hover:text-teal-700 transition-all"
                : "text-black border-teal-300 dark:border-slate-800 select-none  flex uppercase items-center  border-2 justify-center p-2 font-Crimson font-semibold mb-[2rem] text-[23px]   lg:text-gray-500 hover:text-teal-700 transition-all "
            }
          >
            Update Category
          </Link>
          <Link
            to={"/admin/Ranking"}
            className={
              location.pathname === "/admin/Ranking"
                ? " border-black bg-teal-200 select-none  flex uppercase items-center  border-2 justify-center p-2 font-Crimson font-semibold mb-[2rem] text-[23px]  rounded hover:border-gray-500 text-black hover:text-teal-700 transition-all"
                : "text-black border-teal-300 dark:border-slate-800 select-none  flex uppercase items-center  border-2 justify-center p-2 font-Crimson font-semibold mb-[2rem] text-[23px]   lg:text-gray-500 hover:text-teal-700 transition-all "
            }
          >
            Ranking
          </Link>
          <div
            className="select-none  flex uppercase items-center justify-center p-2 font-Crimson font-semibold mb-[2rem] text-[23px] 
                       bg-teal-300 dark:bg-slate-800  rounded hover:border-teal-500 text-slate-500 hover:text-teal-700 transition-all "
            onClick={handleLogout}
          >
            Logout
          </div>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
