import "./App.css";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import { Container, Button } from "@mui/material";
import { NavBar } from "./common/NavBar";
import HomePage from "./pages/home";
import FilmList from "./pages/home/FilmList";
import FilmRecommended from "./pages/home/FilmRecommended";
import { useUser } from "./services/userManager/userService";

function App() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem("loggedWTWSession");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, [setUser]);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
