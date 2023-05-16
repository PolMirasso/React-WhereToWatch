import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import film_styles from "../../module/filmpage.module.css";
import navbar_styles from "../../module/navbar.module.css";
import ReactPlayer from "react-player";
import FilmList from "../home/FilmList";
import moment from "moment";
import CinemaList from "./CinemaList";

//PROPS INFO FILM

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

//PROPS TRAILER FILM

interface FilmVideoProps {
  id: string;
  name: string;
  video: string;
}

//PROPS PROVIDERS FILM

interface FilmProvidersProps {
  link: string;
  flatrate: Array<{
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }>;
  rent: Array<{
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }>;
  buy: Array<{
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }>;
}

export const FilmPage = () => {
  let location = useLocation();

  const today = moment().format("YYYYMMDD");
  const today2 = moment().format("DD / MM / YYYY");
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [showModal, setShowModal] = useState(false);

  //DATAS:

  const [filmData, setfilmData] = useState<FilmInfoProps>();
  const [filmDataVideo, setfilmDataVideo] = useState<FilmVideoProps>();
  const [filmDataProviders, setfilmDataProviders] =
    useState<FilmProvidersProps>();

  const urlId = location.pathname.split("/")[2];
  const scroller = useRef(null);

  //Consultes al BackEnd

  //Dades pelicula completes

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
      console.log("");
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }

  //Dades trailer pelicula

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
  //Dades tots proveidors de la pelicula

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
      console.log("data providers");
      let foundObject = null;
      for (let key in dataproviders.results) {
        if (key === "ES") {
          foundObject = dataproviders.results[key];
        }
      }
      console.log(foundObject);
      setfilmDataProviders(foundObject);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }

  //SCRAPPING PROVINCIA I CINES

  //Auto Scroll Al inici

  useEffect(() => {
    scroller.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  //Use Effect de les funcions

  useEffect(() => {
    fetchData();
    fetchDataVideo();
    fetchDataProviders();

    scroller.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div ref={scroller}>
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
            />
          </div>
          <div className={film_styles.play_text}>
            <h1>
              {filmData?.title} ({filmData?.release_date.split("-")[0]})
            </h1>
            <h1>{filmData?.tagline}</h1>

            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
              integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
            <div className={film_styles.trailer}>
              <div className={film_styles.botontrailer}>
                <div className={film_styles.trailer_text}>
                  <i className="fas fa-play">
                    {" "}
                    <button onClick={handleOpenModal} id="btn-abrir-trailer">
                      <br />{" "}
                      <h1 className={film_styles.trailer_text}>TRAILER</h1>
                    </button>
                  </i>
                </div>
              </div>
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
                          className="react-player"
                        />
                      </div>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`${film_styles.play_container_2} ${navbar_styles.container}`}
        >
          <div className={`${film_styles.progress}`}>
            <div
              className={`${film_styles.progress_bar}`}
              style={{ width: `${filmData?.vote_average * 10}%` }}
            >
              <span className={`${film_styles.progress_bar_text}`}>
                NOTA: {filmData?.vote_average}
              </span>
            </div>
          </div>

          <h1 className={`${film_styles.text_titles}`}>Genere:</h1>
          {filmData?.genres.map((genre) => (
            <span key={genre.id}>
              {" "}
              <a href={`/#${genre.name}`}>{genre.name} </a>
            </span>
          ))}
          <br />
          <br />
          <h1 className={`${film_styles.text_titles}`}>Sinopsis:</h1>
          <label>{filmData?.overview}</label>
          <br />
          <br />
          <h1 className={`${film_styles.text_titles}`}>Estudis:</h1>
          {filmData?.production_companies.map((production_companies) => (
            <span key={production_companies.id}>
              <br />· {production_companies.name}
            </span>
          ))}
          <br />
          <br />
          <h1 className={`${film_styles.text_titles}`}>Tarifa:</h1>
          <br />
          <div className={`${film_styles.providers}`}>
            <div className={`${film_styles.providers_container}`}>
              {filmDataProviders?.flatrate?.length ? (
                filmDataProviders.flatrate.map((provider) => (
                  <div key={provider.provider_id}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                    />
                    <p>{provider.provider_name}</p>
                  </div>
                ))
              ) : (
                <p>No no está disponible en ninguna plataforma.</p>
              )}
            </div>
          </div>
          <br />
          <h1 className={`${film_styles.text_titles}`}>Llogar:</h1>
          <br />
          <div className={`${film_styles.providers}`}>
            <div className={`${film_styles.providers_container}`}>
              {filmDataProviders?.rent?.length ? (
                filmDataProviders.rent.map((provider) => (
                  <div key={provider.provider_id}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                    />
                    <p>{provider.provider_name}</p>
                  </div>
                ))
              ) : (
                <p>No está disponible en ninguna plataforma.</p>
              )}
            </div>
          </div>
          <br />
          <h1 className={`${film_styles.text_titles}`}>Comprar:</h1>
          <br />
          <div className={`${film_styles.providers}`}>
            <div className={`${film_styles.providers_container}`}>
              {filmDataProviders?.buy?.length ? (
                filmDataProviders.buy.map((provider) => (
                  <div key={provider.provider_id}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                    />
                    <p>{provider.provider_name}</p>
                  </div>
                ))
              ) : (
                <p>No está disponible en ninguna plataforma.</p>
              )}
            </div>
          </div>
          <FilmList
            key={"popular"}
            propsReceive={{
              title: "Pelicules Similars",
              url: "getSimilarMovie/",
              moveId: urlId,
              type: 0,
            }}
          />
          <br />

          <h1 className={`${film_styles.provincia_text_global} text-center`}>
            Cartelera Cinemes dia {today2}
          </h1>

          <br />
          <CinemaList
            propsReceive={{
              title: filmData?.title,
            }}
          />
        </div>
      </div>
    </>
  );
};
