import React, { useState, useEffect } from "react";
import film_styles from "../../module/filmList.module.css";
import navbar_styles from "../..//module/navbar.module.css";

import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Scrollbar, A11y, Autoplay } from "swiper";

import { AiOutlinePlusCircle } from "react-icons/ai";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { generatePath } from "react-router-dom";
import Cookies from "js-cookie";
import SlideFilm from "./SlideFilm";
import deleteList from "../../services/listManager/deleteList";
import editListName from "../../services/listManager/editListName";

function FilmList(props) {
  const navigate = useNavigate();
  interface Film {
    film_id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    type: number;
  }

  const urlId = location.pathname.split("/")[2];
  const [films, setFilms] = useState<Film[]>([]);
  const [page, setPage] = useState(1);
  const [btn_play, setBtn_play] = useState(true);
  const [listName, setListName] = useState("");

  const incrementPage = () => {
    setPage(page + 1);
  };

  const [editList, setEditList] = React.useState(false);

  const handleEdit = () => {
    setEditList(!editList);
  };

  async function fetchData() {
    try {
      let response;
      let data;

      if (props.propsReceive.url == "getMoviesByGenre/") {
        response = await fetch(
          "https://wheretowatch-vps.herokuapp.com/" + props.propsReceive.url,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              num_page: page.toString(),
              language:
                navigator.language.split("-").length < 1
                  ? navigator.language
                  : navigator.language.split("-")[1].toLowerCase(),
              genres_id: props.propsReceive.genreid.toString(),
            }).toString(),
          }
        );
        data = await response.json();
      } else if (props.propsReceive.url == "getSeriesByGenre/") {
        response = await fetch(
          "https://wheretowatch-vps.herokuapp.com/" + props.propsReceive.url,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              num_page: page.toString(),
              language:
                navigator.language.split("-").length < 1
                  ? navigator.language
                  : navigator.language.split("-")[1].toLowerCase(),
              genres_id: props.propsReceive.genreid.toString(),
            }).toString(),
          }
        );
        data = await response.json();
      } else if (props.propsReceive.url == "getSimilarMovie/") {
        response = await fetch(
          "https://wheretowatch-vps.herokuapp.com/getSimilarMovie/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              movie_id: props.propsReceive.moveId,
              language:
                navigator.language.split("-").length < 1
                  ? navigator.language
                  : navigator.language.split("-")[1].toLowerCase(),
              page_num: page.toString(),
            }).toString(),
          }
        );
        data = await response.json();
      } else if (props.propsReceive.url == "getFilmTitleAndImage/") {
        if (JSON.parse(props.propsReceive.list_content).length > 0) {
          response = await fetch(
            "https://wheretowatch-vps.herokuapp.com/getFilmTitleAndImage/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Token " + (await Cookies.get("authToken")),
              },
              body: new URLSearchParams({
                list_content: props.propsReceive.list_content,
                language:
                  navigator.language.split("-").length < 1
                    ? navigator.language
                    : navigator.language.split("-")[1].toLowerCase(),
              }).toString(),
            }
          );
          data = await response.json();

          const filtered_Data = [];

          data.forEach((array, i) => {
            array.forEach((obj) => {
              const newObj = {
                film_id: obj.film_id,
                title: obj.title,
                vote_average: obj.vote_average,
                poster_path: obj.poster_path,
                type: obj.type,
              };

              filtered_Data.push(newObj);
            });
          });

          data = filtered_Data;
        } else {
          data = [
            [
              {
                film_id: 0,
                title: "",
                vote_average: 0,
                poster_path: "",
              },
            ],
          ];
          const filtered_Data = [];

          data.forEach((array) => {
            array.forEach((obj) => {
              const newObj = {
                film_id: obj.film_id,
                title: obj.title,
                vote_average: obj.vote_average,
                poster_path: obj.poster_path,
              };

              filtered_Data.push(newObj);
            });
            data = filtered_Data;
          });
        }
      } else if (props.propsReceive.url == "getSeriesSimilars/") {
        response = await fetch(
          "https://wheretowatch-vps.herokuapp.com/" + props.propsReceive.url,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              movie_id: props.propsReceive.moveId,
            }).toString(),
          }
        );
        data = await response.json();
      } else {
        response = await fetch(
          "https://wheretowatch-vps.herokuapp.com/" + props.propsReceive.url,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              num_page: page.toString(),
              language:
                navigator.language.split("-").length < 1
                  ? navigator.language
                  : navigator.language.split("-")[1].toLowerCase(),
            }).toString(),
          }
        );
        data = await response.json();
      }

      const dataFinal = films.concat(data);
      setFilms(dataFinal);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }

  useEffect(() => {
    setFilms([]);
  }, []);

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <div
        className={` ${navbar_styles.container} swiper `}
        id={props.propsReceive.title.split(" ")[1]}
      >
        <div className={`${film_styles.wrapper} `}>
          <h2>
            <strong>
              {editList ? (
                <>
                  {" "}
                  <input
                    type="text"
                    id="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500 max-w-xs"
                    defaultValue={props.propsReceive.title}
                    onChange={(event) => setListName(event.target.value)}
                    required
                  />
                </>
              ) : (
                <>{props.propsReceive.title}</>
              )}

              {props.propsReceive.type == 2 ? (
                <>
                  <button
                    type="button"
                    onClickCapture={(event) => {
                      event.preventDefault();
                      deleteList.deleteList(props.propsReceive.list.list_id);
                      window.location.reload();
                    }}
                    className="float-right justify-end bg-gray-700 inline-block rounded border-2 border-yellow-600 px-6 pb-[6px] pt-1 text-xs font-medium uppercase leading-normal text-yellow-500 transition duration-150 ease-in-out hover:border-yellow-600 hover:text-yellow-600 focus:border-yellow-600 focus:text-yellow-600 focus:outline-none focus:ring-0 active:border-yellow-700 active:text-yellow-700  hover:bg-slate-800"
                    data-te-ripple-init
                  >
                    Eliminar
                  </button>

                  {editList ? (
                    <>
                      {" "}
                      <button
                        onClickCapture={(event) => {
                          event.preventDefault();
                          handleEdit();
                          editListName.updateListName(
                            listName,
                            props.propsReceive.list.list_id
                          );
                        }}
                        type="button"
                        className="float-right justify-end bg-gray-700 inline-block rounded border-2 border-yellow-600 px-6 pb-[6px] pt-1 text-xs font-medium uppercase leading-normal text-yellow-500 transition duration-150 ease-in-out hover:border-yellow-600 hover:text-yellow-600 focus:border-yellow-600 focus:text-yellow-600 focus:outline-none focus:ring-0 active:border-yellow-700 active:text-yellow-700 mx-1 hover:bg-slate-800"
                        data-te-ripple-init
                      >
                        Guardar
                      </button>
                    </>
                  ) : (
                    <>
                      {" "}
                      <button
                        onClickCapture={(event) => {
                          event.preventDefault();
                          handleEdit();
                        }}
                        type="button"
                        className="float-right justify-end bg-gray-700 inline-block rounded border-2 border-yellow-600 px-6 pb-[6px] pt-1 text-xs font-medium uppercase leading-normal text-yellow-500 transition duration-150 ease-in-out hover:border-yellow-600 hover:text-yellow-600 focus:border-yellow-600 focus:text-yellow-600 focus:outline-none focus:ring-0 active:border-yellow-700 active:text-yellow-700 mx-1 hover:bg-slate-800"
                        data-te-ripple-init
                      >
                        Editar
                      </button>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </strong>
          </h2>
        </div>

        <Swiper
          modules={[Navigation, Scrollbar, A11y, Autoplay]}
          slidesPerView={1}
          spaceBetween={50}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          breakpoints={{
            280: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            320: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            510: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            758: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            900: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
          }}
        >
          <div className={film_styles.sliderContent}>
            {films.map((film) => (
              <SwiperSlide key={film.film_id}>
                <SlideFilm
                  userList={props.propsReceive.userList}
                  propsReceive={{
                    film_id: film.film_id,
                    title: film.title,
                    poster_path: film.poster_path,
                    vote_average: film.vote_average,
                    type:
                      props.propsReceive.type == 2
                        ? film.type
                        : props.propsReceive.type,
                    methodList: props.propsReceive.methodList,
                    list: props.propsReceive.list,
                  }}
                />
              </SwiperSlide>
            ))}

            {props.propsReceive.render_next_page === undefined && (
              <SwiperSlide>
                <a
                  onClick={incrementPage}
                  className={film_styles.sliderContent}
                >
                  <img
                    src="https://wheretowatch-vps.herokuapp.com/static/add.png"
                    alt="btn_more"
                    className={film_styles.movieImage}
                  />
                </a>
              </SwiperSlide>
            )}
          </div>

          <div
            className={`${film_styles.SwiperButtonPrev} swiper-button-prev`}
          ></div>
          <div
            className={`${film_styles.SwiperButtonNext} swiper-button-next`}
          ></div>
        </Swiper>
      </div>
    </>
  );
}
export default FilmList;
