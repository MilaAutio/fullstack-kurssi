import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import NotificationContext from '../components/NotificationContext'

const AnecdoteForm = () => {

  const queryClient =  useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
      mutationFn: (newAnecdote) => {
        return axios.post('http://localhost:3001/anecdotes', newAnecdote).then(res => res.data)
      },
      onSuccess: (newAnecdote) => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })

        //notification
        notificationDispatch({ type: 'ADDNOTIFICATION', payload: '"' + newAnecdote.content + '" added'})
        setTimeout(() => {
          notificationDispatch({ type: 'REMOVENOTIFICATION' })
        }, 5000);
      }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
