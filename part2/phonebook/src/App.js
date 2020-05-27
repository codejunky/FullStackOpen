import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import peopleService from './services/persons' 

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({message: null, className: null})
  

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

  const setNotification = (message, type) => {
    setNotificationMessage({
      message,
      className: type === 'success' ? 'success' : 'error'
    })

    setTimeout(() => setNotificationMessage({message: null, className: null}), 5000)
  }

  const handleOnSubmit = (name, number) => {
    const person = persons.find(p => p.name === name)
    const nameExists = !!person

    if (nameExists) {
      if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
        peopleService
          .updatePerson(person.id, {name, number})
          .then(data => {
            setPersons(persons.map(p => p.name === name ? data : p))
            setNotification(`Updated ${name}`, 'success')
          })
      }
    } else {
      peopleService
        .addPerson({name, number})
        .then(data => {
          setPersons([...persons, data])
          setNotification(`Added ${name}`, 'success')
        })
    }

    setNewName("")
    setNewNumber("")
  }

  const handleDeletePerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      peopleService 
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
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

      <Notification data={notificationMessage} />

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
      
      <Persons people={filteredPersons} handleDeleteBtn={handleDeletePerson} />
    </div>
  )
}

export default App