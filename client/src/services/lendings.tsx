import Cookies from "js-cookie"

const borrow = (options : RequestInit) => {
  fetch('http://localhost:3001/api/v1/books/borrow',options).then((r) => { console.log(r)})
}


const unBorrow = (options : RequestInit) => {
fetch('http://localhost:3001/api/v1/books/unborrow',options).then((r) => { console.log(r)})
}

//deleting, editing and getting single observation 
//was not on the requirement but can be implemented very easily

export default { borrow, unBorrow }