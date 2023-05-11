import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import film_styles from "../../module/filmpage.module.css";
import navbar_styles from "../../module/navbar.module.css";
import FilmList from "../home/FilmList";

import { AiOutlinePlusCircle } from "react-icons/ai";
import Cookies from "js-cookie";

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

  const [page, setPage] = useState(1);

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
      setSerieData(data);
      console.log(data);
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
      console.log("data providers");
      let foundObject = null;
      for (let key in dataproviders.results) {
        if (key === "ES" || key === "TW") {
          foundObject = dataproviders.results[key];
        }
      }
      console.log(foundObject);
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
          className={`${film_styles.play_container} ${navbar_styles.container}`}
        >
          <br />
          <br /> <h1 className={`${film_styles.h1}`}>{serieData?.name}</h1>
          <div className={`${film_styles.season}`}>
            <div className={`${film_styles.season_container}`}>
              {serieData?.seasons.map((season) => (
                <div key={season.id}>
                  <div className={`${film_styles.season_poster_container}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${season.poster_path}`}
                      alt={`Season ${season.season_number} poster`}
                      onClick={() => handleSeasonClick(season.id)}
                    />
                  </div>
                  {selectedSeasonId === season.id && (
                    <div
                      className={`${film_styles.overlay}`}
                      onClick={() => handleSeasonClick(null)}
                    >
                      <div
                        className={`${film_styles.season_content_container}`}
                      >
                        <div
                          className={`${film_styles.season_details_container}`}
                        >
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
                                src={`https://image.tmdb.org/t/p/w300/${season.poster_path}`}
                                alt=""
                                className={film_styles.play_img_portada_no}
                              />
                              <div className={film_styles.play_text}>
                                <h1>{serieData?.name}</h1>
                              </div>
                            </div>
                          </div>
                          <h3>{season.name}</h3>
                          <p>{season.overview}</p>
                          <p>Number of Episodes: {season.episode_count}</p>
                          <p>Air Date: {season.air_date}</p>
                        </div>
                      </div>
                    </div>
                  )}{" "}
                </div>
              ))}
            </div>
          </div>
          <AiOutlinePlusCircle
            className={`${film_styles.bx}`}
            onClickCapture={(event) => {
              event.preventDefault();

              if (Cookies.get("authToken") === undefined) {
                navigate("/login");
              } else {
                handleOpen();
              }
            }}
          ></AiOutlinePlusCircle>
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
          <h1>Valoració de la Serie:</h1>
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
          <h1>Estudis:</h1>
          <div className="tags">
            {serieData?.production_companies.map((production_companies) => (
              <span key={production_companies.id}>
                <br />· {production_companies.name}
              </span>
            ))}
          </div>
          <h1>Tarifa:</h1>
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
