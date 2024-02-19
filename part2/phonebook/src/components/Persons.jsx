/**
 * A component to display a list of names and numbers for the phonebook.
 * @component
 */
const Persons = ({ personsFiltered, handleDeletePerson }) => (
  <ul>
    {personsFiltered.map(person => <Person key={person.id} person={person} handleDeletePerson={() => handleDeletePerson(person)} />)}
  </ul>
)

const Person = ({ person, handleDeletePerson }) => (
  <li>
    {`${person.name} ${person.number}`}
    <button onClick={handleDeletePerson}>Delete</button>
  </li>
)
export default Persons