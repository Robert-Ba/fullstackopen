/**
 * Component for showing the title of a course.
 * @component
 */
const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

/**
 * Component for showing the content of a course.
 * @component
 */
const Content = ({part1, exercises1, part2, exercises2, part3, exercises3}) => {
  return (
    <div>
      <Part part={part1} exercise={exercises1} />
      <Part part={part2} exercise={exercises2} />
      <Part part={part3} exercise={exercises3} />
    </div>
  )
}

/**
 * Component for showing one part of Content.
 * @component
 */
const Part = ({part, exercise}) => (
  <p>{part} {exercise}</p>
)

/**
 * Component to show the total number of exercises.
 * @component
 */
const Total = ({exercises1, exercises2, exercises3}) => {
  return (
    <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content 
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App