import React, { useRef, useEffect, useState, useContext } from "react";
import { Container, Button, Grid } from "@mui/material";
import Paper from "@mui/material/Paper/Paper";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import TextField from "@mui/material/TextField";
import { ThemeConfig } from "../../config/theme.config";
import film_styles from "../../module/loginregister.module.css";

import loginService from "../../services/userManager/login";

export const LoginPage: React.FC<{}> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event: any) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      console.log(user);
      // window.localStorage.setItem("loggedWTWSession", JSON.stringify(user));

      setUsername("");
      setPassword("");
    } catch (e) {
      console.log("login error:" + e);
    }
  };

  return (
    <ThemeConfig>
      <Container maxWidth="sm">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid item>
            <Paper sx={{ padding: "5.2em", borderRadius: "1em" }}>
              <div className={film_styles.logo}>
                <a href="/" className={film_styles.logo}>
                  W<span>T</span>W
                </a>
              </div>
              <Typography variant="h6">
                Inicia sessió per a continuar:
              </Typography>
              <Box component="form" onSubmit={handleLogin}>
                <TextField
                  name="username"
                  margin="normal"
                  fullWidth
                  label="Username"
                  type="text"
                  sx={{ mt: 2, mb: 1.5 }}
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <TextField
                  name="password"
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  sx={{ mt: 1.5, mb: 1.5 }}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 1.5, mb: 3 }}
                >
                  <a className={film_styles.inicia}>Iniciar Sessió</a>
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeConfig>
  );
};
