import "../../module/tailwind/tailwind.css";
import React, { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import registerService from "../../services/userManager/register";

type RegisterType = {
  username: string;
  password: string;
  email: string;
  age: number;
};

export const RegisterPage: React.FC<{}> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [fileName, setFileName] = useState("");
  const [image_profile, setImage_profile] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const history = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(event.target.files);
    setImage_profile(event.target.files[0]);
    setFileName(file.name);
  };

  const handleRegister = async (event: any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image_profile", image_profile);

    try {
      if (password != repeatPassword)
        return setError("Les contrasenyes no coincideixen");

      if (username === "") return setError("El nom d'usuari es obligatori");
      if (password === "") return setError("La contrasenya és obligatòria");
      if (repeatPassword === "")
        return setError("La repetició de contrasenya és obligatòria");
      if (image_profile === "")
        return setError("La imatge de perfil es obligatoria");
      setError("");

      const result = await registerService.register({
        username,
        password,
        image_profile,
        email,
      });

      console.log(result.ok);

      if (result.status === 200) {
        setUsername("");
        setPassword("");
        setRepeatPassword("");
        setFileName("");
        setImage_profile("");
        setEmail("");
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
      console.log("register error:" + e);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-stretch text-white">
        <div
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage:
              "url(https://c4.wallpaperflare.com/wallpaper/621/859/641/peliculas-terror-wallpaper-preview.jpg)",
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
                "url(https://c4.wallpaperflare.com/wallpaper/621/859/641/peliculas-terror-wallpaper-preview.jpg)",
            }}
          >
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">
            <h1 className="my-6" style={{ fontSize: "5em" }}>
              <a href="/">
                Where
                <span style={{ color: "var(--main-color)" }}>To</span>
                Watch
              </a>
              <br />
            </h1>
            <p style={{ fontSize: "3em" }} className="text-gray-100">
              Register
            </p>
            <form
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
              onSubmit={handleRegister}
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
                  type="email"
                  name="email"
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                  defaultValue={email}
                  placeholder="Email"
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
              <div className="pb-2 pt-4">
                <input
                  className="block w-full p-4 text-lg rounded-sm bg-black focus:ring-yellow-500 focus:border-yellow-500"
                  type="password"
                  name="repeat_password"
                  id="repeat_password"
                  onChange={(event) => setRepeatPassword(event.target.value)}
                  defaultValue={repeatPassword}
                  placeholder="Repetir Contrasenya"
                />
              </div>

              <div className="pb-2 pt-4">
                <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                  <span className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="font-medium text-gray-600">
                      {fileName ? fileName : "Drop files to Attach, or"}
                      <span className="text-blue-600 underline"> browse</span>
                    </span>
                  </span>
                  <input
                    type="file"
                    name="image_profile"
                    className="hidden"
                    autoComplete="none"
                    onChange={handleFileChange}
                    defaultValue={image_profile}
                  />
                </label>
              </div>

              <span className="text-sm text-red-600">{error}</span>
              <div className="px-4 pb-2 pt-4">
                <button className="uppercase block w-full p-4 text-lg rounded-full bg-yellow-500 hover:bg-yellow-600 focus:outline-none">
                  Registrar
                </button>
                <p className="text-3xl my-4">
                  Ja tens compte,{" "}
                  <a className="color text-yellow-500" href="/login">
                    inicia sessió
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
