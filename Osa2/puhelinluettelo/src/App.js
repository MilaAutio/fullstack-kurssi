import { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])

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
    personsService.getAll().then( data => { setPersons(data) } )
  }, [])

  const addNewContact = (event) => {
    event.preventDefault()
    const newContact = {
      name: newName,
      number: newNumber
    }
    if(persons.some( person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        const contact = persons.find(person => person.name === newName)
        personsService.update(contact.id, newContact)
        .then( updatedContact => {
          setPersons( persons.map( person => person.id !== contact.id ? person : updatedContact ) )
          setMessage(
            `'${updatedContact.name}' updated`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        } )
        .catch(error => {
          setErrorMessage(
            `'${contact.name}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    } else {
      personsService.create(newContact)
      .then( returnedPerson => { 
        setPersons( persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setMessage(
          `'${returnedPerson.name}' added`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })

    }
  }

  const removeContact = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(person.id)
      .then( removedContact => { 
        setPersons( contacts =>
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

  const filteredPersons = filterValue
    ? persons.filter( person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Notification message={errorMessage} type='error' />
      <Filter persons={persons} filterValue={filterValue} handleFilterChange={handleFilterChange} />
      <h2>Add New</h2>
      <PersonForm addNewContact={addNewContact} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} removeContact={removeContact} />
    </div>
  )
}

const Notification = (props) => {
  if(props.message) {
    if( props.type == 'error') {
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

const Persons = (props) => {
  const filteredPersons = props.filteredPersons

  return (
    <>
      {filteredPersons.map( person => <p key={person.name}> {person.name} {person.number} <button onClick={() => props.removeContact(person)}>Delete</button></p>)}
    </>
  )
}

export default App
