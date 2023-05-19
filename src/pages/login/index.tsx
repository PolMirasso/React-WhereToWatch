import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import loginService from "../../services/userManager/login";

export const LoginPage: React.FC<{}> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useNavigate();

  const handleLogin = async (event: any) => {
    event.preventDefault();

    if (username === "") return setError("El nom d'usuari es obligatori");
    if (password === "") return setError("La contrasenya és obligatòria");

    setError("");

    try {
      const result = await loginService.login({ username, password });

      if (result.status === 200) {
        setUsername("");
        setPassword("");
        history("/");
      } else {
        console.log("error");
        let errorMessage = null;

        for (const key in result) {
          if (result.hasOwnProperty(key)) {
            const value = result[key];
            if (Array.isArray(value) && value.length > 0) {
              errorMessage = value[0];
              break;
            } else {
              errorMessage = value;
            }
          }
        }

        setError(errorMessage);
      }
    } catch (e) {
      console.log("login error:" + e);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-stretch text-white">
        <div
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage:
              "url(https://wheretowatch-vps.herokuapp.com/static/LoginBackground.jpg)",
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              <a href="/">
                Where
                <span style={{ color: "var(--main-color)" }}>To</span>
                Watch
              </a>
            </h1>
            <p className="text-3xl my-4">
              Obtén informació sobre pel·lícules o sèries.
            </p>
          </div>
        </div>
        <div
          className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
          style={{ backgroundColor: "#161616" }}
        >
          <div
            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
            style={{
              backgroundImage:
                "url(https://wheretowatch-vps.herokuapp.com/static/LoginBackground.jpg)",
            }}
          >
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">
            <h1 className="my-6" style={{ fontSize: "4em" }}>
              <a href="/">
                Where
                <span style={{ color: "var(--main-color)" }}>To</span>
                Watch
              </a>
              <br />
            </h1>
            <p style={{ fontSize: "3em" }} className="text-gray-100">
              Login
            </p>
            <form
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
              onSubmit={handleLogin}
              encType="multipart/form-data"
            >
              <div className="pb-2 pt-4 ">
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  placeholder="Nom Usuari"
                  onChange={(event) => setUsername(event.target.value)}
                  defaultValue={username}
                  className="block w-full p-4 text-lg rounded-sm bg-black focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              <div className="pb-2 pt-4">
                <input
                  className="block w-full p-4 text-lg rounded-sm bg-black focus:ring-yellow-500 focus:border-yellow-500"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  defaultValue={password}
                  placeholder="Contrasenya"
                />
              </div>

              <span className="text-sm text-red-600">{error}</span>
              <div className="px-4 pb-2 pt-4">
                <button className="uppercase block w-full p-4 text-lg rounded-full bg-yellow-500 hover:bg-yellow-600 focus:outline-none">
                  Iniciar Sessió
                </button>
                <p className="text-3xl my-4">
                  No tens compte,{" "}
                  <a className="color text-yellow-500" href="/register">
                    registrat
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
