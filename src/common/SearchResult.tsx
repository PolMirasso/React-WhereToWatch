import React from "react";
import searchresult_styles from "../module/searchResult.module.css";

export const SearchResult = ({ result }) => {
  console.log(result);
  if (!result.original_title) {
    return (
      <a
        href={`/serie/${result.id}`}
        className={searchresult_styles.searchResult}
      >
        {result.original_name}
      </a>
    );
  }
  return (
    <a href={`/film/${result.id}`} className={searchresult_styles.searchResult}>
      {result.original_title}
    </a>
  );
};
