import React from "react";

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

// <Button fullWidth variant='contained'>Login</Button>
// <Button fullWidth variant='contained'>Register</Button>

export const NavBar: React.FC<{}> = () => {
  return (
    <div className="nav container">
      <a href="/" className="logo">
        Where <span>To</span> Watch
      </a>

      <div className="search-box">
        <input type="search" name="" id="search-input" />
        {/* icono lupa */}
      </div>

      <a href="#" className="user">
        <img src="" alt="" className="user-img" />
      </a>
    </div>
  );
};
