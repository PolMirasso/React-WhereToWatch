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

  return (
    <div className={navbar_styles.header}>
      <div className={`${navbar_styles.nav} ${navbar_styles.container}`}>
        <a href="/" className={navbar_styles.logo}>
          Where<span>To</span>Watch
        </a>
        <div className={navbar_styles.searchBox}>
          <SearchBar setResults={setResults} />
          <SearchResultsList results={results} />
        </div>

        <ul className={navbar_styles.mainLinks}>
          <li className={navbar_styles.dropdownLi}></li>
        </ul>
        <ul className="main-links">
          <li className="dropdown-li">
            <a href="/profile">
              <img
                src="https://cdn.discordapp.com/attachments/985160580648292353/1090935434080686090/user.jpg"
                alt=""
                className={navbar_styles.userImg}
              />
            </a>
            <ul className={navbar_styles.dropdown}>
              <li>
                <a className={navbar_styles.log} href="/login">
                  Login
                </a>
              </li>
              <li>
                <a className={navbar_styles.reg} href="/register">
                  Register
                </a>
              </li>
            </ul>
          </li>
        </ul>

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
