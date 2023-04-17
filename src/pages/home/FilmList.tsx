import { useState, useEffect } from "react";
import film_styles from "../../module/filmList.module.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Scrollbar, A11y, Autoplay } from "swiper";

import { sliderClasses } from "@mui/material";
import { NavigationType } from "react-router-dom";
import FilmRecommended from "./FilmRecommended";

// interface RecivedData{

// function FilmList({ data }: {data:}) {

interface FilmListProps {
  propsReceive: {
    title: string;
    url: string;
    genreid: number;
  };
  key: string;
}

function FilmList(props: FilmListProps) {
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
              language: "es",
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
              language: "es",
            }).toString(),
          }
        );
      }

      const data = await response.json();

      console.log("peticio:" + props.propsReceive.title);

      const dataFinal = films.concat(data);

      setFilms(dataFinal); // Add the films from the current page to the existing films state
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <>
      <section className="popular container" id="popular">
        <div className="heading">
          <h2 className="heading-title"> {props.propsReceive.title}</h2>
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
          pagination={{
            clickable: true,
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
              <SwiperSlide key={film.film_id}>
                <a
                  href={`/film/${film.film_id}`}
                  className={film_styles.sliderContent}
                >
                  <img
                    src={film.poster_path}
                    alt={film.title}
                    className={film_styles.movieImage}
                  />
                  <h2 className={film_styles.filmBoxText}>{film.title}</h2>
                </a>
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
      </section>
    </>
  );
}
export default FilmList;
