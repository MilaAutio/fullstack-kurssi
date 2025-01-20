import { configureStore } from '@reduxjs/toolkit'
import anecdoteSlice from './reducers/anecdoteReducer'
import filterSlice from './reducers/filterReducer'
import notificationSlice from './reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

export const store = configureStore({
    reducer: {
        anecdotes: anecdoteSlice.reducer,
        filter: filterSlice.reducer,
        notification: notificationSlice.reducer
    }
})

anecdoteService.getAll().then(anecdotes => {
    store.dispatch(anecdoteSlice.actions.setAnecdotes(anecdotes))
})