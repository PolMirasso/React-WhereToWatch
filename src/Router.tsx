import React from "react";
import { Routes, Route } from "react-router-dom";
import { RouterLayout } from "./common/RouterLayout";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { FilmPage } from "./pages/film";
import { ListPage } from "./pages/lists";
import { ProfilePage } from "./pages/profile";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={[<RouterLayout />, <HomePage />]} />
      <Route path="/film/:id" element={<FilmPage />} />
      <Route path="/lists" element={[<RouterLayout />, <ListPage />]} />
      <Route path="/profile" element={[<RouterLayout />, <ProfilePage />]} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
