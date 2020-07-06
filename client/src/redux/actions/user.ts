import { Dispatch } from 'redux'
import UserService from '../../services/users'

import {
  ADD_CURRENT_USER,
  User,
  UserActions,
  REMOVE_CURRENT_USER,
} from '../../types'

export const addCurrentUser = (user: User): UserActions => {
  return {
    type: ADD_CURRENT_USER,
    payload: {
      user,
    },
  }
}

export const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER,
    payload: {},
  }
}

export function signInUserThunk(response: any) {
  return async (dispatch: Dispatch) => {
    return UserService.signIn(response, dispatch)
  }
}
