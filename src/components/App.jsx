import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

const LS_KEY = 'saved_contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    if (localStorage.getItem(LS_KEY)) {
      return JSON.parse(localStorage.getItem(LS_KEY));
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const alreadyIn = contacts.find(
      existingContact =>
        existingContact.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (alreadyIn) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    setContacts(prevState => [...prevState, contact]);
  };
  const removeContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };
  const handleFilterState = evt => {
    setFilter(evt.target.value);
  };
  const filteredContacts = (contacts, filter) => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact}></ContactForm>

      {contacts.length === 0 ? (
        <p>You don`t have any contact yet</p>
      ) : (
        <>
          <h2>Contacts</h2>

          <Filter onChange={handleFilterState}></Filter>
          <ContactsList
            props={filteredContacts(contacts, filter)}
            removeContact={removeContact}
          />
        </>
      )}
    </div>
  );
};
