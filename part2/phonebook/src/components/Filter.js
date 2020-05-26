import React from 'react'

const Filter = ({searchFilter, handleOnChange}) => (
    <div>
        filter shown with &nbsp;
        <input 
            value={searchFilter} 
            onChange={handleOnChange} 
        />
    </div>
)

export default Filter