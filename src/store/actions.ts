import { Dispatch } from "redux"
import { getBooksList, getBook, URLFields } from "../utils"

import { BookAction, ActionTypes } from "./types"

const fetchBooksByChunks = (urlParams: URLFields, chunksMount: number, step: number) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      dispatch({ type: ActionTypes.FETCH_BOOKS })
      await getBooks({ ...urlParams, startIndex: "0" }, ActionTypes.SET_BOOKS)(dispatch)

      for (let i = 1; i <= chunksMount; i++) {
        await getBooks({ ...urlParams, startIndex: String(i * step) }, ActionTypes.ADD_BOOKS)(dispatch)
      }

      dispatch({ type: ActionTypes.FETCH_BOOKS_SUCCES })
    } catch {
      dispatch({ type: ActionTypes.FETCH_BOOKS_ERROR })
    }
  }
}

const fetchActionCreator = (action: (dispatch: Dispatch<BookAction>) => void) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      dispatch({ type: ActionTypes.FETCH_BOOKS })
      await action(dispatch)
      dispatch({ type: ActionTypes.FETCH_BOOKS_SUCCES })
    } catch {
      dispatch({ type: ActionTypes.FETCH_BOOKS_ERROR })
    }
  }
}

const getBooks =
  (urlParams: URLFields, type: ActionTypes.ADD_BOOKS | ActionTypes.SET_BOOKS) => (dispatch: Dispatch<BookAction>) =>
    getBooksList(urlParams).then((parsedData) => dispatch({ type, payload: parsedData }))

const getCurrentBook = (id: string) => (dispatch: Dispatch<BookAction>) =>
  getBook(id).then((parsedData) => dispatch({ type: ActionTypes.SET_CURRENT_BOOK, payload: parsedData }))

export const actions = {
  fetchBooksByChunks,
  setBooks: (urlParams: URLFields) => fetchActionCreator(getBooks(urlParams, ActionTypes.SET_BOOKS)),
  addBooks: (urlParams: URLFields) => fetchActionCreator(getBooks(urlParams, ActionTypes.ADD_BOOKS)),
  setCurrentBook: (id: string) => fetchActionCreator(getCurrentBook(id)),
  clearBooks: () => {
    return (dispatch: Dispatch<BookAction>) => {
      dispatch({ type: ActionTypes.CLEAR_BOOKS })
    }
  }
}
