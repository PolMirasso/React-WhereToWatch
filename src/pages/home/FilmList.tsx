import { useState, useEffect } from "react";
import page_styles from "../../module/main.module.css";
import film_styles from "../../module/films.module.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

// Import Swiper styles
import "swiper/css";

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
      console.log("asad: " + page);
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

          <div className="popular-content">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {films.map((film) => (
                <SwiperSlide>
                  <div key={film.film_id}>
                    <img src={film.poster_path} alt={film.title} width="150" />
                    <h2>{film.title}</h2>
                  </div>
                </SwiperSlide>
              ))}
              <SwiperSlide>
                <a onClick={incrementPage}>
                  <img
                    src="https://cdn.discordapp.com/attachments/901198693489852506/1091294619679068190/Untitled-1.png"
                    alt=""
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
