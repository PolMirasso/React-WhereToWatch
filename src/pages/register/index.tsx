import "../../module/tailwind/tailwind.css";
import React, { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import film_styles from "../../module/loginregister.module.css";
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

      const result = await registerService.register({
        username,
        password,
        image_profile,
        email,
      });
      setUsername("");
      setPassword("");
      setRepeatPassword("");
      setFileName("");
      setImage_profile("");
      setEmail("");

      if (result.status == "ok") {
        // history("/");
        console.log("correct");
      } else {
        result.data;
        setError(result.data);
        console.log(result.data);
      }
    } catch (e) {
      console.log("register error:" + e);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className={film_styles.logo}>
            <a href="/" className={`${film_styles.logo} mx-auto h-10 w-auto`}>
              W<span>T</span>W
            </a>
          </div>
          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Register
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleRegister}
            encType="multipart/form-data"
          >
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium leading-6 text-white"
              >
                Nom Usuari
              </label>
              <div className="mt-2">
                <input
                  id="user_name"
                  name="user_name"
                  onChange={(event) => setUsername(event.target.value)}
                  type="text"
                  autoComplete="user_name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Correu
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Contrasenya
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Repetir Contrasenya
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="repeat_password"
                  name="repeat_password"
                  type="password"
                  onChange={(event) => setRepeatPassword(event.target.value)}
                  autoComplete="none"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-2">
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
                  required
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div>
              {Object.entries(error).map(([key, value]) => (
                <div key={key}>{value}</div>
              ))}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Ja tens compte?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-yellow-400 hover:text-yellow-600"
            >
              Inicia Sessio
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
