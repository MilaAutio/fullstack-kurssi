import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Title title="Give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
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
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    </>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props
  const all = good + neutral + bad
  if( all === 0 ) {
    return (
      <>
        <Title title="Statistics" />
        <p> No feedback given </p>
      </>
    )
  } else {
    return (
      <>
        <Title title="Statistics" />
        <table><tbody>
          <StatisticLine name="Good" count={good} />
          <StatisticLine name="Neutral" count={neutral} />
          <StatisticLine name="Bad" count={bad} />
          <StatisticLine name="All" count={all} />
          <StatisticLine name="Average" count={(good * 1 + neutral * 0 + bad * -1) / all} />
          <StatisticLine name="Positive" count={good / all * 100 + ' %'} />
        </tbody></table>
      </>
    )
  }
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.count}</td>
    </tr>
  )
}

export default App