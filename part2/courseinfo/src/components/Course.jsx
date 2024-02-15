const Header = ({ course }) => <h2>{course}</h2>

/**
 * Updated Total component to use reduce to calculate the sum of exercises.
 * @component
 */
const Total = ({ parts }) => <p>Number of exercises {parts.reduce((sum, part) => (sum + part.exercises), 0)}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

/**
 * Updated Content component to use use map so it can handle an array of any length.
 * @component
 */
const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)

/**
 * Moved Course component to it's own module.
 * @component
 */
const Course = ({course}) => {
  const {name, parts} = course

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default Course