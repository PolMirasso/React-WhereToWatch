import React from 'react'
import searchResults_styles from "../module/navbar.module.css"

interface SearchResultsProps {
  results: (data: any) => void;
  id:number;
}

export const SearchResultsList = ({results}: SearchResultsProps) => {
  return (
    <div className={searchResults_styles.searchList}>
        {results.map((result, id) => {
            return <div key={id}>{result.name}</div>
          })}
    </div>
  )
}
