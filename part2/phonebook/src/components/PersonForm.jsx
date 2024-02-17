
/**
 * A component containing a form for adding a new person to the phonebook.
 * @component
 */
const PersonForm = ({
  handleSubmitName, 
  setNewName,
  setNewPhone,
  newName,
  newPhone
}) => {
  return (
    <form onSubmit={handleSubmitName}>
      <div>name: <input value={newName} onChange={(e) => setNewName(e.target.value)} type="text" required /></div>
      <div>number: <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)} type="tel" required /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm