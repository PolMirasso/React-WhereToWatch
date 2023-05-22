import { useParams } from "react-router-dom";
import navbar_styles from "../../module/navbar.module.css";
import film_styles from "../../module/filmList.module.css";
import list_styles from "../../module/MovieList/movieList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import FilmList from "../home/FilmList";
import ListManager from "../../services/listManager/getUserList";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import createList from "../../services/listManager/createList";

export const ListPage: React.FC = () => {
  const [userList, setUserList] = useState([]);
  const [newListName, setNewListName] = useState("");
  const navigate = useNavigate();

  async function getList() {
    const token = await Cookies.get("authToken");

    let data_Recived = await ListManager.getList({ token });
    setUserList(data_Recived["data"]);
  }

  useEffect(() => {
    if (Cookies.get("authToken") === undefined) {
      navigate("/login");
    } else {
      getList()["data"];
    }
  }, []);

  const handleLogin = async (event: any) => {
    event.preventDefault();

    try {
      await createList.createList({ newListName });

      setNewListName("");
      window.location.reload();
    } catch (e) {
      console.log("login error:" + e);
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className={`${film_styles.section}  ${navbar_styles.container}`}>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Crear Llista
            </label>
            <input
              type="text"
              id="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
              placeholder="Nom Llista"
              required
              onChange={(event) => setNewListName(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-yellow-600 dark:yellow:bg-blue-700 dark:focus:ring-blue-800"
          >
            Guardar
          </button>
        </form>
      </div>
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
              type: 2,
              methodList: 1,
              list: list,
            }}
          />
        ))}
      </div>
    </>
  );
};
