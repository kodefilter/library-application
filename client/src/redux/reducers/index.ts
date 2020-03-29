import { combineReducers } from 'redux'

import book from './book'
import ui from './ui'
import notification from './notification'
import author from './author'
import user from './user'

const createRootReducer = () =>
  combineReducers({
    book,
    ui,
    notification,
    author,
    user,
  })

export default createRootReducer
