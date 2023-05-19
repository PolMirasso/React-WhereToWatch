import "./App.css";
import { useEffect, useCallback, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import { AuthProvider } from "./context/AuthProvider";
import Cookies from "js-cookie";
import checkToken from "./services/userManager/verifyToken";

function App() {
  async function tokenCheck() {
    const token = await Cookies.get("authToken");
    if (token) {
      await checkToken.checkToken({ token });
    }
    return;
  }

  useEffect(() => {
    tokenCheck();
  });

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
