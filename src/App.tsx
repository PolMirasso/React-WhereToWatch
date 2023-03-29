import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import { Container, Button } from "@mui/material";
import { NavBar } from "./common/NavBar";
import FilmList from "./components/UserFilmsList/FilmList";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <FilmList />
    </BrowserRouter>
  );
}

export default App;
