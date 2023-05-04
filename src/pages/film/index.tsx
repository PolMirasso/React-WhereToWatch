import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLocation } from "react-router-dom";
import film_styles from "../../module/filmpage.module.css";
import navbar_styles from "../../module/navbar.module.css";
import film_styles1 from "../../module/filmList.module.css";
import ReactPlayer from "react-player";
import FilmList from "../home/FilmList";
interface FilmInfoProps {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface FilmVideoProps {
  id: string;
  name: string;
  video: string;
}

export const FilmPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [filmData, setfilmData] = useState<FilmInfoProps>();
  const [filmDataVideo, setfilmDataVideo] = useState<FilmVideoProps>();
  const [filmDataSimilar, setfilmDataSimilar] = useState<FilmVideoProps>();
  const [filmDataProviders, setfilmDataProviders] = useState<FilmVideoProps>();
  let location = useLocation();
  const urlId = location.pathname.split("/")[2];

  async function fetchData() {
    try {
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getFilmData/",
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
      setfilmData(data);
      console.log("data recived");
      console.log(data);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }
  async function fetchDataVideo() {
    try {
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getMovieVideos/",
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
      const datavideo = await response.json();
      setfilmDataVideo(datavideo);
      console.log("data video");
      console.log(datavideo);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }
  async function fetchDataLocalitat() {
    try {
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getFilmDataCinema/",
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
      const datalocalitat = await response.json();
      setfilmDataProviders(datalocalitat);
      console.log("data localitat");
      console.log(datalocalitat);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }
  async function fetchDataCinemes() {
    try {
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getCinemaData/",
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
      const datacinema = await response.json();
      setfilmDataProviders(datacinema);
      console.log("data cinemes");
      console.log(datacinema);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }
  async function fetchDataProviders() {
    try {
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getProviders/",
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
      const dataproviders = await response.json();
      setfilmDataProviders(dataproviders);
      console.log("data providers");
      console.log(dataproviders);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }
  useEffect(() => {
    fetchDataVideo();
    fetchData();
    fetchDataProviders();
    fetchDataLocalitat();
    fetchDataCinemes();
  }, []);

  return (
    <>
      <div
        className={`${film_styles.play_container} ${navbar_styles.container}`}
      >
        <img
          src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${filmData?.backdrop_path}`}
          alt=""
          className={film_styles.play_img}
        />
        <div className={film_styles.container_no}>
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${filmData?.poster_path}`}
            alt=""
            className={film_styles.play_img_portada_no}
          />
          <div className={film_styles.play_text}>
            <h1>
              {filmData?.title} ({filmData?.release_date.split("-")[0]})
            </h1>
            <h3>{filmData?.tagline}</h3>
          </div>
        </div>
      </div>
      <div
        className={`${film_styles.play_container} ${navbar_styles.container}`}
      >
        <h4>Sinopsis:</h4>
        <div className="rating">
          <i className="bx bxs-star">{filmData?.vote_average}</i>
        </div>
        <br />
        <h4>Genere:</h4>
        <br />
        <div className="tags">
          {filmData?.genres.map((genre) => (
            <span key={genre.id}>
              {" "}
              <a href={`/#${genre.name}`}>{genre.name} </a>
            </span>
          ))}
        </div>
        <br />
        <h4>Sinopsis:</h4>
        <br />
        <div className="tags">
          <label>{filmData?.overview}</label>
        </div>
        <br />
        <h4>Estudis:</h4>
        <div className="tags">
          {filmData?.production_companies.map((production_companies) => (
            <span key={production_companies.id}>
              <br />
              {production_companies.name}
            </span>
          ))}
        </div>
        <div className="plaltaformes">filmDataProviders?</div>
        <button onClick={handleOpenModal} id="btn-abrir-trailer">
          Trailer
        </button>
        {showModal && (
          <div
            id="modal"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div>
              <button
                onClick={handleCloseModal}
                id="btn_cerrar_trailer"
                className={`${film_styles.btn_cerrar_trailer}`}
              ></button>
              <p>
                {" "}
                <div className={`${film_styles.video_source}`}>
                  <ReactPlayer
                    url={`${filmDataVideo[0]?.video}`}
                    width="100%"
                    height="100%"
                    controls
                    playing
                    muted
                    loop
                    playbackRate={1.75}
                    className="react-player"
                  />
                </div>
              </p>
            </div>
          </div>
        )}
        <FilmList
          key={"popular"}
          propsReceive={{
            title: "Pelicules Similars",
            url: "getSimilarMovie/",
            moveId: urlId,
          }}
        />
      </div>
    </>
  );
};
