import React from 'react'

const Total = ({ course }) => {
    const sum = course.parts.reduce((acc, part) => acc += part.exercises, 0)

    return(
        <h4>Total of {sum} exercises</h4>
    ) 
}

export default Total