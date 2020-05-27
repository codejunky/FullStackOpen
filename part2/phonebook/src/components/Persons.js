import React from 'react'

const Persons = ({ people, handleDeleteBtn }) => (
    <div>
        {people.map(person => (
            <div key={person.name}>
                {person.name} {person.number} &nbsp;
                <button onClick={() => handleDeleteBtn(person.id)}>delete</button>
            </div>
        ))}
    </div>
)

export default Persons