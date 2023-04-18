import { useState, useEffect } from "react";
import film_styles from "../../module/filmList.module.css";
import navbar_styles from "../..//module/navbar.module.css";
import film_styles1 from "../../module/filmpage.module.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Scrollbar, A11y, Autoplay, Pagination } from "swiper";

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
    release_date: string;
    popularity: string;
    poster_path: string;
    backdrop_path: string;
  }

  const [films, setFilms] = useState<Film[]>([]);

  async function fetchData() {
    try {
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/" + props.propsReceive.url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            num_page: "1",
            language:
              navigator.language.split("-").length < 1
                ? navigator.language
                : navigator.language.split("-")[1].toLowerCase(),
            genres_id: props.propsReceive.genreid.toString(),
          }).toString(),
        }
      );

      const data = await response.json();

      console.log("peticio titol:" + props.propsReceive.title);

      setFilms(data); // Add the films from the current page to the existing films state
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        className={`${navbar_styles.section} ${film_styles.popular} ${navbar_styles.container} ${film_styles.swiper} swiper`}
      >
        <br />

        <Swiper
          modules={[Navigation, Scrollbar, A11y, Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={50}
          autoplay={{
            delay: 20000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
        >
          <div className={film_styles.sliderContent}>
            {films.map((film) => (
              <SwiperSlide key={film.film_id}>
                <div
                  className={`${film_styles1.play_container} ${navbar_styles.container}`}
                >
                  {" "}
                  <img
                    src={film.backdrop_path}
                    alt="Logo"
                    className={`${film_styles.homeImg} `}
                  />
                  <div className={`${film_styles1.play_text}`}>
                    <h1 className={`${film_styles.homeTitle}`}>{film.title}</h1>
                    {/* <p>genres</p> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </>
  );
}
export default FilmList;
