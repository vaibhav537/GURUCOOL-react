import React, { useEffect, useState } from "react"; //importing the state from react
import { ToastContainer, toast } from "react-toastify"; //importing the toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; //importing the css of the ReactToast
import AdminDialog from "./AdminDialog"; //importing the dialog component
import { useNavigate } from "react-router-dom";
import { adminlogin, adminotp } from "../utils/APIRoutes";

const LoginAdmin = () => {
  useEffect(() => {
    document.title = "GURUCOOOL : ADMIN LOGIN"; // Set the title of the web page
  }, []);

  const [show, setShow] = useState("password"); // state for the password hide and show
  const [email, setEmail] = useState(""); // state for the email value
  const [password, setPassword] = useState(""); // state for the password value
  const [visible, setVisible] = useState(false); // state for hiding and showing the Dialog component

  const navigate = useNavigate(); // Defining useNavigate hook to navigate variable variable

  //finction for sending the code on email
  const changeIdPAssword = (e) => {
    e.preventDefault(); //preventing the form from its default behaviour
    // using try catch block for the  error handling
    try {
      // using fetch api to send the otp code
      const data = fetch(adminotp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      // if the response comes from fetch api then this if statement will run
      if (data) {
        toast.success("Verfication Code Sent", toastConfig);
        setVisible(true);
      } else {
        toast.error("Could'nt Send Verification Code", toastConfig);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to hide the modal
  const handleDialog = () => {
    setVisible(false); // hiding the dialog
  };

  // function to show and hide the password
  const handleShow = (e) => {
    e.preventDefault();
    if (show === "password") {
      setShow("text");
    } else {
      setShow("password");
    }
  };

  // toast configurations
  const toastConfig = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    progress: undefined,
    theme: "light",
    bodyClassName: "font-bold select-none",
    closeButton: false,
  };

  // send the input details to back end
  const postAdminLogin = async (event) => {
    event.preventDefault();
    // validating the emai and password
    if (!email || !password) {
      toast.warning("Please Fill all the fields !!", toastConfig);
      return;
    }

    // using the try catch block for error handling
    try {
      //sending the email and password to backend using fetch api
      const data = await fetch(adminlogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // converting the response to json
      const response = await data.json();

      // if the response contains success true the below if will run
      if (response.success) {
        toast.success("ACCESS GRANTED", toastConfig);
        localStorage.setItem("ADMIN_ACCESS", response.token);
        if (localStorage.getItem("student-token")) {
          localStorage.removeItem("student-token");
        } else if (localStorage.getItem("teacher-token")) {
          localStorage.removeItem("teacher-token");
        }

        navigate("/admin/home");
      } else {
        toast.error("ACCESS NOT GRANTED", toastConfig);
        console.log(response);
      }
    } catch (error) {
      toast.error("ACCESS NOT GRANTED", toastConfig);
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
      <div className="bg-[#d0c2e4] h-screen w-screen flex items-center justify-center">
        <div className="bg-[#317773] rounded-md shadow-2xl p-20">
          <h3 className="font-bold text-white text-2xl text-center select-none">
            ADMIN LOGIN
          </h3>
          <form
            method="post"
            className="flex flex-col items-center justify-center"
            onSubmit={postAdminLogin}
          >
            <div className="">
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Admin Email"
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none p-2 rounded mt-10 ring-1 text-black ring-gray-50 focus:ring-4 focus:ring-teal-900 transition-all duration-500"
              />
            </div>
            <div className="relative mt-4 mb-6">
              <input
                type={show}
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none p-2 rounded mt-5 ring-1 text-black ring-gray-50 focus:ring-4 focus:ring-teal-900 transition-all duration-500"
                placeholder="Admin Password"
                autoComplete="off"
              />
              <div
                className="text-[1.25rem] absolute cursor-pointer bottom-[10px] right-[8px] flex items-center pl-3"
                onClick={handleShow}
              >
                <i
                  className={`text-teal-600 ${
                    show === "password"
                      ? "fa-solid fa-eye"
                      : "fa-solid fa-eye-slash transition-all duration-1000"
                  } `}
                ></i>
              </div>
            </div>
            <div className="">
              <button
                type="submit"
                className="uppercase bg-purple-300 p-2 outline-none select-none rounded cursor-pointer hover:text-white hover:bg-teal-800 hover:shadow-3xl transition-all duration-500 font-semibold mt-10"
              >
                login
              </button>
            </div>
            <p
              className="mt-5 text-teal-100 hover:text-teal-500 transition-all duration-500  cursor-pointer"
              onClick={changeIdPAssword}
            >
              Change the Admin Id Password?
            </p>
            <AdminDialog visible={visible} onClose={handleDialog} />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginAdmin;
