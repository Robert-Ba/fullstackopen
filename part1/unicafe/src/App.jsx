import { useState } from 'react'

/**
 * A button component that takes text and an onClick event handler.
 * @component
 */
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

/**
 * A component to display a value and a label.
 * @component
 */
const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

/**
 * A component to display statistics about the current ratings.
 * @component
 */
const Statistics = ({good, bad, neutral}) => {
  if(good || bad || neutral) {
    const total = good + bad + neutral
    const average = (good - bad) / total
    const positive = (good / total) * 100

    return (
      <table>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='All' value={(total)} />
          <StatisticLine text='Average' value={average} />
          <StatisticLine text='Positive' value={`${positive} %`} />
        </tbody>
      </table>
    )
  }

  return <p>No feedback given</p>
}

/**
 * A component for displaying a feedback form with three buttons and feedback count.
 * Clicking a button will increment the count for good, neutral, or bad depending on the button clicked.
 * @component
 */
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => () => setGood(good + 1)
  const handleNeutralClick = () => () => setNeutral(neutral + 1)
  const handleBadClick = () => () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGoodClick()} text='Good' />
      <Button onClick={handleNeutralClick()} text='Neutral' />
      <Button onClick={handleBadClick()} text='Bad' />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App