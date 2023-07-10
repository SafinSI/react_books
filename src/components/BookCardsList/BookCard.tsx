import { NavLink } from "react-router-dom"
import { BookCardType } from "../../store"
import style from "./style.module.css"

type BookCardProps = { card: BookCardType }

export const BookCard = ({ card }: BookCardProps) => (
  <NavLink to={`/book_card/${card.id}`} className={style.card_link}>
    <div className={style.card}>
      <figure className={style.cover}>
        <img src={card.cover} className={style.cover_img} alt="book cover" />
      </figure>
      <span className={style.category}> {card.category}</span>
      <span className={style.title}>{card.title}</span>
      <span className={style.author}>{card.authors.join(", ")}</span>
    </div>
  </NavLink>
)
