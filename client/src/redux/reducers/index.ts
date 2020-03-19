import { combineReducers } from 'redux'

import book from './book'
import ui from './ui'
import notification from './notification'

const createRootReducer = () =>
  combineReducers({
    book,
    ui,
    notification,
  })

export default createRootReducer
