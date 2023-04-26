import { useState, useEffect } from "react";
import film_styles from "../../module/filmList.module.css";
import navbar_styles from "../..//module/navbar.module.css";

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

function FilmList(props) {
  const history = useNavigate();

  interface Film {
    film_id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  }

  const [films, setFilms] = useState<Film[]>([]);
  const [page, setPage] = useState(1);

  const incrementPage = () => {
    // Update state with incremented value
    setPage(page + 1);
  };

  async function fetchData() {
    try {
      let response;

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
      }

      const data = await response.json();

      console.log("peticio:" + props.propsReceive.title);

      const dataFinal = films.concat(data);

      setFilms(dataFinal);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <div
        className={`${navbar_styles.section} ${film_styles.popular} ${navbar_styles.container} ${film_styles.swiper} swiper`}
      >
        <div className={film_styles.heading}>
          <h2 className={film_styles.headingTitle}>
            {" "}
            {props.propsReceive.title}
          </h2>
        </div>

        <br />

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
              spaceBetween: 10,
            },
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
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
              <SwiperSlide
                key={film.film_id}
                onClick={(event) => {
                  event.preventDefault();
                  history(`film/${film.film_id}`);
                }}
              >
                <div className={film_styles.movieBox}>
                  {/* <a
                    href={`/film/${film.film_id}`}
                    className={film_styles.sliderContent}
                  > */}
                  <img
                    src={film.poster_path}
                    alt={film.title}
                    className={film_styles.movieImage}
                  />
                  <div className={film_styles.boxText}>
                    <h2 className={film_styles.movieTitle}>{film.title}</h2>
                    <span className={film_styles.movieType}>
                      {film.vote_average}
                    </span>
                    <a
                      href="#"
                      className={`${film_styles.watchBtn} ${film_styles.playBtn}`}
                    >
                      {/* icon className={`${film_styles.bx}`}  */}

                      <AiOutlinePlusCircle
                        className={`${film_styles.bx}`}
                      ></AiOutlinePlusCircle>
                    </a>
                  </div>
                  {/* </a> */}
                </div>
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <a onClick={incrementPage} className={film_styles.sliderContent}>
                <img
                  src="https://cdn.discordapp.com/attachments/901198693489852506/1091294619679068190/Untitled-1.png"
                  alt="btn_more"
                  className={film_styles.movieImage}
                />
              </a>
            </SwiperSlide>
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
