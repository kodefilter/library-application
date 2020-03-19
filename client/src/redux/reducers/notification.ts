import {
    NotificationState,
    ADD_NOTIFICATION,
    NotificationActions,
  } from '../../types'

  
  export default function notification(
    state: NotificationState = { message: { errorMessage: '', successMessage: ''} },
    action: NotificationActions
  ): NotificationState {
    switch (action.type) {
  
  
    case ADD_NOTIFICATION: {
      const { message } = action.payload
      return { ...state, message: message }
    }
  
    default:
      return state
    }
  }
  