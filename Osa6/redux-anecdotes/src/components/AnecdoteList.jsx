import { useSelector, useDispatch } from 'react-redux'
import anecdoteSlice from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const filteredAnecdotes = anecdotes.filter((anecdote) => {
      if(anecdote.content.includes(filter)) {
        return anecdote
      }
    })
    const orderedAnecdotes = filteredAnecdotes.sort((a,b) => ( a.votes < b.votes) ? 1 : -1)
    const dispatch = useDispatch()

    const vote = (id) => {
      dispatch(anecdoteSlice.actions.addVote(id))
    }

    return (
      <div>
        {orderedAnecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
}

export default AnecdoteList