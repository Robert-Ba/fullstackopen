import { useState, useEffect } from 'react'
import personService from './services/persons'
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
    personService
      .getAll()
      .then(res => setPersons(res))
      .catch(err => {
        console.error(err)
        alert("Error: Could not update person.")
      })
  }, [])

  // Filter persons using regex.
  const personsFiltered = persons.filter(person => {
    const regx = new RegExp(`(${nameFilter})`, 'i')
    return (nameFilter.length === 0 || person.name.match(regx))
  })

  const handleSubmitName = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: newPhone
    }

    // Check for duplicate
    const existingPersonIndex = persons.findIndex(person => person.name.toLowerCase() === newName.toLowerCase())
    if(existingPersonIndex >= 0) {
      if(confirm(`${newName} is already added to the phonebook, do you want to replace the old number with a new one?`)) {
        personService
          .update({
            ...newPerson,
            id: persons[existingPersonIndex].id
          })
          .then((res) => {
            const personsUpd = [...persons]
            personsUpd[existingPersonIndex] = res
            setPersons(personsUpd)
            setNewPhone('')
            setNewName('')
          })
          .catch((err) => {
            console.error(err)
            alert("Error: Could not update person.")
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(res => {
          setPersons(persons.concat(res))
          setNewPhone('')
          setNewName('')
        })
        .catch(err => {
          console.error(err)
          alert("Error: Could not save new person to the database.")
        })
    }
  }

  // Remove person from database
  const handleDeletePerson = (person) => {
    if(confirm(`Do you want to delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(res => {
          setPersons(persons.toSpliced((persons.findIndex(p => p.id === res.id)), 1))
        })
        .catch(err => {
          console.error(err)
          alert("Error: Could not delete person.")
        })
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
      <Persons personsFiltered={personsFiltered} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App