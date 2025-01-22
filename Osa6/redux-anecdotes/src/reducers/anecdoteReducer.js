import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../../services/anecdotes'

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

export const initializeAnecdotes = () => {
  return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch(anecdoteSlice.actions.setAnecdotes(anecdotes))
    }
}

export const addNewAnecdote = (content) => {
  return async dispatch => {
      const newAnecdote = await anecdoteService.addVote(content)
      dispatch(anecdoteSlice.actions.newAnecdote(newAnecdote))
    }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
      await anecdoteService.addVote(id)
      dispatch(anecdoteSlice.actions.addVote(id))
    }
}

export default anecdoteSlice