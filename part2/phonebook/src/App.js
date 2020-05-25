import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [personsFiltered, setPersonsFiltered] = useState({searchFilter: '', persons})

  const handleNameChange = event => {
    const name = event.target.value
    setNewName(name)
  }

  const handleNumberChange = event => {
    const number = event.target.value
    setNewNumber(number)
  }

  const handleOnSubmit = event => {
    event.preventDefault()

    const nameExists = persons.find(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, { name: newName, number: newNumber }])
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameFilterChange = event => {
    const filter = event.target.value
    const filtered = persons.filter(
      ({name}) => name.toLowerCase().includes(filter.toLowerCase())
    )
    setPersonsFiltered({searchFilter: filter, persons: filtered})
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with &nbsp;
        <input 
          value={personsFiltered.searchFilter} 
          onChange={handleNameFilterChange} 
        />
      </div>

      <h2>Add a new</h2>

      <form onSubmit={handleOnSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      <div>
        {personsFiltered.persons.map(person => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App