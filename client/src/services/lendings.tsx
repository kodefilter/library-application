import { Book } from "../types"
import Cookies from "js-cookie"
const baseUrl = 'http://localhost:3001/api/v1/books'


const borrow = (book: any) => {
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
  return fetch(`${baseUrl}/borrow`,options)
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