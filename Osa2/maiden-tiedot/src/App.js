import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [text, setNewText] = useState('')
  const [foundCountries, setfoundCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleTextChange = (event) => {
    setNewText(event.target.value)
  }

  const handleShowClick = (countryName) => {
    setNewText(countryName)
  }

  const filteredCountries = foundCountries
  ? countries.filter( country => country.name.common.toLowerCase().includes(text.toLowerCase()))
  : false

  return (
    <div>
      Find countries: 
      <input onChange={handleTextChange} value={text}></input>
      <Countries countries={filteredCountries} handleShowClick={handleShowClick}></Countries>
    </div>
  )
}

const Countries = (props) => {
  const filteredCountries = props.countries

  if( filteredCountries.length > 10) {
    return (
      <>
        <p>Too many matches, specify another filter</p>
      </>
    )
  } else if( filteredCountries.length > 1 && filteredCountries.length <= 10 ) {
    return (
      <>
        {filteredCountries.map( country => 
          <p key={country.name.common}>{country.name.common}
            <button onClick={() => props.handleShowClick(country.name.common)} name="Show">Show</button>
          </p>
        )}
      </>
    )
  } else if( filteredCountries.length === 1 ) {
    return (
      <>
      {filteredCountries.map( country => 
        <div key={country.name.common}>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <b><p>Languages:</p></b>
          <Languages languages={country.languages}></Languages>
          <img src={country.flags.png} ></img>
          <Weather country={country}></Weather>
        </div>
        )}
      </>
    )
  } else {
    return (
      <>
        <p>Countries not found</p>
      </>
    )
  }
}

const Languages = (props) => {
  return (
     <>
      <ul>
        {
          Object.keys(props.languages).map((key, i) => (
            <li key={key}>
              <span>{props.languages[key]}</span>
            </li>
          ))
        }
      </ul>
     </>
  )
}

const Weather = (props) => {
  const country = props.country
  const [weather, setWeather] = useState({});
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`)
      .then(response => {
        setWeather({ ...weather, ...response.data })
      })
  }, [])

  if(Object.keys(weather).length !== 0) {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
          <p>Temperature { weather.main.temp } Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${ weather.weather[0].icon }@2x.png`} ></img>
          <p>Wind { weather.wind['speed'] } m/s</p>
      </div>
    )
  }
}

export default App