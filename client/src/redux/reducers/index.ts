import { combineReducers } from 'redux'

import book from './book'
import ui from './ui'
import notification from './notification'
import author from './author'

const createRootReducer = () =>
  combineReducers({
    book,
    ui,
    notification,
    author,
  })

export default createRootReducer
