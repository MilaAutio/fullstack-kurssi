import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      return state.map(anecdote => {
        if (anecdote.id === action.payload) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1,
          }
        }
        return anecdote
      });
    },    
    newAnecdote(state, action) {
      return [ ...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    }

  }
})

export default anecdoteSlice