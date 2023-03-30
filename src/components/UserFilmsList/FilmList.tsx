import { useState, useEffect } from "react";
import page_styles from "../../module/main.module.css";
import film_styles from "../../module/films.module.css";

function FilmList() {
  interface Film {
    film_id: number;
    title: string;
    poster_path: string;
  }

  const [films, setFilms] = useState<Film[]>([]);
  const [page, setPage] = useState(1);

  const incrementPage = () => {
    // Update state with incremented value
    setPage(page + 1);
    fetchData();
  };

  const decrementPage = () => {
    // Update state with incremented value
    setPage(page - 1);
    fetchData();
  };

  async function fetchData() {
    try {
      console.log("asad: " + page);
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getTopRatedFilms/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            num_page: page.toString(),
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
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Pelicules recomanades</h1>
        <ul className={film_styles.movies}>
          {films.map((film) => (
            <li key={film.film_id} className={film_styles.movie}>
              <img src={film.poster_path} alt={film.title} width="150" />
              <h2>{film.title}</h2>
            </li>
          ))}
        </ul>

        <button onClick={decrementPage}>Prev page</button>
        <button onClick={incrementPage}>Next page</button>
      </div>
    </>
  );
}

export default FilmList;
