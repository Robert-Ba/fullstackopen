/**
 * A component to input text and filter the phonebook.
 * @component 
 */
const Filter = ({setFilter, nameFilter}) => 
  <div>filter shown with <input value={nameFilter} onChange={(e) => setFilter(e.target.value)} type="text" /></div>

export default Filter