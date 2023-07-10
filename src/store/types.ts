export type BookCardType = {
  id: string
  etag: string
  cover: string
  title: string
  category: string
  authors: string[]
  description?: string
}

export type StateType = {
  books: BookCardType[]
  totalCount: number
  isLoading: boolean
  isError: boolean
  currentBook?: BookCardType
}

export enum ActionTypes {
  FETCH_BOOKS = "FETCH_BOOKS",
  FETCH_BOOKS_ERROR = "FETCH_BOOKS_ERROR",
  FETCH_BOOKS_SUCCES = "FETCH_BOOKS_SUCCES",
  SET_BOOKS = "SET_BOOKS",
  ADD_BOOKS = "ADD_BOOKS",
  SET_CURRENT_BOOK = "SET_CURRENT_BOOK",
  CLEAR_BOOKS = "CLEAR_BOOKS"
}

export interface FetchBooksAction {
  type: ActionTypes.FETCH_BOOKS
}

export interface FetchBooksErrorAction {
  type: ActionTypes.FETCH_BOOKS_ERROR
}

export interface FetchBooksSuccesAction {
  type: ActionTypes.FETCH_BOOKS_SUCCES
}

export interface SetBooksAction {
  type: ActionTypes.SET_BOOKS
  payload: { books: BookCardType[]; totalCount: number }
}

export interface AddBooksAction {
  type: ActionTypes.ADD_BOOKS
  payload: { books: BookCardType[] }
}

export interface SetCurrentBookAction {
  type: ActionTypes.SET_CURRENT_BOOK
  payload: BookCardType
}

export interface ClearBooksAction {
  type: ActionTypes.CLEAR_BOOKS
}

export type BookAction =
  | FetchBooksAction
  | FetchBooksSuccesAction
  | FetchBooksErrorAction
  | SetBooksAction
  | AddBooksAction
  | SetCurrentBookAction
  | ClearBooksAction
