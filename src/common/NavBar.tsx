import React, { useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineUnorderedList } from "react-icons/ai";
import SearchBar from "./SearchBar";
import navbar_styles from "../module/navbar.module.css";
import { SearchResultsList } from "./SearchResultsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const NavBar = () => {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    // implement the search functionality here and update the results state
    setShowResults(true); // set the showResults state to true when the search is completed
  };

  function toggleMenu() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu?.classList.toggle("active");
  }
  return (
    <div className={navbar_styles.header}>
      <div className={`${navbar_styles.nav} ${navbar_styles.container}`}>
        <a href="/" className={navbar_styles.logo}>
          Where<span>To</span>Watch
        </a>
        <div className={navbar_styles.searchBox}>
          <SearchBar setResults={setResults} />
          {results.length > 0 ? <SearchResultsList results={results} /> : null}
        </div>

        {/* <div className={navbar_styles.dropdown}>
          <a href="/profile">
            <img
              src="https://wheretowatch-vps.herokuapp.com/static/defaultImageProfile.png"
              alt=""
              className={navbar_styles.userImg}
            />
          </a>
          <div className={navbar_styles.dropdownContent}>
            <a className={`${navbar_styles.marginBottom5} log`} href="/login">
              Login
            </a>
            <a
              className={`${navbar_styles.marginBottom5} reg`}
              href="/register"
            >
              Register
            </a>
          </div>
        </div> */}

        <div className="action">
          <div className={navbar_styles.userImg} onClick={toggleMenu}>
            <img src="https://wheretowatch-vps.herokuapp.com/static/defaultImageProfile.png" />
          </div>
          <div className="menu">
            <h3>Nom</h3>
            <ul>
              <li>
                <img src="https://cdn.discordapp.com/attachments/904811056520658994/1098577251102113832/settings.png" />
                <a href="/profile">My profile</a>
              </li>
              <li>
                <img src="https://cdn.discordapp.com/attachments/904811056520658994/1098577251102113832/settings.png" />
                <a href="#">Edit profile</a>
              </li>

              <li>
                <img src="https://cdn.discordapp.com/attachments/904811056520658994/1098577251102113832/settings.png" />
                <a href="#">Logout</a>
              </li>
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
    </div>
  );
};
