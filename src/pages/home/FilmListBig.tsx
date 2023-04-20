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

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

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
    genre_ids: number[];
    poster_path: string;
    backdrop_path: string;
  }

  interface FilmGenres {
    id: number;
    name: string;
  }

  const [films, setFilms] = useState<Film[]>([]);
  const [filmGenres, setFilmGenres] = useState<FilmGenres[]>([]);

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

  async function fetchGenresData() {
    try {
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getGenres/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            language:
              navigator.language.split("-").length < 1
                ? navigator.language
                : navigator.language.split("-")[1],
          }).toString(),
        }
      );
      const data = await response.json();

      console.log("Dades generes obtingudes");

      console.log(data);

      setFilmGenres(data["genres"]);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }

  useEffect(() => {
    fetchGenresData();
    fetchData();
  }, []);

  return (
    <>
      <div
        className={`${navbar_styles.section} ${film_styles.popular} ${navbar_styles.container} ${film_styles.swiper} swiper`}
      >
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
                  <a
                    href={`/film/${film.film_id}`}
                    className={film_styles.sliderContent}
                  >
                    <img
                      src={film.backdrop_path}
                      alt="Logo"
                      className={`${film_styles.homeImg} `}
                    />
                    <div className={`${film_styles1.play_text}`}>
                      <h1 className={`${film_styles.homeTitle}`}>
                        {film.title}
                      </h1>
                      <p>
                        Genres:{" "}
                        {film.genre_ids
                          .map(
                            (id) =>
                              filmGenres.find((genre) => genre.id === id)?.name
                          )
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </div>
          <div
            className={`${film_styles.swiperPagination} swiper-pagination`}
          ></div>
        </Swiper>
      </div>
    </>
  );
}
export default FilmList;
