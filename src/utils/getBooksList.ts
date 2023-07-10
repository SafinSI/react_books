import { sendRequest } from "./sendRequest"
import { RawBooksData, URLFields } from "./types"
import { apiKey, basicURL } from "../config"
import { BookCardType } from "../store"

type ParseBooksList = (booksData: RawBooksData) => { books: BookCardType[]; totalCount: number }

const parseBooksList: ParseBooksList = (booksData) => {
  if (!booksData.items) {
    return { books: [], totalCount: 0 }
  }
  const bookCards = booksData.items.map((item) => ({
    id: item.id,
    etag: item.etag,
    cover: item.volumeInfo.imageLinks?.smallThumbnail || "",
    title: item.volumeInfo.title,
    category: item.volumeInfo.categories ? item.volumeInfo.categories[0] : "",
    authors: item.volumeInfo.authors || []
  }))
  return { books: bookCards, totalCount: booksData.totalItems }
}

const parseUrl = ({ searchValue, sortBy, category, startIndex = "0" }: URLFields) => {
  const subject = category !== "all" ? `+subject:${category}` : ""
  return `${basicURL}/volumes?q=${searchValue}${subject}&orderBy=${sortBy}&startIndex=${startIndex}&maxResults=30&key=${apiKey}`
}

export const getBooksList = (url: URLFields) =>
  sendRequest({ url: parseUrl(url) }).then((response) => parseBooksList(response as RawBooksData))
