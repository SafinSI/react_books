import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SearchPage, BookPage } from "./pages"
import { PageLayout } from "./components"
import "./index.css"

function App() {
  return (
    <PageLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<SearchPage />} />
          <Route path="/:query" element={<SearchPage />} />
          <Route path="/book_card/:id" element={<BookPage />} />
        </Routes>
      </BrowserRouter>
    </PageLayout>
  )
}

export default App
