import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import notificationSlice from '../reducers/notificationReducer'

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
      dispatch(voteAnecdote(id))
      var anecdote = anecdotes.find(anecdote => anecdote.id === id)
      var content = anecdote ? anecdote.content : 'Unknown'
      dispatch(notificationSlice.actions.newNotification('You voted "' + content + '"'))
      setTimeout(function() {
        dispatch(notificationSlice.actions.removeNotification())
      }, 5000)
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