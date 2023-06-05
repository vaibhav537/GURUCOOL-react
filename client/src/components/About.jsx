import React, { useEffect } from "react";
import IntroTeam from "./IntroTeam";
import Team from "./Team";
import Faclities from "./Faclities";

const About = () => {
  useEffect(() => {
    document.title = "GURUCOOOL : ABOUT"; // Set the title of the web page
  }, []);
  return (
    <>
      <div className="bg-slate-100 dark:bg-slate-700">
        <IntroTeam />
        <div className="bg-slate-100 dark:bg-slate-600 transition-all duration-700">
          <p className="text-center text-3xl pt-5 select-text text-black dark:text-white cursor-text">
            Developer's team
          </p>
          <Team />
        </div>
        <Faclities />
      </div>
    </>
  );
};

export default About;
