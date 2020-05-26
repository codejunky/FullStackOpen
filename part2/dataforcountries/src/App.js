import React, { useState, useEffect } from 'react';
import axios from 'axios'

import SearchResults from './components/SearchResults'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countriesData, setCountriesData] = useState([])

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${searchTerm}`)
      .then(({ data }) => setCountriesData(data))
  }, [searchTerm])

  const handleSearch = (event) => {
    const text = event.target.value
    setSearchTerm(text)
  } 

  return (
    <div>
      <div>
        find countries <input value={searchTerm} onChange={handleSearch}  />
        {
          countriesData.length > 10 
            ? <div>Too many matches, specify another filter</div>
            : <SearchResults data={countriesData} />
        }
      </div>
    </div>
  )
}

export default App
