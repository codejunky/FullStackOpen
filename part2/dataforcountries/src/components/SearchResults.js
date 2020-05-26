import React, {useState} from 'react'

const SearchResults = ({ data }) => {
    const [countryToShow, setCountryToShow] = useState([])

    const handleBtnClick = name => {
        const country = data.filter(obj => obj.name === name)
        setCountryToShow(country)
    }

    if (data.length > 1 && !countryToShow.length) {
        return data.map(({ name }) => (
            <div key={name}>
                {name} <button onClick={() => handleBtnClick(name)}>show</button>
            </div>
        ))
    } else if (data.length === 0) {
        return (<div></div>)
    }

    const countryData = countryToShow.length ? countryToShow[0] : data[0]

    const { name, capital, population, languages, flag } = countryData
    return (
        <div>
            <h2>{name}</h2>
            <div>capital {capital}</div>
            <div>population {population}</div>

            <h3>Languages</h3>
            <ul>
                {languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
            </ul>

            <div>
                <img 
                    width="150"
                    height="150"
                    src={flag} 
                    alt={`${name}'s flag`}
                />
            </div>
        </div>
    )
}

export default SearchResults