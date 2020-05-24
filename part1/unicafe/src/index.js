import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, title }) => (
  <button onClick={handleClick}>
    {title}
  </button>
)

const FeedBackInput = ({ handlers }) => (
  <>
    <h2>give feedback</h2>
    <Button handleClick={handlers.goodFeedBackHandler} title="good" />
    <Button handleClick={handlers.neutralFeedBackHandler} title="neutral" />
    <Button handleClick={handlers.badFeedBackHandler} title="bad" />
  </>
)

const Statistic = ({ text, value, percentage }) => (
  <>
    {text} {value}{percentage ? "%": ""} <br />
  </>
)

const Statistics = ({ stats: { good, bad, neutral } }) => {
  const totalScore = good + bad + neutral

  if (totalScore > 0) {
    const average = (good - bad) / totalScore
    const positive = good / totalScore * 100
  
    return (
      <>
        <h2>statistics</h2>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={totalScore} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} percentage />
      </>
    )
  }

  return (
    <p>No feedback given</p>
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedBackHandler = () => setGood(good + 1)
  const neutralFeedBackHandler = () => setNeutral(neutral + 1)
  const badFeedBackHandler = () => setBad(bad + 1)
  
  return (
    <div>
      <FeedBackInput 
        handlers={{
          goodFeedBackHandler,
          neutralFeedBackHandler,
          badFeedBackHandler
        }}
      />
      <Statistics stats={{ good, neutral, bad }} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
