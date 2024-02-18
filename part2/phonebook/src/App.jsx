import { useState, useEffect } from 'react'
import axios from 'axios'
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [nameFilter, setFilter] = useState('')

  // Get persons from json-server
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => setPersons(res.data))
  }, [])

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