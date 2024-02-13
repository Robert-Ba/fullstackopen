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
const Content = ({parts}) => {
  // Without using a loop:
  return (
    <div>
      <Part part={parts[0].name} exercise={parts[0].exercises} />
      <Part part={parts[1].name} exercise={parts[1].exercises} />
      <Part part={parts[2].name} exercise={parts[2].exercises} />
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
const Total = ({parts}) => {
  // If we used loops I would do parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App