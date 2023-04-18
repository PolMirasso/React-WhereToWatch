import React from "react";
import { Routes, Route } from "react-router-dom";
import { RouterLayout } from "./common/RouterLayout";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { FilmPage } from "./pages/film";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={[<RouterLayout />, <HomePage />]} />
      <Route path="/film/:id" element={[<RouterLayout />, <FilmPage />]} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
