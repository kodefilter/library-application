import { Book } from "../types"
import Cookies from "js-cookie"
import axios from 'axios'
import { Dispatch } from "redux"
import { borrowUnborrowBook, addNotification } from "../redux/actions"
const baseUrl = 'http://localhost:3001/api/v1/books'


const borrow = async (book: any, dispatch: Dispatch) => {
  try {
    const response = await axios({ method: 'PUT', url: `${baseUrl}/borrow`, data: { 'userId': Cookies.getJSON('current-user')._id, 'bookId': book._id } })
    dispatch(borrowUnborrowBook(response.data))
  }
  catch (error) {
    dispatch(addNotification({ errorMessage: `This Error happened ${error}`, successMessage: '' }))
  } 
}

const unBorrow = (book: any) => {
  const obj = {
    'userId' : Cookies.getJSON('current-user')._id,
    'bookId' : book._id
  }
  const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'})
  const options: RequestInit = {
    method: "PUT",
    body: blob,
    mode: "cors",
    cache: "default",
  }
  return fetch(`${baseUrl}/unborrow`,options)
}

//deleting, editing and getting single observation 
//was not on the requirement but can be implemented very easily

export default { borrow, unBorrow }