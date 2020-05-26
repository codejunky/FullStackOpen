import React from 'react'

const SearchResults = ({ data }) => {
    if (data.length > 1) {
        return data.map(({ name }) => <div key={name}>{name}</div>)
    } else if (data.length === 0) {
        return (<div></div>)
    }

    const { name, capital, population, languages, flag } = data[0]
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