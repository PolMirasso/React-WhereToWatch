import React from "react";
import { useState, useEffect } from "react";
import FilmList from "./FilmList";
import FilmListBig from "./FilmListBig";
import film_styles from "../../module/filmList.module.css";
import navbar_styles from "../..//module/navbar.module.css";
import Cookies from "js-cookie";
import ListManager from "../../services/listManager/getUserList";

function FilmRecommended() {
  interface FilmGenres {
    id: number;
    name: string;
  }

  const [filmGenres, setFilmGenres] = useState<FilmGenres[]>([]);

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

      console.log("Dades obtingudes");

      setFilmGenres(data["genres"]);
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
          key={"upcoming"}
          propsReceive={{
            title: "Pelicules recients",
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
            title: "Pelicules recients",
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
            title: "Pelicules populars",
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
            title: "Pelicules mes valorades",
            url: "getTopRatedFilms/",
            genreid: 0,
            userList: userList,
            type: 0,
            methodList: 0,
          }}
        />
        {filmGenres.length > 0 && (
          <>
            {filmGenres.map((genres) => (
              <FilmList
                key={genres.name}
                propsReceive={{
                  title: "Pelicules " + genres.name,
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
