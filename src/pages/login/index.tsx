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

    try {
      const result = await loginService.login({ username, password });
      // const result = await loginService.login({ username, password });

      setUsername("");
      setPassword("");

      if (result.status == "ok") {
        history("/");
      } else {
        // alert("Error" + result.data.non_field_errors);
        setError(result.data.non_field_errors);
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
              "url(https://c4.wallpaperflare.com/wallpaper/621/859/641/peliculas-terror-wallpaper-preview.jpg)",
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Where
              <span style={{ color: "var(--main-color)" }}>To</span>
              Watch
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
              <span>Where</span>
              <span style={{ color: "var(--main-color)" }}>To</span>
              <span>Watch</span>
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

              {/* <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
                <a href="#">Forgot your password?</a>
              </div> */}
              <span className="text-sm text-red-600">{error}</span>
              <div className="px-4 pb-2 pt-4">
                <button className="uppercase block w-full p-4 text-lg rounded-full bg-yellow-500 hover:bg-yellow-600 focus:outline-none">
                  Iniciar Sessió
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

    // <ThemeConfig>
    //   <Container maxWidth="sm">
    //     <Grid
    //       container
    //       direction="column"
    //       alignItems="center"
    //       justifyContent="center"
    //       sx={{ minHeight: "100vh" }}
    //     >
    //       <Grid item>
    //         <Paper sx={{ padding: "5.2em", borderRadius: "1em" }}>
    //           <div className={film_styles.logo}>
    //             <a href="/" className={film_styles.logo}>
    //               W<span>T</span>W
    //             </a>
    //           </div>
    //           <Typography variant="h6">
    //             Inicia sessió per a continuar:
    //           </Typography>
    //           <Box component="form" onSubmit={handleLogin}>
    //             <TextField
    //               name="username"
    //               margin="normal"
    //               fullWidth
    //               label="Username"
    //               type="text"
    //               sx={{ mt: 2, mb: 1.5 }}
    //               required
    //               value={username}
    //               onChange={(event) => setUsername(event.target.value)}
    //             />
    //             <TextField
    //               name="password"
    //               margin="normal"
    //               fullWidth
    //               label="Password"
    //               type="password"
    //               sx={{ mt: 1.5, mb: 1.5 }}
    //               required
    //               value={password}
    //               onChange={(event) => setPassword(event.target.value)}
    //             />
    //             <p className="error">{error}</p>

    //             <Button
    //               fullWidth
    //               type="submit"
    //               variant="contained"
    //               sx={{ mt: 1.5, mb: 3 }}
    //             >
    //               <a className={film_styles.inicia}>Iniciar Sessió</a>
    //             </Button>
    //           </Box>
    //         </Paper>
    //       </Grid>
    //     </Grid>
    //   </Container>
    // </ThemeConfig>
  );
};
