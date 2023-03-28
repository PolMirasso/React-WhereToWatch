import { useState, useEffect } from "react";

function FilmList() {
  interface Film {
    film_id: number;
    title: string;
    poster_path: string;
  }

  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    //when the component loads execute this
    async function fetchData() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/getTopRatedFilms/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              num_page: "1",
              language: "ca",
            }).toString(),
          }
        );
        const data = await response.json();
        setFilms(data);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {films.map((film) => (
        <div key={film.film_id}>
          <h2>{film.title}</h2>
          <img src={film.poster_path} alt={film.title} />
        </div>
      ))}
    </div>
  );
}

export default FilmList;
