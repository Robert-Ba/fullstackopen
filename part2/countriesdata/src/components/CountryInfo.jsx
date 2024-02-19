import { useState, useEffect } from "react"

import WeatherService from '../services/weather'

/**
 * A component for displaying the details of one country and weather from https://api.openweathermap.org.
 * NOTE: Could probably make this better and separate weather section into another component. Spent enough time on this already.
 * @component
 */
const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState({})
  const [notification, setNotification] = useState('Loading weather...')

  useEffect(() => {
    // country.latlng is an array with two numbers representing latitude and longitude
    const [lat, lon] = country.latlng

    WeatherService
      .get(lat, lon)
      .then(res => {
        setNotification('')
        setWeather(res)
      })
      .catch(err => {
        console.error(err)
        setWeather({})
        setNotification(`Could not retrieve weather for ${country.name.common}. (Please set VITE_WEATHER_KEY in .env for openweathermap.org)`)
      })
  }, [])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital[0]}</div>
      <div>Area: {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li> )}
      </ul>
      <img alt={country.flags.alt} src={country.flags.png} width={200} />
      {
        notification ? <div>{notification}</div> :
        <div>
          <h3>Weather for {country.name.common}</h3>
          <div>Temperature {weather.main.temp} Celcius</div>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          <div>Wind {weather.wind.speed} m/s</div>
        </div>
      }
    </div>
  )
}

export default CountryInfo