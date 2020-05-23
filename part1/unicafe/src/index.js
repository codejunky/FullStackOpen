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

const FeedBackStats = ({ stats }) => (
  <>
    <h2>statistics</h2>
    good {stats.good}  <br />
    neutral {stats.neutral} <br />
    bad {stats.bad}
  </>
)

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
      <FeedBackStats stats={{ good, neutral, bad }} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
