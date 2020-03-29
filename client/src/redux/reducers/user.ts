import {
    UserState,
    UserActions,
    ADD_CURRENT_USER,
  } from '../../types'
  
  export default function author(
    state: UserState = { users: [], currentUser: { cart: [], firstName: '', lastName: '' } },
    action: UserActions
  ): UserState {
    switch (action.type) {

    case ADD_CURRENT_USER: {
      const { user } = action.payload
      return {...state, users: [ ...state.users, user], currentUser: user}
    }
    
    default:
      return state
    }
  }
  