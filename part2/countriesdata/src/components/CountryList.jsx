/**
 * A component to display a list of countries or depending on the state of the filter.
 * There is a Show button for each country to display data and weather for that country.
 * @component
 */
const CountryList = ({ countries, setFilter }) => {
  if(countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>
  }
  
  return (
    <div>
      {countries.map(country => {
        return (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => setFilter(country.name.common)}>Show</button>
          </div>)
      })}
    </div>
  )
}

export default CountryList