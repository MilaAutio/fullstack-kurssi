import { useDispatch } from 'react-redux'
import anecdoteSlice from '../reducers/anecdoteReducer'
import notificationSlice from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addNote = (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        dispatch(anecdoteSlice.actions.newAnecdote(content))
        dispatch(notificationSlice.actions.newNotification('Anecdote "' + content + '" added'))
        setTimeout(function() {
          dispatch(notificationSlice.actions.removeNotification())
        }, 5000)
    }

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addNote}>
            <div><input name="note" /></div>
            <button>create</button>
        </form>
      </div>
    )
}

export default AnecdoteForm