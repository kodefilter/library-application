import { Dispatch } from 'redux'
import UserService from '../../services/users'
import LendingService from '../../services/lendings'

import {
  ADD_CURRENT_USER, User, UserActions,
} from '../../types'

export const addCurrentUser = (user: User): UserActions => {
  return {
    type: ADD_CURRENT_USER,
    payload: {
      user,
    },
  }
}


export function signInUserThunk(response: any){
  return async (dispatch: Dispatch) => {
      return UserService.signIn(response, dispatch)
  }
}
