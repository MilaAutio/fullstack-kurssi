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

export default notificationSlice