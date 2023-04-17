import React from "react";
import { useState, useEffect } from "react";
import FilmList from "./FilmList";

function FilmRecommended() {
  interface FilmGenres {
    id: number;
    name: string;
  }

  const [filmGenres, setFilmGenres] = useState<FilmGenres[]>([]);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getGenres/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            language: "es",
          }).toString(),
        }
      );
      const data = await response.json();

      console.log("Dades obtingudes");

      setFilmGenres(data["genres"]);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {}, [filmGenres]);

  return (
    <>
      <FilmList
        key={"valorades"}
        propsReceive={{
          title: "Pelicules mes valorades",
          url: "getTopRatedFilms/",
          genreid: 0,
        }}
      />

      <FilmList
        key={"popular"}
        propsReceive={{
          title: "Pelicules populars",
          url: "getPopularFilms/",
          genreid: 0,
        }}
      />

      <FilmList
        key={"upcoming"}
        propsReceive={{
          title: "Pelicules recients",
          url: "getUpcomingFilms/",
          genreid: 0,
        }}
      />

      {/* Add a conditional check to verify that the filmGenres state is loaded */}
      {filmGenres.length > 0 && (
        <>
          {filmGenres.map((genres) => (
            <FilmList
              key={genres.name}
              propsReceive={{
                title: "Pelicules " + genres.name,
                url: "getMoviesByGenre/",
                genreid: genres.id,
              }}
            />
          ))}
        </>
      )}
    </>
  );
}

export default FilmRecommended;
