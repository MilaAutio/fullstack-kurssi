const initialState = '';
import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterAnecdotes(state, action) {
            return action.payload
        }
    }
})

export default filterSlice;