import { useState, useEffect } from "react";
import film_styles from "../../module/filmList.module.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import { sliderClasses } from "@mui/material";

function FilmList() {
  interface Film {
    film_id: number;
    title: string;
    poster_path: string;
  }

  const [films, setFilms] = useState<Film[]>([]);
  const [page, setPage] = useState(2);

  const incrementPage = () => {
    // Update state with incremented value
    setPage(page + 1);
    fetchData();
  };

  async function fetchData() {
    try {
      console.log(films);
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getTopRatedFilms/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            num_page: page.toString(),
            language: "ca",
          }).toString(),
        }
      );
      const data = await response.json();

      const dataFinal = films.concat(data);

      console.log("=================");
      console.log(dataFinal);
      console.log("=================");

      setFilms(dataFinal);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="home container" id="home">
        <section className="popular container" id="popular">
          <div className="heading">
            <h2 className="heading-title">Pelicules populars</h2>
          </div>

          <br />

          <div className={film_styles.sliderContent}>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              slidesPerView={1}
              spaceBetween={50}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
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
              }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {films.map((film) => (
                <SwiperSlide>
                  <div key={film.film_id} className={film_styles.sliderContent}>
                    <img
                      src={film.poster_path}
                      alt={film.title}
                      className={film_styles.movieImage}
                    />
                    <h2 className={film_styles.filmBoxText}>{film.title}</h2>
                  </div>
                </SwiperSlide>
              ))}
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
            </Swiper>
          </div>
        </section>
        {/* https://youtu.be/vwYiYMxUu4o?t=1290 */}
      </section>
    </>
  );
}

export default FilmList;
