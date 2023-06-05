import React from "react";
import "../styles/Loader.css";

const Loader = () => {
  return (
    <>
      <div className="flex items-center justify-center mt-16 flex-col">
        <div>
          <img src="/logo.png" alt="..." className="w-80 h-80  " />
        </div>

        <div className="box">
         <div className="progress"></div>
        </div>
        <div className="text-4xl mt-[25rem] ml-10 text-black">
          GURU COOL
        </div>
      </div>
    </>
  );
};

export default Loader;