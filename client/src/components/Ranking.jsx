import React, { useEffect } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Checkbox from '../components/Checkbox'
import { useNavigate } from 'react-router-dom';

const Ranking = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "GURUCOOOL : RANKING"; // Set the title of the web page
    if (!localStorage.getItem("ADMIN_ACCESS")) {
      navigate('/admin')
    }
  }, []);
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
          <div>RANKING BRO IS HERE</div>
        </div>
      </div>
    </>
  );
};

export default Ranking;
