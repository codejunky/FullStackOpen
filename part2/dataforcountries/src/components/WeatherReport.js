import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherReport = ({ city }) => {
    const [weatherData, setWeatherData] = useState(null)
    
    useEffect(() => {
        const accessKey = process.env.REACT_APP_API_KEY
        const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${city}`

        axios
            .get(url)
            .then(({ data }) => {
                setWeatherData(data.current)
            })
    }, [city])

    return weatherData 
        ? (
            <div>
                <h3>Weather in {city}</h3>
                <div>
                    <strong>temperature: </strong>{weatherData.temperature} Celsius
                </div>
                <div>
                    <img 
                        width="100"
                        height="100"
                        src={weatherData.weather_icons[0]} 
                        alt={weatherData.weather_descriptions} 
                    />
                </div>
                <div>
                    <strong>wind: </strong> &nbsp;
                    {weatherData.wind_speed} mph direction {weatherData.wind_dir}
                </div>
             </div>
        ) : null
}

export default WeatherReport