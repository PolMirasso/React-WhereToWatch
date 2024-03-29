import React from "react";
import { Routes, Route } from "react-router-dom";
import { RouterLayout } from "./common/RouterLayout";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { FilmPage } from "./pages/film";
import { ListPage } from "./pages/lists";
import { ProfilePage } from "./pages/profile";
import { EditProfilePage } from "./pages/profile/editProfile";
import { SeriePage } from "./pages/series";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RouterLayout>
            <HomePage />
          </RouterLayout>
        }
      />
      <Route
        path="/lists"
        element={
          <RouterLayout>
            <ListPage />
          </RouterLayout>
        }
      />

      <Route
        path="/profile"
        element={
          <RouterLayout>
            <ProfilePage />
          </RouterLayout>
        }
      />
      <Route
        path="/editprofile"
        element={
          <RouterLayout>
            <EditProfilePage />
          </RouterLayout>
        }
      />
      <Route
        path="/film/:id"
        element={
          <RouterLayout>
            <FilmPage />
          </RouterLayout>
        }
      />
      <Route
        path="/serie/:id"
        element={
          <RouterLayout>
            <SeriePage />
          </RouterLayout>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
