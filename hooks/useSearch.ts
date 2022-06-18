import { useRouter } from "next/router";
import { useState } from "react";
import querystring from 'query-string'

import React from 'react'

type SearchContextType = {
  query: string
  setQuery: (query: string) => void
}

export const SearchContext = React.createContext<SearchContextType>({
  query: '',
  setQuery: () => { },
})

export const { Provider, Consumer } = SearchContext



export const OptimizedSearch = ({ }: { [key: string]: string | string[] }) => {
  const url = new URLSearchParams(useRouter().asPath.split('?')[1])
  const qs = querystring.parse(window.location.search)
  return `/search?q=${qs.q}&type=${qs.q}`
}


export default function useSearch(search: string) {
  const [query, setQuery] = useState(search);
  const { push, query: q } = useRouter()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === 'string') {
      setQuery(e)
    }
    else {
      setQuery(e.target.value);
      console.log(q)
      return push(`/search?q=${e.target.value.trim()}`);
    }
  };

  return {
    query,
    setQuery,
    handleSearch,

  };
}