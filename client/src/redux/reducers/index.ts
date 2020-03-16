import { combineReducers } from 'redux'

import book from './book'
import ui from './ui'

const createRootReducer = () =>
  combineReducers({
    book,
    ui,
  })

export default createRootReducer
