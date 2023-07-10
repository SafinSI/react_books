import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { StateType, ActionTypes, BookAction } from "./types"

const initialState: StateType = {
  books: [],
  totalCount: 0,
  isLoading: false,
  isError: false
}

const reducer = (state = initialState, action: BookAction): StateType => {
  switch (action.type) {
    case ActionTypes.FETCH_BOOKS:
      return { ...state, isLoading: true }
    case ActionTypes.FETCH_BOOKS_ERROR:
      return { ...state, isLoading: false, isError: true }
    case ActionTypes.FETCH_BOOKS_SUCCES:
      return { ...state, isLoading: false, isError: false }
    case ActionTypes.SET_BOOKS:
      return { ...state, books: action.payload.books, totalCount: action.payload.totalCount }
    case ActionTypes.ADD_BOOKS:
      return { ...state, books: [...state.books, ...action.payload.books] }
    case ActionTypes.SET_CURRENT_BOOK:
      return { ...state, currentBook: action.payload, isLoading: false }
    case ActionTypes.CLEAR_BOOKS:
      return { ...state, books: [], totalCount: 0 }
    default:
      return state
  }
}

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export * from "./actions"
export * from "./types"
