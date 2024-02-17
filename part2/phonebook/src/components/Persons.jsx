/**
 * A component to display a list of names and numbers for the phonebook.
 * @component
 */
const Persons = ({ personsFiltered }) => (
  <ul>
    {personsFiltered.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
  </ul>
)

export default Persons