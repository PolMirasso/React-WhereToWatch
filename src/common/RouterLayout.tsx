import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import FilmRecommended from "../pages/home/FilmRecommended";

export const RouterLayout: React.FC<{}> = () => {
  return (
    <>
      <NavBar></NavBar>
      
    </>
  );
};
