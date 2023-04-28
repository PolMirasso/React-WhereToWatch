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
import { CreateListPage } from "./pages/lists/createlist/createlist";

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
        path="/create_lists"
        element={
          <RouterLayout>
            <CreateListPage />
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
        path="/editprofile/:id_user"
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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
