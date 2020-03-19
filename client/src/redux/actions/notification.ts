import { ADD_NOTIFICATION, NotificationActions, Message } from '../../types'

export const addNotification = (message: Message): NotificationActions => {
  return {
    type: ADD_NOTIFICATION,
    payload: {
      message,
    },
  }
}