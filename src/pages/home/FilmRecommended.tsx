import React from "react";
import { useState, useEffect } from "react";
import FilmList from "./FilmList";
import FilmListBig from "./FilmListBig";
import film_styles from "../../module/filmList.module.css";
import navbar_styles from "../..//module/navbar.module.css";
import Cookies from "js-cookie";
import ListManager from "../../services/listManager/getUserList";

function FilmRecommended() {
  interface GenresFormat {
    id: number;
    name: string;
  }

  const [filmGenres, setFilmGenres] = useState<GenresFormat[]>([]);
  const [serieGenres, setSerieGenres] = useState<GenresFormat[]>([]);

  const [userList, setUserList] = useState([]);

  async function getList() {
    const token = await Cookies.get("authToken");

    let data_Recived = await ListManager.getList({ token });
    setUserList(data_Recived["data"]);
  }

  useEffect(() => {
    getList()["data"];
  }, []);

  async function fetchData() {
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

      setFilmGenres(data["genres"]);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
    try {
      const response = await fetch(
        "https://wheretowatch-vps.herokuapp.com/getSeriesGenres/",
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

      setSerieGenres(data["genres"]);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {}, [filmGenres]);

  return (
    <>
      <div
        className={`${navbar_styles.section} ${film_styles.home} ${navbar_styles.container}`}
      >
        <FilmListBig
          key={"upcomingbig"}
          propsReceive={{
            title: "Pel·lícules recients",
            url: "getUpcomingFilms/",
            genreid: 0,
          }}
        ></FilmListBig>
      </div>

      <div
        className={`${film_styles.section} ${film_styles.popular} ${film_styles.container}`}
      >
        <FilmList
          key={"upcoming"}
          propsReceive={{
            title: "Pel·lícules recients",
            url: "getUpcomingFilms/",
            genreid: 0,
            userList: userList,
            type: 0,
            methodList: 0,
          }}
        />
        <FilmList
          key={"popular"}
          propsReceive={{
            title: "Pel·lícules populars",
            url: "getPopularFilms/",
            genreid: 0,
            userList: userList,
            type: 0,
            methodList: 0,
          }}
        />
        <FilmList
          key={"valorades"}
          propsReceive={{
            title: "Pel·lícules mes valorades",
            url: "getTopRatedFilms/",
            genreid: 0,
            userList: userList,
            type: 0,
            methodList: 0,
          }}
        />
        <>
          {serieGenres.length > 0 && (
            <>
              {serieGenres.map((genres) =>
                genres.name !== "Talk" && genres.name !== "News" ? (
                  <FilmList
                    key={"series-" + genres.id}
                    propsReceive={{
                      title: "Series " + genres.name,
                      url: "getSeriesByGenre/",
                      genreid: genres.id,
                      userList: userList,
                      type: 1,
                      methodList: 0,
                    }}
                  />
                ) : (
                  <div key={"series-" + genres.id}></div>
                )
              )}
            </>
          )}
        </>
        {/* error key */}
        {filmGenres.length > 0 && (
          <>
            {filmGenres.map((genres) => (
              <FilmList
                key={"films-" + genres.id}
                propsReceive={{
                  title: "Pel·lícules " + genres.name,
                  url: "getMoviesByGenre/",
                  genreid: genres.id,
                  userList: userList,
                  type: 0,
                  methodList: 0,
                }}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default FilmRecommended;
