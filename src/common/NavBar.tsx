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

  function toggleMenu() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu?.classList.toggle("active");
  }

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

          <div className="action">
            <div className={navbar_styles.userImg} onClick={toggleMenu}>
              <img
                src={
                  userData
                    ? userData.image_profile
                    : "https://wheretowatch-vps.herokuapp.com/static/defaultImageProfile.png"
                }
                className={navbar_styles.userImg}
              />
            </div>
            <div className="menu">
              <h3>{userData ? userData.username : "User"}</h3>
              <ul>
                {userData && (
                  <li>
                    <img src="https://cdn.discordapp.com/attachments/904811056520658994/1098577251102113832/settings.png" />
                    <a href="/profile">Perfil</a>
                  </li>
                )}

                {!userData && (
                  <>
                    <li>
                      <img src="https://cdn.discordapp.com/attachments/904811056520658994/1098577251102113832/settings.png" />
                      <a href="/login">Login</a>
                    </li>
                    <li>
                      <img src="https://cdn.discordapp.com/attachments/904811056520658994/1098577251102113832/settings.png" />
                      <a href="/register">Register</a>
                    </li>
                  </>
                )}
                {userData && (
                  <li>
                    <img src="https://cdn.discordapp.com/attachments/904811056520658994/1098577251102113832/settings.png" />
                    <a onClick={logout}>Logout</a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className={navbar_styles.navbar}>
            <a
              href="#"
              className={`${navbar_styles.navLink} ${navbar_styles.navActive}`}
            >
              <i className={navbar_styles.bx}>
                <AiOutlineUnorderedList />
              </i>
              <span className={navbar_styles.navLinkTitle}>Perfil</span>
            </a>
            <a href="/lists" className={navbar_styles.navLink}>
              <i className={navbar_styles.bx}>
                <AiOutlineUnorderedList />
              </i>
              <span className={navbar_styles.navLinkTitle}>Llistes</span>
            </a>
            <a href="#" className={navbar_styles.navLink}>
              <i className={navbar_styles.bx}>
                <i className="fas fa-light fa-list-check"></i>
              </i>
              <span className={navbar_styles.navLinkTitle}>Altres</span>
            </a>
          </div>
        </div>

        <div className={navbar_styles.navbar}>
          <a
            href="#"
            className={`${navbar_styles.navLink} ${navbar_styles.navActive}`}
          >
            <i className={navbar_styles.bx}>
              <AiOutlineUnorderedList />
            </i>
            <span className={navbar_styles.navLinkTitle}>Perfil</span>
          </a>
          <a href="/lists" className={navbar_styles.navLink}>
            <i className={navbar_styles.bx}>
              <AiOutlineUnorderedList />
            </i>
            <span className={navbar_styles.navLinkTitle}>Llistes</span>
          </a>
          <a href="#" className={navbar_styles.navLink}>
            <i className={navbar_styles.bx}>
              <i className="fas fa-light fa-list-check"></i>
            </i>
            <span className={navbar_styles.navLinkTitle}>Altres</span>
          </a>
        </div>
      </div>
      <GoTop></GoTop>
    </>
  );
};
