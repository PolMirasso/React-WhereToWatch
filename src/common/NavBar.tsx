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

 
  return (
    <>
      <div className="nav container">
        <a href="/" className="logo">
          Where <span>To</span> Watch
        </a>

        <div className="search-box">
          <input type="search" name="" id="search-input" />
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
      <FilmList></FilmList>
    </>
  );
};
