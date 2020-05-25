import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleOnChange = event => {
    const name = event.target.value
    setNewName(name)
  }

  const handleOnSubmit = event => {
    event.preventDefault()

    const nameExists = persons.find(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, { name: newName }])
      setNewName("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
          name: <input value={newName} onChange={handleOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      <div>
        {persons.map(person => (
          <span key={person.name}>
            {person.name} <br />
          </span>
        ))}
      </div>
    </div>
  )
}

export default App