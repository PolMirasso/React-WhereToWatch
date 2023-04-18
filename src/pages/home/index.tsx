import React from "react";
import { Container, Button } from "@mui/material";
import FilmRecommended from "./FilmRecommended";

export const HomePage: React.FC<{}> = () => {
  return (
    <>
      <Container sx={{ mt: 9 }} maxWidth="xl">
        <FilmRecommended />
      </Container>
    </>
  );
};

export default HomePage;
