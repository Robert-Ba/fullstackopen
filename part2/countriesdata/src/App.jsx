import { useState, useEffect } from 'react'
import CountriesService from './services/countries'
import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'

/**
 * Parent component for countries data app. 
 * Fetch all country data and filter countries using user input.
 * Display data and weather for a country if only one.
 * Click Show button to show a specific country.
 * @component
 */
const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [countriesFiltered, setFilteredCountries] = useState([])
  const [loading, setLoading] = useState(true)

  // Load list of countries on first render
  useEffect(() => {
    setLoading(true)
    CountriesService
      .getAll()
      .then(res => {
        setCountries(res)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        console.error(err)
        alert("There was an error getting country data.")
      })
  }, [])

  // Filter the countries as a side effect when the filter changes.
  // Another method is to assign countriesFiltered as a regular variable that would populate on every rerender.
  useEffect(() => {
    if(filter !== '') {
      // Apply filter
      const regx = new RegExp(`(${filter})`, 'i')
      const filtered = countries.filter(country => country.name.common.match(regx))
      setFilteredCountries(filtered)
    } else {
      setFilteredCountries([])
    }
  }, [filter])

  if(loading) {
    return <>Loading data...</>
  }

  return (
    <div>
      <div>Find countries <input onChange={(e) => setFilter(e.target.value)} value={filter} /></div>
      {(countriesFiltered.length === 1) 
        ? <CountryInfo country={countriesFiltered[0]} />
        : <CountryList countries={countriesFiltered} setFilter={setFilter} />}
    </div>
  )
}

export default App
