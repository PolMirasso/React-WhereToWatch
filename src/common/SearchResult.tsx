import React from "react";
import searchresult_styles from "../module/searchResult.module.css";

export const SearchResult = ({ result }) => {
  if (!result.original_title) {
    return (
      <>
        <a
          href={`/serie/${result.id}`}
          className={searchresult_styles.searchResult}
        >
          {result.original_name}
        </a>
      </>
    );
  }
  return (
    <>
      <a
        href={`/film/${result.id}`}
        className={searchresult_styles.searchResult}
      >
        <div className={searchresult_styles.container}>
          <div>
            <img
              className={searchresult_styles.imgList}
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.poster_path}`}
              alt=""
            ></img>
          </div>
          <div className={searchresult_styles.titleContainer}>
            <div className={searchresult_styles.title}>
              {result.original_title}
            </div>
          </div>
        </div>
      </a>
    </>
  );
};
