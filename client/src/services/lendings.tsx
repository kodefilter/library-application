


const borrow = (options : RequestInit) => {
  return fetch('http://localhost:3001/api/v1/books/borrow',options)
}


const unBorrow = (options : RequestInit) => {
return fetch('http://localhost:3001/api/v1/books/unborrow',options)
}

//deleting, editing and getting single observation 
//was not on the requirement but can be implemented very easily

export default { borrow, unBorrow }