import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import film_styles from "../../module/filmList.module.css";
import navbar_styles from "../..//module/navbar.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import addList from "../../services/listManager/addContentList";
import removeList from "../../services/listManager/removeContentList";
import Cookies from "js-cookie";

function SlideFilm(props) {
  const navigate = useNavigate();
  const [btn_play, setBtn_play] = useState(true);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  async function getToken() {
    const token = await Cookies.get("authToken");
    return token;
  }

  return (
    <>
      <div className={open ? "" : film_styles.cards}>
        <figure
          className={open ? "" : film_styles.card}
          onClick={(event) => {
            event.preventDefault();

            if (btn_play) {
              if (window.location.pathname === "/") {
                if (props.propsReceive.type == 0) {
                  navigate(`/film/${props.propsReceive.film_id}`);
                } else {
                  navigate(`/serie/${props.propsReceive.film_id}`);
                }
              } else {
                let url;
                if (props.propsReceive.type == 0) {
                  url = `/film/${props.propsReceive.film_id}`;
                } else {
                  url = `/serie/${props.propsReceive.film_id}`;
                }
                navigate(`/`);
                if (window.location.pathname === "/") {
                  setTimeout(() => {
                    navigate(url);
                  }, 100);
                }
              }
            }
          }}
        >
          {open ? (
            <div className={`lista`}>
              <ul className="ullist">
                <li className="lilist ">
                  <button
                    className="boton"
                    onClickCapture={(event) => {
                      event.preventDefault();
                      setBtn_play(true);

                      handleOpen();
                    }}
                  >
                    Tancar
                  </button>
                </li>
                {props.userList.map((listValue) => (
                  <li className="lilist" key={listValue.list_id}>
                    <a
                      onClick={async (event) => {
                        event.preventDefault();

                        try {
                          handleOpen();
                          setBtn_play(true);
                          await addList.addContentList({
                            obj_id: props.propsReceive.film_id,
                            obj_type: props.propsReceive.type,
                            list_id: listValue.list_id,
                          });
                        } catch (error) {}
                      }}
                    >
                      {listValue.list_name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              {props.propsReceive.methodList === 1 ? (
                <AiOutlineCloseCircle
                  className={`${film_styles.bx}`}
                  onClickCapture={(event) => {
                    event.preventDefault();
                    setBtn_play(false);
                    removeList.removeFromListContent({
                      obj_id: props.propsReceive.film_id,
                      obj_type: props.propsReceive.type,
                      list_id: props.propsReceive.list.list_id,
                    });
                  }}
                ></AiOutlineCloseCircle>
              ) : (
                <AiOutlinePlusCircle
                  className={`${film_styles.bx}`}
                  onClickCapture={(event) => {
                    event.preventDefault();
                    setBtn_play(false);

                    if (Cookies.get("authToken") === undefined) {
                      navigate("/login");
                    } else {
                      handleOpen();
                    }
                  }}
                ></AiOutlinePlusCircle>
              )}

              <img
                src={props.propsReceive.poster_path}
                className={`${film_styles.filmImages}`}
              />

              <figcaption
                className={`${film_styles.figcaptionTitle} ${film_styles.boxText}`}
              >
                {props.propsReceive.title}{" "}
              </figcaption>
            </>
          )}
        </figure>
      </div>
    </>
  );
}

export default SlideFilm;
