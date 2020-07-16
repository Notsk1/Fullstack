import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonFrom'
import personService from './services/personService'
import Notification from './components/Notfication'
import './index.css'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [notAll, setNotAll] = useState(persons)
    const [errorMessage, setErrorMessage] = useState(null)
    const [thing, setThing] = useState(0)

    const hook = () => {
        console.log('effect')
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
                setNotAll(initialPersons)
            })
    }

    useEffect(hook, [])

    const addNameSuc = (person, numero) => {
        setThing(0)
        if (numero === 0) {
            setErrorMessage(
                `Added ${person.name}`
            )
        }
        else {
            setErrorMessage(
                `Changed ${person.name} number`
            )
        }
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }
    const addName = (event) => {
        event.preventDefault()
        setNewFilter('')
        var truth = true;
        for (var key in persons) {
            var value = persons[key]
            if (value.name === newName) {
                truth = false
                var persont = value
            }
        }
        if (truth) {
            const nameObject = {
                name: newName,
                number: newNumber,
            }
            personService
                .create(nameObject)
                .then(returnedName => {
                    setPersons(persons.concat(returnedName))
                    addNameSuc(returnedName, 0)
                })
            hook()
        }
        else {
            var result = window.confirm(`${persont.name} is already added to phonebook, replace the old number
                                        with a new one?`)
            if (result) {
                const newObject = {
                    ...persont,
                    number:newNumber
                }
                personService
                    .update(persont.id, newObject)
                    .then(returnedName => {
                        setPersons(persons.concat(returnedName))
                        addNameSuc(returnedName, 1)
                    })            
                hook()
            }
        }     
        setNewName('')
        setNewNumber('')
       
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value.toLowerCase())
        setNotAll(persons.filter(
            (persons) => {
                return persons.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1;
            }
        ))
    }

    const handleDelete = (id) => {
        console.log(id)
        const person = persons.find(n => n.id === id)
        var result = window.confirm(`Delete ${person.name}?`)
        if (result) {
            personService
                .deleteThis(id, person)
                .catch(error => {
                    setThing(1)
                    setErrorMessage(
                        `Persons '${person.name}' was already removed from server`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
            hook()
        }     
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} thing={thing}/>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}
                newNumber={newNumber} handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons personsToShow={notAll} handleDelete={handleDelete} />
            {console.log('main frame')}
        </div>
        
    )

}

export default App