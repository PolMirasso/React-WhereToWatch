import "./App.css";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import { Container, Button } from "@mui/material";
import { NavBar } from "./common/NavBar";
import HomePage from "./pages/home";
import FilmList from "./pages/home/FilmList";
import FilmRecommended from "./pages/home/FilmRecommended";

import { AuthProvider } from "./context/AuthProvider";
import Cookies from "js-cookie";
import verifyToken from "./services/userManager/verifyToken";

function App() {
  useEffect(() => {
    const checkToken = async () => {
      const token = await Cookies.get("authToken");

      if (token) {
        verifyToken.verifyToken({ token });
      }
    };
    checkToken().catch(console.error);
  }, []);
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
