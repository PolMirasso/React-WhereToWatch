import { useState, useEffect } from "react";
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

function FilmList(props) {
  const navigate = useNavigate();
  interface Film {
    film_id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  }

  const [films, setFilms] = useState<Film[]>([]);
  const [page, setPage] = useState(1);
  const [btn_play, setBtn_play] = useState(true);
  const incrementPage = () => {
    setPage(page + 1);
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
        console.log("data similar movies");
        console.log(data);
      } else if (props.propsReceive.url == "getFilmTitleAndImage/") {
        // if (props.propsReceive.list_content.lenght() > 0) {
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
        });

        data = filtered_Data;
        // } else {
        //   data = {
        //     film_id: 0,
        //     title: "",
        //     vote_average: "",
        //     poster_path: "",
        //   };
        // }

        console.log("data getFilmTitleAndImage");
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
      <div className={` ${navbar_styles.container} swiper`}>
        <div className={`${film_styles.wrapper}`}>
          <h2>
            <strong>{props.propsReceive.title}</strong>
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
                <div className={`${film_styles.cards} `}>
                  <figure
                    className={`${film_styles.card} `}
                    onClick={(event) => {
                      event.preventDefault();
                      if (btn_play) {
                        if (window.location.pathname === "/") {
                          navigate(`/film/${film.film_id}`);
                        } else {
                          const url = `/film/${film.film_id}`;
                          navigate(`/`);
                          if (window.location.pathname === "/") {
                            setTimeout(() => {
                              navigate(url);
                            }, 100);
                          }
                        }
                      }
                      setBtn_play(true);
                    }}
                  >
                    <AiOutlinePlusCircle
                      className={`${film_styles.bx}`}
                      onClickCapture={(event) => {
                        event.preventDefault();
                        console.log("a");
                        setBtn_play(false);
                      }}
                    ></AiOutlinePlusCircle>
                    <img
                      src={film.poster_path}
                      className={`${film_styles.filmImages}`}
                    />

                    <figcaption
                      className={`${film_styles.figcaptionTitle} ${film_styles.boxText}`}
                    >
                      {film.title}{" "}
                    </figcaption>
                  </figure>
                </div>
              </SwiperSlide>
            ))}

            {props.propsReceive.render_next_page === undefined && (
              <SwiperSlide>
                <a
                  onClick={incrementPage}
                  className={film_styles.sliderContent}
                >
                  <img
                    src="https://cdn.discordapp.com/attachments/901198693489852506/1091294619679068190/Untitled-1.png"
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
