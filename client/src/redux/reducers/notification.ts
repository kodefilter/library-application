import {
    NotificationState,
    ADD_NOTIFICATION,
    NotificationActions,
  } from '../../types'


  const defaultState: NotificationState = {
        errorMessage: '',
        successMessage: '',
  }
  
  export default function notification(
    state: NotificationState = defaultState,
    action: NotificationActions
  ): NotificationState {
    switch (action.type) {
  
  
    case ADD_NOTIFICATION: {
      //const { notification } = action.payload
      return { ...state, errorMessage: action.payload.errorMessage, successMessage: action.payload.successMessage }
    }
  
    default:
      return state
    }
  }
  