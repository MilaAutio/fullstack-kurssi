import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "ADDNOTIFICATION":
        return action.payload
      case "REMOVENOTIFICATION":
        return ''
      default:
        return state
    }
}

export const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, 0)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext