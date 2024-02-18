import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "./App.css";
import AuthContext from "./context/AuthContext";

const Navbar = ({ showNavbar }) => {
  console.log(showNavbar);
  //   const[user,setUser]=useContext(AuthContext)
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();
  const signuserOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-ouconst successful.
        console.log("sign-out successful");
      })
      .catch((error) => {
        // An error happened.
        console.log("sign-out unsuccessful");
      });
    console.log("signout");
  };

  const logOut = () => {
    signuserOut();
    // setUser(false)
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/SignIn");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMenu = () => {
    console.log("toggling");
    setToggle(true);
  };
  const handleClose = () => {
    console.log("toggling");
    setToggle(false);
  };
  const [pr, setPr] = useState(false);
  const handleclick = () => {
    setPr(!pr);
    console.log("pr is", pr);
  };

  const token = localStorage.getItem("token");
  console.log(toggle);

  return (
    <>
      <body className="bg-blue-500  sticky">
        <nav className=" sticky px-4 py-4 flex justify-between border-b-cyan-200 border-2 items-center bg-white">
          <h1 className="text-2xl  font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-indigo-800">
            P-Chat
          </h1>
          <div className="lg:hidden">
            <button
              className="navbar-burger flex items-center text-blue-600 p-3 "
              onClick={toggleMenu}
            >
              <svg
                className="block h-4 w-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>

          {token ? (
            <>
              <div className=" hidden lg:block mr-4">
                <button
                  // onMouseOver={handleclick}
                  onClick={handleclick}
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  class=" text-black mr-10 bg-slate-100  hover:bg-slate-200 focus:ring-4 focus:outline-none ring-blue-300 ring-3 shadow-lg shadow-blue-500 focus:ring-blue-400 font-medium rounded-full text-sm   text-center flex  items-center"
                  type="button"
                >
                  <img
                    className="avatr h-9 w-9  object-cover  "
                    src={currentUser && currentUser.photoURL}
                    alt="N/A"
                  />
                  <svg
                    class="w-2.5 h-2.5 drop  mt-6 border-2 border-white bg-slate-300 rounded-full  absolute ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* dropdown menu */}
                <div
                  id="dropdown"
                  className={`z-10 ${
                    pr ? ` ` : `hidden`
                  } mt-1  fixed  bg-slate-100 min-w-160 shadow-md z-10  divide-y divide-gray-100 rounded-lg  w-40 `}
                >
                  <div className="flex z-50  items-center p-2 border-2 border-b-2  border-b-slate-300">
                    <img
                      className="avatar avatr h-9 w-9  object-cover   "
                      src={currentUser && currentUser.photoURL}
                      alt="img"
                    />
                    <h1 className="pl-2">
                      {currentUser && currentUser.displayName}
                    </h1>
                  </div>
                  <ul
                    class="py-2  text-sm text-gray-70"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <Link to={"/Avatar"}>
                        <a
                          href="#"
                          class="block px-4 py-2 border-b-2 border-b-slate-200 hover:bg-gray-200 "
                        >
                          Update profile picture
                        </a>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block  px-4 py-2 border-b-2 border-b-slate-200 hover:bg-gray-200 "
                      >
                        Settings
                      </a>
                    </li>

                    <li>
                      <button
                        onClick={handleLogout}
                        className="btn w-full py-2 border-b-2 border-b-slate-200 hover:bg-gray-200 "
                      >
                        Sign Out
                      </button>
                      {/* <a href="#" class="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a> */}
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {token ? (
            <></>
          ) : (
            <Link
              to="/SignIn"
              className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
            >
              Sign In
            </Link>
          )}
          {token ? (
            <></>
          ) : (
            <Link
              to={"/signUp"}
              className="hidden lg:inline-block py-2 px-6 bg-green-500 hover:bg-green-600 text-sm text-white font-bold rounded-xl shadow-md shadow-green-300 border-green-300 border-md transition duration-200"
            >
              {" "}
              SignUp{" "}
            </Link>
          )}
          {/* {token ? <button className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200" onClick={handleLogout}>LogOut</button>:<></>} */}
          {token ? (
            <a
              className="text-sm hidden lg:block text-blue-600 font-bold"
              href="#"
            >
              About Us
            </a>
          ) : (
            <></>
          )}
        </nav>

        <div className={`navbar-menu  relative z-50 ${toggle ? "" : "hidden"}`}>
          <div className="navbar-backdrop  fixed inset-0 bg-gray-800 opacity-25"></div>
          <nav className="fixed top-0  left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              <a className="mr-auto text-3xl font-bold leading-none" href="#">
                <h1 className="text-2xl  font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-indigo-800">
                  P-Chat
                </h1>
              </a>
              <button className="navbar-close" onClick={handleClose}>
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div>
              <ul>
                <li className="mb-1">
                  <img
                    src={currentUser && currentUser.photoURL}
                    alt="img"
                    className=" h-24 mx-auto avatr w-24  mt-2"
                  />
                </li>
                <li className="mb-1">
                  <span className="block p-4 text-xl font-bold text-gray-900 hover:bg-blue-50 hover:text-blue-600 rounded">
                    {currentUser && currentUser.displayName}
                  </span>
                </li>
                <li className="mb-1">
                  <a
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                    href="#"
                  >
                    <Link onClick={handleClose} to={"/Avatar"}>
                      Update Profile picture
                    </Link>
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                    href="#"
                  >
                    Contact{" "}
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <div className="pt-6">
                {token ? (
                  <></>
                ) : (
                  <Link
                    to="/SignIn"
                    className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl"
                  >
                    Sign in
                  </Link>
                )}
                {token ? (
                  <></>
                ) : (
                  <Link
                    to="/Signup"
                    className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl"
                  >
                    Sign up
                  </Link>
                )}
                {token ? (
                  <button
                    className=" lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
                    onClick={handleLogout}
                  >
                    LogOut
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <p className="my-4 text-xs text-center pt-1 text-gray-400">
                <span>Copyright © 2021</span>
                <span> developed by </span>{" "}
                <a
                  className="font-bold text-blue-500 underline "
                  href="linkedin.com/in/pradeep-bisen-725690202/"
                >
                  Pradeep Bisen
                </a>
              </p>
            </div>
          </nav>
        </div>
      </body>
    </>
  );
};
export default Navbar;
