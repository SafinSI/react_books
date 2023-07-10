export type RawBook = {
  id: string
  etag: string
  volumeInfo: {
    title: string
    description: string
    categories: string[]
    authors: string[]
    imageLinks: {
      smallThumbnail: string
      thumbnail: string
    }
  }
}

export type RawBooksData = {
  items: RawBook[]
  totalItems: number
} & Record<string, any>

export type URLFields = {
  searchValue: string
  sortBy: string
  category: string
  startIndex?: string
}
