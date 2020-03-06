import { useState, useEffect } from 'react'

const useBooks = (): any => {
  const url: string = 'http://localhost:3001/api/v1/books/'
  const [allBooks, setAllBooks] = useState(null)
  console.log('allBooks in home', allBooks)

  useEffect(() => {
    ;(async () => {
      let res = await fetch(url)
      let response = await res.json()
      setAllBooks(response)
    })()
  }, [])

  return allBooks
}

export default useBooks
