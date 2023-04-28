import { useParams } from "react-router-dom";
import navbar_styles from "../../module/navbar.module.css";
import film_styles from "../../module/filmList.module.css";
import list_styles from "../../module/MovieList/movieList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Cookies from "js-cookie";

export const ListPage: React.FC = () => {
  return (
    <div
      className={`${navbar_styles.section} ${film_styles.home} ${navbar_styles.container}`}
    >
      {" "}
      <div className={list_styles.background}></div>
      <div className={list_styles.backgroundTexture}></div>
      <section className={list_styles.carousel}>
        <h2 className={list_styles.categoriesTitle}>My List</h2>
        <div className={list_styles.carouselContainer}>
          <div className={list_styles.carouselItem}>
            <img
              className={list_styles.carouselItemImg}
              src="https://images.pexels.com/photos/708392/pexels-photo-708392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="people"
            />
            <div className={list_styles.carouselItemDetails}>
              <div className={list_styles.controls}>
                <span className="fas fa-play-circle"></span>
                <span className="fas fa-plus-circle"></span>
              </div>
              <h5 className={list_styles.carouselItemDetailsTitle}>
                Descriptive Title
              </h5>
              <h6 className={list_styles.carouselItemDetailsSubtitle}>
                Date and Duration
              </h6>
            </div>
          </div>

          <div className={list_styles.carouselItem}>
            <img
              className={list_styles.carouselItemImg}
              src="https://images.pexels.com/photos/1785001/pexels-photo-1785001.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="people"
            />
            <div className={list_styles.carouselItemDetails}>
              <div className={list_styles.controls}>
                <span className="fas fa-play-circle"></span>
                <span className="fas fa-plus-circle"></span>
              </div>
              <h5 className={list_styles.carouselItemDetailsTitle}>
                Descriptive Title
              </h5>
              <h6 className={list_styles.carouselItemDetailsSubtitle}>
                Date and Duration
              </h6>
            </div>
          </div>

          <div className={list_styles.carouselItem}>
            <img
              className={list_styles.carouselItemImg}
              src="https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="people"
            />
            <div className={list_styles.carouselItemDetails}>
              <div className={list_styles.controls}>
                <span className="fas fa-play-circle"></span>
                <span className="fas fa-plus-circle"></span>
              </div>
              <h5 className={list_styles.carouselItemDetailsTitle}>
                Descriptive Title
              </h5>
              <h6 className={list_styles.carouselItemDetailsSubtitle}>
                Date and Duration
              </h6>
            </div>
          </div>

          <div className={list_styles.carouselItem}>
            <img
              className={list_styles.carouselItemImg}
              src="https://images.pexels.com/photos/1071882/pexels-photo-1071882.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="people"
            />
            <div className={list_styles.carouselItemDetails}>
              <div className="controls">
                <span className="fas fa-play-circle"></span>
                <span className="fas fa-plus-circle"></span>
              </div>
              <h5 className={list_styles.carouselItemDetailsTitle}>
                Descriptive Title
              </h5>
              <h6 className={list_styles.carouselItemDetailsSubtitle}>
                Date and Duration
              </h6>
            </div>
          </div>
          <div className={list_styles.carouselItem}>
            <img
              className={list_styles.carouselItemImg}
              src="https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="people"
            />
            <div className={list_styles.carouselItemDetails}>
              <div className="controls">
                <span className="fas fa-play-circle"></span>
                <span className="fas fa-plus-circle"></span>
              </div>
              <h5 className={list_styles.carouselItemDetailsTitle}>
                Descriptive Title
              </h5>
              <h6 className={list_styles.carouselItemDetailsSubtitle}>
                Date and Duration
              </h6>
            </div>
          </div>
          <div className={list_styles.carouselItem}>
            <img
              className={list_styles.carouselItemImg}
              src="https://images.pexels.com/photos/6945/sunset-summer-golden-hour-paul-filitchkin.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="people"
            />
            <div className={list_styles.carouselItemDetails}>
              <div className="controls">
                <span className="fas fa-play-circle"></span>
                <span className="fas fa-plus-circle"></span>
              </div>
              <h5 className={list_styles.carouselItemDetailsTitle}>
                Descriptive Title
              </h5>
              <h6 className={list_styles.carouselItemDetailsSubtitle}>
                Date and Duration
              </h6>
            </div>
          </div>

          <div className={list_styles.carouselItem}>
            <img
              className={list_styles.carouselItemImg}
              src="https://images.pexels.com/photos/1964471/pexels-photo-1964471.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt="people"
            />
            <div className={list_styles.carouselItemDetails}>
              <div className="controls">
                <span className="fas fa-play-circle"></span>
                <span className="fas fa-plus-circle"></span>
              </div>
              <h5 className={list_styles.carouselItemDetailsTitle}>
                Descriptive Title
              </h5>
              <h6 className={list_styles.carouselItemDetailsSubtitle}>
                Date and Duration
              </h6>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
