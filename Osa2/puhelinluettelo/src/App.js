import { useState, useEffect } from 'react'
import peopleService from './services/people'
import './index.css'

const App = () => {
  const [people, setPeople] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilterValue] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilterValue(event.target.value)
  }

  useEffect(() => {
    peopleService.getAll().then( data => { setPeople(data) } )
  }, [])

  const addNewContact = (event) => {
    event.preventDefault()
    const newContact = {
      name: newName,
      number: newNumber
    }
    if(people.some( person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        const contact = people.find(person => person.name === newName)
        peopleService.update(contact.id, newContact)
        .then( updatedContact => {
          setPeople( people.map( person => person.id !== contact.id ? person : updatedContact ) )
          setMessage(
            `'${updatedContact.name}' updated`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        } )
        .catch( function( error ) {
          setErrorMessage( error.response.data.error )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    } else {
      peopleService.create(newContact)
      .then( returnedPerson => { 
        setPeople( people.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setMessage(
          `'${returnedPerson.name}' added`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch( function( error ) {
        console.log(error.response.data.error)
        setErrorMessage( error.response.data.error )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

    }
  }

  const removeContact = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      peopleService.remove(person.id)
      .then( removedContact => { 
        setPeople( contacts =>
          contacts.filter(contact => {
            return contact.id !== person.id;
          })
        );
        setMessage(
          `'${person.name}' removed`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
  }

  const filteredpeople = filterValue
    ? people.filter( person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
    : people

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Notification message={errorMessage} type='error' />
      <Filter people={people} filterValue={filterValue} handleFilterChange={handleFilterChange} />
      <h2>Add New</h2>
      <PersonForm addNewContact={addNewContact} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <People filteredpeople={filteredpeople} removeContact={removeContact} />
    </div>
  )
}

const Notification = (props) => {
  if(props.message) {
    if( props.type === 'error') {
      return (
        <div className="notification error">
          <p>{props.message}</p>
        </div>
      )
    } else {
      return (
        <div className="notification">
          <p>{props.message}</p>
        </div>
      )
    }
  }
}

const Filter = (props) => {
  return (
    <div>
      Filter shown with <input value={props.filterValue} onChange={props.handleFilterChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <>
      <form onSubmit={props.addNewContact}>
        <div>
          Name: <input value={props.newName} onChange={props.handleNameChange} /><br />
          Number: <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  )
}

const People = (props) => {
  const filteredpeople = props.filteredpeople

  return (
    <>
      {filteredpeople.map( person => <p key={person.name}> {person.name} {person.number} <button onClick={() => props.removeContact(person)}>Delete</button></p>)}
    </>
  )
}

export default App
