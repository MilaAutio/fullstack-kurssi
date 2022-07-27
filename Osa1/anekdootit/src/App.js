import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))

  const handleRandomClick = () => {
    const random = Math.floor(Math.random() * (7))
    setSelected( random )
  }

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes( newVotes )
  }

  const max = Math.max(...votes)
  const mostVotes = votes.indexOf(max);

  return (
    <div>
      <Title title="Anecdote Of The Day" />
      {anecdotes[selected]}
      <p>This Anecdote Has {votes[selected]} votes</p>
      <Button handleClick={handleVoteClick} name="Vote" />
      <Button handleClick={handleRandomClick} name="Next Anecdote" />
      <Title title="Anecdote With Most Votes" />
      {anecdotes[mostVotes]}
      <p>This Anecdote Has {max} votes</p>
    </div>
  )
}

const Title = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick} >{props.name}</button>
    </>
  )
}

export default App