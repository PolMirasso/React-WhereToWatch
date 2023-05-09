import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import film_styles from "../../module/filmList.module.css";
import navbar_styles from "../..//module/navbar.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";

function SlideFilm(props) {
  const navigate = useNavigate();
  const [btn_play, setBtn_play] = useState(true);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className={open ? "" : film_styles.cards}>
        <figure
          // className={`${film_styles.card} `}
          className={open ? "" : film_styles.card}
          onClick={(event) => {
            event.preventDefault();
            if (btn_play) {
              if (window.location.pathname === "/") {
                navigate(`/film/${props.propsReceive.film_id}`);
              } else {
                const url = `/film/${props.propsReceive.film_id}`;
                navigate(`/`);
                if (window.location.pathname === "/") {
                  setTimeout(() => {
                    navigate(url);
                  }, 100);
                }
              }
            }
            setBtn_play(true);
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
                      setBtn_play(false);
                      handleOpen();
                    }}
                  >
                    Tancar
                  </button>
                </li>
                <li className="lilist">Elemento 1</li>
              </ul>
            </div>
          ) : (
            <>
              <AiOutlinePlusCircle
                className={`${film_styles.bx}`}
                onClickCapture={(event) => {
                  event.preventDefault();
                  setBtn_play(false);
                  handleOpen();
                }}
              ></AiOutlinePlusCircle>
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
