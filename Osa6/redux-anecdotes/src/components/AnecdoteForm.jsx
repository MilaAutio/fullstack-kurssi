import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        dispatch(addNewAnecdote(content))

        //notification
        dispatch(showNotification('Anecdote "' + content + '" added', 5))
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