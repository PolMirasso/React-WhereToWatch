import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import { Container, Button } from "@mui/material";
import { NavBar } from "./common/NavBar";
import HomePage from "./pages/home";
import FilmList from "./pages/home/FilmList";
import FilmRecommended from "./pages/home/FilmRecommended";

function App() {
  return (
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
  );
}

export default App;
