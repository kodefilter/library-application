import { Author } from '../types'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Dispatch } from 'redux'
import { getAllAuthors, addNotification } from '../redux/actions'
const baseUrl = 'http://localhost:3001/api/v1/authors'

let myHeaders = new Headers()
myHeaders.append('x-auth-token', Cookies.get('access-cookie') as string)

const getAll = async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(baseUrl, {
      headers: myHeaders,
    })
    dispatch(getAllAuthors(response.data))
  } catch (error) {
    dispatch(
      addNotification({
        errorMessage: `This Error happened ${error}`,
        successMessage: '',
      })
    )
  }
}

const create = (newAuthor: Author) => {
  return axios({
    method: 'post',
    url: baseUrl,
    data: newAuthor,
    headers: myHeaders,
  })
}

// delete request is going to delete entry in the database and then returns 204 status

export default { getAll, create }
