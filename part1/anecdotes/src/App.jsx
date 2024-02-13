import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0)) // Array of zeros
  const [topAnecdote, setTop] = useState(0) // Index of top anecdote

  // Returns a random index in the range of anecdotes array
  const getRandomIndex = () => {
    return Math.floor(Math.random() * anecdotes.length);
  }

  const handleNextAnecdote = () => {
    let nextAnecdote = getRandomIndex()

    // Don't select the same anecdote
    while(nextAnecdote === selected) nextAnecdote = getRandomIndex()

    setSelected(nextAnecdote)
  }

  // Add vote for current anecdote
  const handleVote = () => {
    let newVotes = [...votes]
    newVotes[selected] += 1

    setVotes(newVotes)

    // Check for new top anecdote
    if(newVotes[selected] > newVotes[topAnecdote]) {
      setTop(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>{votes[selected]}</p>
      <button onClick={() => handleVote()}>vote</button>
      <button onClick={() => handleNextAnecdote()}>next anecdote</button>

      {/* Display top anecdote. Only displays is there are votes. */}
      <h1>Anecdote with most votes</h1>
      {
        votes[topAnecdote] > 0 ?
        <p>{anecdotes[topAnecdote]}<br />has {votes[topAnecdote]} votes</p> :
        <p>No votes have been made.</p>
      }
    </div>
  )
}

export default App