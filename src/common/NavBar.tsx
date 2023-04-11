import React, { useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineUnorderedList } from "react-icons/ai";
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Grid,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import FilmList from "../pages/home/FilmList";

// <Button fullWidth variant='contained'>Login</Button>
// <Button fullWidth variant='contained'>Register</Button>

export const NavBar = () => {
  const [input, setInput] = useState("");

  const fetchData = (value: React.SetStateAction<string>) => {
    fetch("https://wheretowatch-vps.herokuapp.com/getAllFilms/")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter(
          (film: {
            name: { toLowerCase: () => React.SetStateAction<string>[] };
          }) => {
            return film && film.name && film.name.toLowerCase().includes(value);
          }
        );
        console.log(results);
      });
  };

  const handleChange = (value: React.SetStateAction<string>) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <>
      <div className="nav container">
        <a href="/" className="logo">
          Where <span>To</span> Watch
        </a>

        <div className="search-box">
          <input
            type="search"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Escriu per cercar..."
            name=""
            id="search-input"
          />
          <i className="bx">
            <HiOutlineMagnifyingGlass />
          </i>
        </div>

        <a href="#" className="user">
          <img
            src="https://cdn.discordapp.com/attachments/985160580648292353/1090935434080686090/user.jpg"
            alt=""
            className="user-img"
          />
        </a>

        <div className="navbar">
          <a href="#" className="nav-link nav-active">
            <i className="bx">
              <AiOutlineUnorderedList />
            </i>
            <span className="nav-link-title">Perfil</span>
          </a>
          <a href="#" className="nav-link">
            <i className="bx">
              <AiOutlineUnorderedList />
            </i>
            <span className="nav-link-title">Llistes</span>
          </a>
          <a href="#" className="nav-link">
            <i className="bx">
              <AiOutlineUnorderedList />
            </i>
            <span className="nav-link-title">Llistes</span>
          </a>
        </div>
      </div>
      {/* <FilmList data={"popular"}></FilmList> */}
      <FilmList></FilmList>
      {/* <FilmList></FilmList> */}
    </>
  );
};
