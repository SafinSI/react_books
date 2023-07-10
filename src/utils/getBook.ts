import { sendRequest } from "./sendRequest"
import { RawBook } from "./types"
import { basicURL } from "../config"
import { BookCardType } from "../store"

type ParseBook = (bookData: RawBook) => BookCardType

const parseBook: ParseBook = (bookData) => {
  const parsedBook = {
    id: bookData.id,
    etag: bookData.etag,
    cover: bookData.volumeInfo.imageLinks?.thumbnail || "",
    title: bookData.volumeInfo.title,
    description: bookData.volumeInfo.description,
    category: bookData.volumeInfo.categories ? bookData.volumeInfo.categories.join("/ ") : "",
    authors: bookData.volumeInfo.authors || []
  }

  return parsedBook
}

export const getBook = (bookId: string) =>
  sendRequest({ url: `${basicURL}/volumes/${bookId}` }).then((response) => parseBook(response as RawBook))
