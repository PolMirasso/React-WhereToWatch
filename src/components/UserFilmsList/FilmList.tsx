import { useState, useEffect } from "react";

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
      const response = await fetch("http://127.0.0.1:8000/getTopRatedFilms/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          num_page: page.toString(),
          language: "ca",
        }).toString(),
      });
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
    <div>
      <ul className="movies">
        {films.map((film) => (
          <div key={film.film_id}>
            <li className="movie">
              <img src={film.poster_path} alt={film.title} width="100" />
              <h2>{film.title}</h2>
            </li>
          </div>
        ))}
      </ul>

      <button onClick={incrementPage}>Prev page</button>
      <button onClick={decrementPage}>Next page</button>
    </div>
  );
}

export default FilmList;
