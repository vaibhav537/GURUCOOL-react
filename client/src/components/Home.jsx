import React, { useContext, useEffect, useState } from "react";
import Homeuser from "./Homeuser";
import Hometeacher from "./Hometeacher";
import Homestudent from "./Homestudent";
import { UserContext } from "../App";

const Home = () => {
  const { state, dispatch } = useContext(UserContext);

  const [teacherComponent, setTeacherComponent] = useState(false);
  const [userComponent, setUserComponent] = useState(true);
  const [studentComponent, setStudentComponent] = useState(false);

  useEffect(() => {
    document.title = "GURUCOOOL"; // Set the title of the web page
  }, []);

  useEffect(() => {

    if (localStorage.getItem("teacher-token")) {
      setUserComponent(false);
      setTeacherComponent(true);
      setStudentComponent(false);
    } else if (localStorage.getItem("student-token")) {
      setUserComponent(false);
      setTeacherComponent(false);
      setStudentComponent(true);
    } else {
      setStudentComponent(false);
      setTeacherComponent(false);
      setUserComponent(true);
    }
  }, [state]);

  console.log(state)

  return (
    <>
      {userComponent && <Homeuser />}
      {teacherComponent && <Hometeacher />}
      {studentComponent && <Homestudent />}
    </>
  );
};

export default Home;
