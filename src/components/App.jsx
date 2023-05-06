import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  createContact = data => {
    const newContact = { id: nanoid(), ...data };

    const { contacts } = this.state;

    if (contacts.find(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, newContact] };
    });
  };

  deleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  setFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const filterValue = this.state.filter;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div
        style={{
          width: '400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          gap: '20px',
          borderRadius: '5px',
          fontSize: '16px',
          color: '#010101',
          backgroundColor: '#ffffff',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm createContact={this.createContact} />

        <h2>Contacts</h2>
        <Filter setFilter={this.setFilter} filterValue={filterValue} />
        <ContactList
          contacts={visibleContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
