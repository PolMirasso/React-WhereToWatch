import { useParams } from "react-router-dom";
import navbar_styles from "../../module/navbar.module.css";
import film_styles from "../../module/filmList.module.css";
import list_styles from "../../module/MovieList/movieList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import FilmList from "../home/FilmList";
import ListManager from "../../services/listManager/getUserList";

export const ListPage: React.FC = () => {
  const [userList, setUserList] = useState([]);

  async function getList() {
    const token = await Cookies.get("authToken");

    let data_Recived = await ListManager.getList({ token });
    setUserList(data_Recived["data"]);
    console.log(data_Recived["data"]);
  }

  useEffect(() => {
    getList()["data"];
  }, []);

  return (
    <div
      className={`${film_styles.section} ${film_styles.popular} ${film_styles.container}`}
    >
      {userList.map((list) => (
        <FilmList
          key={list.list_id}
          propsReceive={{
            title: list.list_name,
            url: "getFilmTitleAndImage/",
            render_next_page: false,
            list_content: JSON.stringify(list.list_content),
          }}
        />
      ))}
    </div>
  );
};
