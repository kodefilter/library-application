import React from 'react'
import ApplicationBar from '../components/ApplicationBar'
import NotificationBar from '../components/NotificationBar'
import BookGridList from '../components/Book/BookGridList'

export default function Home() {
  return (
    <>
      <ApplicationBar />
      <NotificationBar />
      <BookGridList />
    </>
  )
}
