import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state)
    const orderedAnecdotes = anecdotes.sort((a,b) => ( a.votes < b.votes) ? 1 : -1)
    const dispatch = useDispatch()

    const vote = (id) => {
      dispatch(addVote(id))
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