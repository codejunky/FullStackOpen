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

const Statistics = ({ stats: { good, bad, neutral } }) => {
  const totalScore = good + bad + neutral

  if (totalScore > 0) {
    const average = (good - bad) / totalScore
    const positive = good / totalScore * 100
  
    return (
      <>
        <h2>statistics</h2>
        good {good}  <br />
        neutral {neutral} <br />
        bad {bad} <br />
        all { totalScore } <br />
        average { average } <br />
        positive { positive }% <br />
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
