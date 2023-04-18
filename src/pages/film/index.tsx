import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLocation } from "react-router-dom";
import film_styles from "../../module/filmpage.module.css";
import navbar_styles from "../../module/navbar.module.css";
import film_styles1 from "../../module/filmList.module.css";

interface FilmInfoProps {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const FilmPage: React.FC = () => {
  const [filmData, setfilmData] = useState<FilmInfoProps>();

  let location = useLocation();
  const urlId = location.pathname.split("/")[2];

  async function fetchData() {
    try {
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getFilmData/",
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
      setfilmData(data);
      console.log(data);
      console.log("data recived");

      console.log(filmData);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }

  useEffect(() => {
    console.log("fsfd");
    fetchData();
  }, []);

  return (
    <>
      <div
        className={`${film_styles.play_container} ${navbar_styles.container}`}
      >
        <img
          src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${filmData?.backdrop_path}`}
          alt=""
          className={film_styles.play_img}
        />
        <div className={film_styles.container_no}>
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${filmData?.poster_path}`}
            alt=""
            className={film_styles.play_img_portada_no}
          />
        </div>
        <div className={film_styles.play_text}>
          <h2>{filmData?.title}</h2>
          <div className="rating">
            <i className="bx bxs-star">{filmData?.vote_average}</i>
          </div>

          <div className="tags">
            {filmData?.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <a href="#" className="watch-btn">
            <i className="bx bx-right-arrow"></i>
            <span>Watch the trailer</span>
          </a>
          <i className="bx bx-right-arrow play-movie"></i>
        </div>
      </div>
    </>
  );
};
