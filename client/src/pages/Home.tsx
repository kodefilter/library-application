import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ApplicationBar from '../components/ApplicationBar'
import BookGridList from '../components/BookGridList'
import NotificationBar from '../components/NotificationBar'
import { fetchBooksThunk } from '../redux/actions/book'
import AuthorTableList from '../components/AuthorTableList'

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBooksThunk())
  }, [dispatch])

  return (
    <>
      <ApplicationBar />
      <NotificationBar />
      <AuthorTableList />
      <BookGridList />
    </>
  )
}
