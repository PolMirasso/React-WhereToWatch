import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import film_styles from "../../module/filmpage.module.css";
import navbar_styles from "../../module/navbar.module.css";
import FilmList from "../home/FilmList";

import { AiOutlinePlusCircle } from "react-icons/ai";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import addList from "../../services/listManager/addContentList";
import ListManager from "../../services/listManager/getUserList";

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
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

interface SerieProvidersProps {
  flatrate: any;
  countryCode: string;
  providers: {
    link: string;
    flatrate: {
      logo_path: string;
      provider_id: number;
      provider_name: string;
      display_priority: number;
    }[];
  };
}
export const SeriePage = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const [userList, setUserList] = useState([]);

  async function getList() {
    const token = await Cookies.get("authToken");

    let data_Recived = await ListManager.getList({ token });
    setUserList(data_Recived["data"]);
  }

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [serieData, setSerieData] = useState<SerieInfoProps>();
  const [serieProviders, setSerieProviders] = useState<SerieProvidersProps>();
  const urlId = location.pathname.split("/")[2];
  const scroller = useRef(null);

  const [selectedSeasonId, setSelectedSeasonId] = useState(null);

  const handleSeasonClick = (seasonId) => {
    setSelectedSeasonId((prevId) => (prevId === seasonId ? null : seasonId));
  };
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
      console.log(data);
      setSerieData(data);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }

  async function fetchProvidersSeries() {
    try {
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getSeriesProviders/",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            movie_id: urlId,
          }).toString(),
        }
      );
      const dataproviders = await response.json();

      let foundObject = null;
      for (let key in dataproviders.results) {
        if (key === "ES" || key === "TW") {
          foundObject = dataproviders.results[key];
        }
      }

      setSerieProviders(foundObject);
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
    fetchProvidersSeries();
    fetchDataSeries();
    getList();
    scroller.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div ref={scroller}>
        <div
          className={`${film_styles.play_container_top} ${navbar_styles.container}`}
        >
          <img
            src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${serieData?.backdrop_path}`}
            alt=""
          />
          <div className={film_styles.play_text_series}>
            <h1>
              {serieData?.name} ({serieData?.first_air_date.split("-")[0]})
            </h1>
            <h1>{serieData?.tagline}</h1>
          </div>
        </div>
        <div
          className={`${film_styles.play_container_bot} ${navbar_styles.container}`}
        >
          <div className={`${film_styles.season}`}>
            <div className={`${film_styles.season_container}`}>
              {serieData?.seasons.map((season) => (
                <div key={season.id}>
                  <div className={`${film_styles.season_poster_container}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${
                        season.poster_path || serieData?.backdrop_path
                      }`}
                      alt={`Season ${season.season_number} poster`}
                      onClick={() => handleSeasonClick(season.id)}
                    />
                  </div>
                  {selectedSeasonId === season.id && (
                    <div onClick={() => handleSeasonClick(null)}>
                      <div
                        className={`${film_styles.season_content_container}`}
                      >
                        <div className="flex flex-col items-cente md:flex-row md:max-w-xl">
                          <div className="flex-none w-48 relative min-sm:flex">
                            <img
                              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${
                                season.poster_path || serieData?.backdrop_path
                              }`}
                              alt=""
                            />
                          </div>
                          <form className="flex-auto pl-10">
                            <h1 className="flex-auto text-lg font-semibold text-slate-900">
                              <h3 className={`${film_styles.text_titles}`}>
                                {season.name}
                              </h3>
                            </h1>
                            <div className="w-full flex-none text-sm font-medium text-slate-900 mt-2">
                              <h1 className={`${film_styles.text_titles}`}>
                                Sinopsis:
                              </h1>
                              <br />
                              <label className={`${film_styles.text_info}`}>
                                {season.overview}
                              </label>
                              <br />
                              <br />
                              <div>
                                <h1 className={`${film_styles.text_titles}`}>
                                  Numero d'episodis:
                                </h1>
                                <label className={`${film_styles.text_info}`}>
                                  {season.episode_count}
                                </label>
                              </div>
                              <br />
                              <div>
                                <h1 className={`${film_styles.text_titles}`}>
                                  Data de llançament:
                                </h1>
                                <label className={`${film_styles.text_info}`}>
                                  {season.air_date}
                                </label>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}{" "}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <AiOutlinePlusCircle
              className={`${film_styles.bx} text-2xl`} // Ajusta el tamaño del ícono aquí
              onClickCapture={(event) => {
                event.preventDefault();

                if (Cookies.get("authToken") === undefined) {
                  navigate("/login");
                } else {
                  handleOpen();
                }
              }}
            />
            <span className="ml-2">Agregar a llistes</span>
          </div>

          {open ? (
            <>
              {" "}
              <div className={`lista`}>
                <ul className="ullist">
                  <li className="lilist ">
                    <button
                      className="boton"
                      onClickCapture={(event) => {
                        event.preventDefault();

                        handleOpen();
                      }}
                    >
                      Tancar
                    </button>
                  </li>
                  {userList.map((listValue) => (
                    <li className="lilist" key={listValue.list_id}>
                      <a
                        onClick={async (event) => {
                          event.preventDefault();

                          try {
                            handleOpen();
                            await addList.addContentList({
                              obj_id: urlId,
                              obj_type: 1,
                              list_id: listValue.list_id,
                            });
                          } catch (error) {}
                        }}
                      >
                        {listValue.list_name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <></>
          )}
          <br />
          <div className={`${film_styles.progress}`}>
            <div
              className={`${film_styles.progress_bar}`}
              style={{ width: `${serieData?.vote_average * 10}%` }}
            >
              <span className={`${film_styles.progress_bar_text}`}>
                NOTA: {serieData?.vote_average}
              </span>
            </div>
          </div>
          <h1 className={`${film_styles.text_titles}`}>Generes:</h1>
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
          <h1 className={`${film_styles.text_titles}`}>Estudis:</h1>
          <div className="tags">
            {serieData?.production_companies.map((production_companies) => (
              <span key={production_companies.id}>
                <br />· {production_companies.name}
              </span>
            ))}
          </div>
          <br />
          <h1 className={`${film_styles.text_titles}`}>Tarifa:</h1>
          <div className={`${film_styles.providers}`}>
            <div className={`${film_styles.providers_container}`}>
              {serieProviders?.flatrate?.length ? (
                serieProviders.flatrate.map((provider) => (
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
        </div>
        <br />
        <FilmList
          key={"popular"}
          propsReceive={{
            userList: userList,
            type: 1,
            title: "Series Similars",
            url: "getSeriesSimilars/",
            moveId: urlId,
          }}
        />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};
//Joan TasiesF
