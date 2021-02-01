import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import s from './App.module.css'
import Section from './components/Section'
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from "./components/ContactList"
import Filter from "./components/Filter"

class App extends Component {

  state = {
    contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
         ],
    filter: ''
  }

  formSubmitHandler = data => {
    if (this.state.contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase())) {
      alert(`${data.name} is already in contacts`);
      return
    } else if (data.name === ''){
      alert(`Name field are empty`);
      return
    } else if (data.number === ''){
      alert(`Number field are empty`);
      return
    }
    
    this.setState({ contacts: [{ name: data.name, id: uuidv4(), number: data.number }, ...this.state.contacts,] })
  }

  changeFilter = e => {
    this.setState({filter: e.currentTarget.value})
  }

  deleteContacts = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }))
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
 
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  render() {

    const normalizedFilter = this.state.filter.toLowerCase()

    const visiableContacts = this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
  
    return (
      <div className={s.container}>
        <Section title='Phonebook'>
          <ContactForm onSubmit={this.formSubmitHandler}/>
        </Section>
        <Section title='Contacts'>
          <Filter value={this.state.filter} onChange={this.changeFilter}/>
          <ContactList contacts={visiableContacts} onDeleteContact={this.deleteContacts}/>
        </Section>
      </div>
    );
  }
}

export default App;