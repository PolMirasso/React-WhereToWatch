import React from 'react'
import searchresult_styles from '../module/searchResult.module.css'

interface SearchResultsProps {
    result: any;
  }

export const SearchResult = ({result}: SearchResultsProps) => {
    console.log(result)
  return<div className={searchresult_styles.searchResult}>{result.original_title
  }</div>;
}
