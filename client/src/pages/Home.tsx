import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchBooks } from '../redux/actions'
import ApplicationBar from '../components/ApplicationBar'
import BookGridList from '../components/BookGridList'


export default function Home() {
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(fetchBooks())
  },[])

  return (
    <>
    <ApplicationBar />
    <BookGridList />
    </>
    
  )
}
