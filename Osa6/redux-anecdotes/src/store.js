import { configureStore } from '@reduxjs/toolkit'
import anecdoteSlice from './reducers/anecdoteReducer'
import filterSlice from './reducers/filterReducer'
import notificationSlice from './reducers/notificationReducer'

export const store = configureStore({
    reducer: {
        anecdotes: anecdoteSlice.reducer,
        filter: filterSlice.reducer,
        notification: notificationSlice.reducer
    }
})