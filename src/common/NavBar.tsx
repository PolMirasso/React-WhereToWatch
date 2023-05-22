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
import { faL } from "@fortawesome/free-solid-svg-icons";
// import userService from "../services/userManager/userService";

export const NavBar = () => {
  const [results, setResults] = useState([]);
  const [userLogged, setUserLogged] = useState(false);
  const [userData, setUserData] = useState({
    username: "User",
    image_profile:
      "https://wheretowatch-vps.herokuapp.com/static/defaultImageProfile.png",
    description: "",
    user_nsfw: false,
  });
  const history = useNavigate();

  const handleLogin = () => {
    history("/login");
  };

  const handleRegister = () => {
    history("/register");
  };

  const handleProfile = () => {
    history("/profile");
  };

  const handleLists = () => {
    history("/lists");
  };

  async function getUserData() {
    const userData = Cookies.get("userData");

    if (userData) {
      const parsedObject = JSON.parse(userData);
      setUserLogged(true);
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

          <div className="ava_visflex flex">
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
                  <div
                    className="absolute right-0 z-10 px-5 py-3 w-60 origin-top-right rounded-lg bg-zinc-800 shadow border dark:border-transparent mt-5 ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                  >
                    <ul className="space-y-3 dark:text-white">
                      {!userLogged && (
                        <>
                          <li className="font-medium">
                            <a
                              onClick={handleLogin}
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
                              onClick={handleRegister}
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
                      {userLogged && (
                        <>
                          <li className="font-medium">
                            <a
                              onClick={handleProfile}
                              className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-yellow-600"
                            >
                              <div className="mr-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-person"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                </svg>
                              </div>
                              Perfil
                            </a>
                          </li>
                          <li className="font-medium">
                            <a
                              onClick={handleLists}
                              className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-yellow-600"
                            >
                              <div className="mr-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-list"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                  />
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
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-box-arrow-right"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                                  />
                                  <path
                                    fill-rule="evenodd"
                                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                                  />
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
