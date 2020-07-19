import React from 'react'
import ApplicationBar from '../components/ApplicationBar'
import NotificationBar from '../components/NotificationBar'
import AuthorTableList from '../components/Author/AuthorTableList'

export default function AuthorList() {
  return (
    <>
      <ApplicationBar />
      <NotificationBar />
      <AuthorTableList />
    </>
  )
}
