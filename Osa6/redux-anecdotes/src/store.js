import { configureStore } from '@reduxjs/toolkit'
import anecdoteSlice from './reducers/anecdoteReducer'
import filterSlice from './reducers/filterReducer'

export const store = configureStore({
    reducer: {
        anecdotes: anecdoteSlice.reducer,
        filter: filterSlice.reducer
    }
})