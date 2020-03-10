import React, { useState, useEffect } from 'react'
//import { GoogleLogin } from 'react-google-login'
import bookService from '../services/books'

import useBooks from '../hooks/useBooks'

export default function Home() {
  const [books, setBooks] = useState([{}])

  useEffect(()=> {
    bookService.getAll().then(initialBooks => {
      setBooks(initialBooks)
    })
  })

  return (
    <>
      <h1>Hello World</h1>
      
    </>
  )
}
