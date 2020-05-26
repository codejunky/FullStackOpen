import React, { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const handleNameChange = event => {
    const name = event.target.value
    setNewName(name)
  }

  const handleNumberChange = event => {
    const number = event.target.value
    setNewNumber(number)
  }

  const handleOnSubmit = (name, number) => {
    const nameExists = persons.find(person => person.name === name)

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, { name, number }])
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameFilterChange = event => {
    const filter = event.target.value
    
    setSearchFilter(filter)
  }

  const filteredPersons = 
    searchFilter ? persons.filter(({ name }) => name.toLowerCase().includes(searchFilter.toLowerCase())) : persons
 
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter 
        searchFilter={searchFilter}
        handleOnChange={handleNameFilterChange}
      />

      <h2>Add a new</h2>

      <PersonForm  
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleOnSubmit={handleOnSubmit}
      />

      <h2>Numbers</h2>
      
      <Persons people={filteredPersons} />
    </div>
  )
}

export default App