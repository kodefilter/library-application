import { Author, AuthorFormValues } from '../types'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Dispatch } from 'redux'
import {
  getAllAuthors,
  addNotification,
  removeAuthor,
  createAuthor,
} from '../redux/actions'
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

const create = async (author: AuthorFormValues, dispatch: Dispatch) => {
  try {
    const response = await axios({ method: 'POST', url: baseUrl, data: author })
    dispatch(createAuthor(response.data))
  } catch (error) {
    dispatch(
      addNotification({
        errorMessage: `This Error happened ${error}`,
        successMessage: '',
      })
    )
  }
}

const deleteThis = async (author: Author, dispatch: Dispatch) => {
  try {
    await axios({
      method: 'DELETE',
      url: `${baseUrl}/${author._id}`,
      data: author,
    })
    dispatch(removeAuthor(author))
    dispatch(
      addNotification({
        errorMessage: '',
        successMessage: `You just deleted ${author.firstName}`,
      })
    )
  } catch (error) {
    dispatch(
      addNotification({
        errorMessage: `This Error happened ${error}`,
        successMessage: '',
      })
    )
  }
}

export default { getAll, create, deleteThis }
