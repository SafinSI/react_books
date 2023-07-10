import { BookCard } from "./BookCard"
import { BookCardType } from "../../store"
import style from "./style.module.css"

type CardsListProps = {
  cards: BookCardType[]
}

export const BookCardsList = ({ cards }: CardsListProps) => (
  <div className={style.cards_list}>
    {cards.map((item) => (
      <BookCard key={item.id + item.etag} card={item} />
    ))}
  </div>
)
