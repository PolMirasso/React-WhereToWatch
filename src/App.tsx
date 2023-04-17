import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import { NotificationProvider } from "./context/notification.context";
import FilmRecommended from "./pages/home/FilmRecommended";

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <AppRouter />
        <FilmRecommended />
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
