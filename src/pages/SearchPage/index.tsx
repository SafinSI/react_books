import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

import { StateType } from "../../store"
import { SearchForm, FormState, BookCardsList, Loader } from "../../components"
import { useActions } from "../../hooks"

const MAX_RESULTS = 30

const defaultURLParams = {
  searchValue: "",
  sortBy: "relevance",
  category: "all",
  startIndex: "0"
}

const useSelectors = () => ({
  totalCount: useSelector((state: StateType) => state.totalCount),
  isLoading: useSelector((state: StateType) => state.isLoading),
  books: useSelector((state: StateType) => state.books)
})

export const SearchPage = () => {
  console.log("render Search Page")
  const { books, totalCount, isLoading } = useSelectors()
  const { addBooks, setBooks, fetchBooksByChunks } = useActions()
  const [searchParams, setSearchParams] = useSearchParams(defaultURLParams)

  const urlParams = {
    searchValue: searchParams.get("searchValue") || "",
    sortBy: searchParams.get("sortBy") || "relevance",
    category: searchParams.get("category") || "all",
    startIndex: searchParams.get("startIndex") || "0"
  }

  const onSubmit = ({ searchValue, sortBy, category }: FormState) => {
    urlParams.searchValue = searchValue
    urlParams.sortBy = sortBy
    urlParams.category = category
    urlParams.startIndex = "0"

    setSearchParams(urlParams)
    setBooks(urlParams)
  }

  const onClick = () => {
    urlParams.startIndex = String(Number(urlParams.startIndex) + MAX_RESULTS)

    setSearchParams(urlParams)
    addBooks(urlParams)
  }

  useEffect(() => {
    const isNeedToFetch = Boolean(searchParams.get("searchValue")) && books.length === 0

    if (isNeedToFetch) {
      const chunksMount = Math.ceil(Number(urlParams.startIndex) / MAX_RESULTS)
      fetchBooksByChunks(urlParams, chunksMount, MAX_RESULTS)
    }
  }, [])

  return (
    <>
      <SearchForm onSubmit={onSubmit} initialFormState={urlParams} />
      <span>Found {totalCount} results</span>
      <BookCardsList cards={books} />
      {isLoading && <Loader />}
      {totalCount > 0 && (
        <button onClick={onClick} className="button">
          Load more
        </button>
      )}
    </>
  )
}
