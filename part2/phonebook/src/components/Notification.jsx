const Notification = ({ successMessage, errorMessage }) => {
  const notificationStyle = {
    color: errorMessage ? 'red' : 'green',
    fontSize: 20,
    border: 'solid 4px',
    borderColor: errorMessage ? 'red' : 'green',
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10
  }

  if(successMessage || errorMessage) {
    return (
      <div style={notificationStyle}>
        { errorMessage ? errorMessage : successMessage }
      </div>
    )
  } else {
    return null
  }
}

export default Notification