import Cookies from "js-cookie"

const borrow = (options : RequestInit) => {

    console.log('wehavereached here',options)
    
fetch('http://localhost:3001/api/v1/books/borrow',options).then((r) => {


    console.log(r)
    
    })
}


const unBorrow = (options : RequestInit) => {
    
    fetch('http://localhost:3001/auth/google',options).then((r) => { 
        const token = r.headers.get('x-auth-token')  
        r.json().then(user => {
          if(token) {
            Cookies.set('access-cookie', token)
              //setUser({user,token})
              // set current user of the store here
              // set state of the user
            }
          })
        })
    }

//deleting, editing and getting single observation 
//was not on the requirement but can be implemented very easily

export default { borrow, unBorrow }