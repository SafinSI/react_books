import React, { useRef, useEffect } from "react"
import style from "./style.module.css"
import { categories, sortModes } from "../../config"
import { Select } from "../Select"

export type FormState = { searchValue: string; sortBy: string; category: string }
type OnSubmit = (value: FormState) => void
type SearchFormProps = {
  onSubmit: OnSubmit
  initialFormState: FormState
}

const setInitialState = (form: HTMLFormElement, initialFormState: FormState) => {
  form.search.value = initialFormState.searchValue
  form.sort.value = initialFormState.sortBy
  form.category.value = initialFormState.category
}

export const SearchForm = ({ onSubmit, initialFormState }: SearchFormProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const searchValue = form.search.value
    const sortBy = form.sort.value
    const category = form.category.value

    onSubmit({ searchValue, sortBy, category })
  }

  useEffect(() => {
    if (formRef.current) {
      setInitialState(formRef.current, initialFormState)
    }
  }, [])

  return (
    <form className={style.search_form} onSubmit={submitHandler} ref={formRef}>
      <input type={"search"} name="search" autoComplete="off" />
      <button className="button">Search</button>
      <Select options={sortModes} name="sort" />
      <Select options={categories} name="category" />
    </form>
  )
}
