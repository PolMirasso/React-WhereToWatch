import React, { useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import searchbar_styles from "../module/searchbar.module.css";
import Cookies from "js-cookie";

interface SearchBarProps {
  setResults: (data: any) => void;
}
interface SearchResultsProps {
  original_title: string;
  poster_path: string;
  id: number;
}

export const SearchBar = ({ setResults }: SearchBarProps) => {
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState({
    username: "User",
    image_profile:
      "https://wheretowatch-vps.herokuapp.com/static/defaultImageProfile.png",
    description: "",
    user_nsfw: false,
  });

  async function getUserData() {
    const userDataNonParsed = Cookies.get("userData");

    if (userDataNonParsed) {
      const parsedObject = JSON.parse(userDataNonParsed);
      return setUserData(parsedObject);
    }
    return;
  }

  async function fetchData(value: string) {
    try {
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getSearchResults/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            movie_name: value,
            nsfw_content: userData ? String(userData.user_nsfw) : "false",
            language:
              navigator.language.split("-").length < 1
                ? navigator.language
                : navigator.language.split("-")[1].toLowerCase(),
          }).toString(),
        }
      );

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }

  const handleChange = (value: any) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className={searchbar_styles.searchBox}>
      <input
        type="search"
        value={input}
        className="focus:ring-0 focus:ring-offset-0"
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Escriu per cercar..."
        name=""
        id="search-input"
      />
      <i className={searchbar_styles.bx}>
        <HiOutlineMagnifyingGlass />
      </i>
    </div>
  );
};

export default SearchBar;
