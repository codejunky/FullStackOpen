import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import peopleService from './services/persons' 

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  

  useEffect(() => {
    peopleService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

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
      peopleService
        .addPerson({name, number})
        .then(data => {
          setPersons([...persons, data])
          setNewName("")
          setNewNumber("")
        })
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