import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import NotificationContext from './components/NotificationContext'

const App = () => {

  const queryClient =  useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const addVoteMutation = useMutation({
    mutationFn: (anecdote) => {
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1}
      return axios.put('http://localhost:3001/anecdotes/' + anecdote.id, updatedAnecdote).then(res => res.data)
    },
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })

      //notification
      notificationDispatch({ type: 'ADDNOTIFICATION', payload: 'You voted "' + anecdote.content + '"'})
      setTimeout(() => {
        notificationDispatch({ type: 'REMOVENOTIFICATION' })
      }, 5000);
    }
  })

  const handleVote = (anecdote) => {
    addVoteMutation.mutate(anecdote)
  }

  const results = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data)
  })

  if( results.isLoading ){
    return <div>Loading anecdotes...</div>
  }

  if(results.error) {
    return 'Anecdote service not available due to problems in server'
  }

  const anecdotes = results.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
