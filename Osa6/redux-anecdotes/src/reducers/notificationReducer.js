import { createSlice } from '@reduxjs/toolkit'



const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    newNotification(state, action) {
        return action.payload
    },
    removeNotification() {
        return ''
    }
  }
})

export const showNotification = (content, seconds) => {
  return async dispatch => {
    dispatch(notificationSlice.actions.newNotification(content))
    setTimeout(function() {
      console.log('tmeout')
      dispatch(notificationSlice.actions.removeNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice