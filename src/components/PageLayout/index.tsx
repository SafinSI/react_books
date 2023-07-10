import React from "react"
import style from "./style.module.css"

export const PageLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <header className={style.header}>GOOGLE BOOKS</header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>FOOTER</footer>
    </>
  )
}
