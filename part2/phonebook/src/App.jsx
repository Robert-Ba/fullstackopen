import { useState } from 'react'

import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

/**
 * This component will:
 * - List person names and their phone number
 * - Provide a form to add a new person and phone number.
 * @component
 */
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [nameFilter, setFilter] = useState('')

  // Filter persons using regex.
  const personsFiltered = persons.filter(person => {
    const regx = new RegExp(`(${nameFilter})`, 'i')
    return (nameFilter.length === 0 || person.name.match(regx))
  })

  const handleSubmitName = (e) => {
    e.preventDefault()

    // Check for duplicate
    if(persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      window.alert(`${newName} is already added to the phonebook.`)
    } else {
      setPersons(persons.concat({name: newName, number: newPhone}))
      setNewPhone('')
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        setFilter={setFilter}
        nameFilter={nameFilter}
      />

      <h3>Add new contact</h3>
      <PersonForm 
        handleSubmitName={handleSubmitName}
        setNewName={setNewName}
        setNewPhone={setNewPhone}
        newName={newName}
        newPhone={newPhone}
      />

      <h2>Numbers</h2>
      <Persons personsFiltered={personsFiltered} />
    </div>
  )
}

export default App