import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [anecdoteVotes, setAndecdoteVotes] = useState(new Array(anecdotes.length).fill(0))

  const selectRandomAnecdote = () => {
    const next = Math.floor(Math.random() * anecdotes.length)
    setSelected(next)
  }

  const handleVoteClick = (index) => {
    const votes = [...anecdoteVotes]
    votes[index] += 1
    setAndecdoteVotes(votes)
  } 

  const popularAnecdote = anecdoteVotes.findIndex(el => el === Math.max(...anecdoteVotes))

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]} <br />
      has {anecdoteVotes[selected]} vote{anecdoteVotes[selected] > 1 ? "s" : ""} <br />
      <button onClick={() => handleVoteClick(selected)}>
        vote
      </button>
      <button onClick={selectRandomAnecdote}>
        next anecdote
      </button>

      <h2>Anecdote with most votes</h2>
      {anecdotes[popularAnecdote]} <br />
      has {anecdoteVotes[popularAnecdote]} vote{anecdoteVotes[popularAnecdote] > 1 ? "s" : ""} <br />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)