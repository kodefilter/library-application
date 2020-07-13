import React from 'react'
import ApplicationBar from '../components/ApplicationBar'
import BookGridList from '../components/BookGridList'
import NotificationBar from '../components/NotificationBar'

export default function Home() {
  return (
    <>
      <ApplicationBar />
      <NotificationBar />
      <BookGridList />
    </>
  )
}
