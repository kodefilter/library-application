import { Book } from '../types'
import Cookies from 'js-cookie'
import axios from 'axios'
import { response } from 'express'
const baseUrl = 'http://localhost:3001/api/v1/books'

let myHeaders = new Headers()
myHeaders.append('x-auth-token', Cookies.get('access-cookie') as string)

const getAll = () => {

    const request = axios({ method: 'get', url: baseUrl, headers: myHeaders })
    return request.then(response => response.data)  
}


const create = (newBook: Book) => {

    //const blob = new Blob([JSON.stringify(newBook, null, 2)], {type : 'application/json'})

    console.log('new book to post', newBook)

    /*
 * Handling Errors using promises
 */
const request = axios({ method: 'post', url: baseUrl, data: JSON.stringify(newBook), headers: myHeaders })
return request.then(response => response.data)
.catch((error) => {
    // Error 😨
    if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
    } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
});

}




export default { getAll, create }