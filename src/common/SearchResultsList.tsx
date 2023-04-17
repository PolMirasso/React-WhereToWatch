import React from 'react'
import searchResults_styles from "../module/searchResultsList.module.css"
import { SearchResult } from './SearchResult';

interface SearchResultsProps {
  results: { name: string }[];
}

export const SearchResultsList = ({results}: SearchResultsProps) => {
  return (
    <div className={searchResults_styles.searchList}>
         {results.slice(0, 5).map((result, id) => {
            return <SearchResult result={result} key={id}/>
          })}
    </div>
  )
  
}
