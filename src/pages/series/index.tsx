import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import film_styles from "../../module/filmpage.module.css";
import navbar_styles from "../../module/navbar.module.css";
import ReactPlayer from "react-player";
import FilmList from "../home/FilmList";

interface SerieInfoProps {
  adult: boolean;
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air: null | {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export const SeriePage = () => {
  let location = useLocation();
  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [provinceState, setProvinceState] = useState<{
    [province: string]: boolean;
  }>({});

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [serieData, setserieData] = useState<SerieInfoProps>();

  const urlId = location.pathname.split("/")[2];
  const scroller = useRef(null);

  //Consultes al BackEnd

  //Dades pelicula completes

  async function fetchDataSeries() {
    try {
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getSeriesData/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            movie_id: urlId,
            language:
              navigator.language.split("-").length < 1
                ? navigator.language
                : navigator.language.split("-")[1].toLowerCase(),
          }).toString(),
        }
      );
      const data = await response.json();
      setserieData(data);
      console.log("");
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }

  //Auto Scroll Al inici

  useEffect(() => {
    scroller.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  //Use Effect de les funcions

  useEffect(() => {
    fetchDataSeries();

    scroller.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div ref={scroller}>
        <div
          className={`${film_styles.play_container} ${navbar_styles.container}`}
        >
          <img
            src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${serieData?.backdrop_path}`}
            alt=""
            className={film_styles.play_img}
          />
          <div className={film_styles.container_no}>
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${serieData?.poster_path}`}
              alt=""
              className={film_styles.play_img_portada_no}
            />
            <div className={film_styles.play_text}>
              <h1>{serieData?.name}</h1>
            </div>
          </div>
        </div>
        <div
          className={`${film_styles.play_container} ${navbar_styles.container}`}
        >
          <h1>Valoració:</h1>
          <div className="rating">
            <i className="bx bxs-star">{serieData?.vote_average}</i>
          </div>
          <br />
          <h1>Genere:</h1>
          <br />
          <div className="tags">
            {serieData?.genres.map((genre) => (
              <span key={genre.id}>
                {" "}
                <a href={`/#${genre.name}`}>{genre.name} </a>
              </span>
            ))}
          </div>
          <br />
          <h1>Sinopsis:</h1>
          <br />
          <div className="tags">
            <label>{serieData?.overview}</label>
          </div>
          <br />
          <h1>Estudis:</h1>
          <div className="tags">
            {serieData?.production_companies.map((production_companies) => (
              <span key={production_companies.id}>
                <br />· {production_companies.name}
              </span>
            ))}
          </div>
          <br />
          <br />
        </div>
      </div>
    </>
  );
};