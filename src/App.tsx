import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import { Container, Button } from "@mui/material";
import { NavBar } from "./common/NavBar";
<<<<<<< Updated upstream
import FilmList from "./components/UserFilmsList/FilmList";
import { NotificationProvider } from "./context/notification.context";
import HomePage from "./pages/home";
=======
import FilmList from "./pages/home/FilmList";
>>>>>>> Stashed changes

function App() {
  return (
    <NotificationProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
