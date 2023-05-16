import React, { useState, useEffect } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineUnorderedList } from "react-icons/ai";
import SearchBar from "./SearchBar";
import navbar_styles from "../module/navbar.module.css";
import { SearchResultsList } from "./SearchResultsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import GoTop from "./goTop";
// import userService from "../services/userManager/userService";

export const NavBar = () => {
  const [results, setResults] = useState([]);
  const [userData, setUserData] = useState();
  const history = useNavigate();

  // function toggleMenu() {
  //   const toggleMenu = document.querySelector(".menu");
  //   toggleMenu?.classList.toggle("active");
  // }

  async function getUserData() {
    const userData = Cookies.get("userData");

    if (userData) {
      const parsedObject = JSON.parse(userData);
      return setUserData(parsedObject);
    }
    return;
  }

  async function logout() {
    Cookies.remove("authToken");
    Cookies.remove("userData");
    history("/");
    window.location.reload();
  }
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className={navbar_styles.header}>
        <div className={`${navbar_styles.nav} ${navbar_styles.container}`}>
          <a href="/" className={navbar_styles.logo}>
            Where<span>To</span>Watch
          </a>
          <div className={navbar_styles.searchBox}>
            <SearchBar setResults={setResults} />
            {results.length > 0 ? (
              <SearchResultsList results={results} />
            ) : null}
          </div>

          <div className="flex">
            <div className="w-20 shadow flex justify-center items-center">
              <div
                onClick={handleToggle}
                className={`border-b-4 border-transparent py-3 ${
                  open
                    ? "border-yellow-500 transform transition duration-300"
                    : ""
                }`}
              >
                <div className="flex justify-center items-center space-x-3 cursor-pointer">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-900">
                    <img
                      src={
                        userData
                          ? userData.image_profile
                          : "https://wheretowatch-vps.herokuapp.com/static/defaultImageProfile.png"
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {open && (
                  <div className="absolute w-60 px-5 py-3 dark:bg-zinc-800 bg-white rounded-lg shadow border dark:border-transparent mt-5">
                    <ul className="space-y-3 dark:text-white">
                      {!userData && (
                        <>
                          <li className="font-medium">
                            <a
                              href="/login"
                              className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-yellow-600"
                            >
                              <div className="mr-3">
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"
                                  ></path>
                                </svg>
                              </div>
                              Login
                            </a>
                          </li>
                          <li className="font-medium">
                            <a
                              href="/register"
                              className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-yellow-600"
                            >
                              <div className="mr-3">
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  ></path>
                                </svg>
                              </div>
                              Register
                            </a>
                          </li>
                        </>
                      )}
                      {userData && (
                        <>
                          <li className="font-medium">
                            <a
                              href="/profile"
                              className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-yellow-600"
                            >
                              <div className="mr-3">
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                  ></path>
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  ></path>
                                </svg>
                              </div>
                              Perfil
                            </a>
                          </li>
                          <li className="font-medium">
                            <a
                              href="/lists"
                              className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-yellow-600"
                            >
                              <div className="mr-3">
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                  ></path>
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  ></path>
                                </svg>
                              </div>
                              Llistes
                            </a>
                          </li>
                          <hr className="dark:border-gray-700" />
                          <li className="font-medium">
                            <a
                              onClick={logout}
                              className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                            >
                              <div className="mr-3 text-red-600">
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                  ></path>
                                </svg>
                              </div>
                              Logout
                            </a>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <GoTop></GoTop>
    </>
  );
};
