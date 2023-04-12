import React from "react";
import FilmList from "./FilmList";

function getGenres() {}

function FilmRecommended() {
  return (
    <>
      <FilmList
        key={"valorades"}
        propsReceive={{
          title: "Pelicules mes valorades",
          url: "getTopRatedFilms/",
        }}
      />

      <FilmList
        key={"popular"}
        propsReceive={{ title: "Pelicules populars", url: "getPopularFilms/" }}
      />

      <FilmList
        key={"upcoming"}
        propsReceive={{
          title: "Pelicules recients",
          url: "getUpcomingFilms/",
        }}
      />
    </>
  );
}

export default FilmRecommended;
