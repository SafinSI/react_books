import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { StateType } from "../../store"
import { useActions } from "../../hooks"
import { Loader } from "../../components"
import style from "./style.module.css"

const useSelectors = () => ({
  currentBook: useSelector((state: StateType) => state.currentBook),
  isLoading: useSelector((state: StateType) => state.isLoading),
  isError: useSelector((state: StateType) => state.isError)
})

export const BookPage = () => {
  console.log("render book page")
  const { setCurrentBook } = useActions()
  const { isLoading, currentBook, isError } = useSelectors()
  const { id } = useParams()
  const isNeedToFetch = (!currentBook || currentBook?.id !== id) && !isLoading

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isNeedToFetch && id) {
    setCurrentBook(id)
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError || !currentBook) {
    return <span>Fetching Error</span>
  }

  return (
    <div className={style.card}>
      <figure className={style.cover}>
        <img src={currentBook.cover} className={style.cover_img} alt="book cover" />
      </figure>
      <div className={style.info_block}>
        <span className={style.category}>{currentBook.category}</span>
        <span className={style.title}>{currentBook.title}</span>
        <span className={style.author}>{currentBook.authors.join(", ")}</span>
        <p className={style.description}>{currentBook.description}</p>
      </div>
    </div>
  )
}
