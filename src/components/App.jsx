import React, { useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from '../redux/selectors';
import { addContact, delContact, setFilter } from '../redux/createAction';
import axios from 'axios';

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const apiBaseUrl = 'https://64b65d67df0839c97e156daf.mockapi.io/contacts/contacts';

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}`);
        dispatch(addContact(response.data));
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [dispatch]);

  const handleSubmit = (e) => {
    const name = e.name;
    const number = e.number;

    const existingContact = contacts.find((c) => c.name.toLowerCase() === name.toLowerCase());

    if (existingContact) {
      alert(`${name} is already in contacts.`);
    } else {
      dispatch(addContact({ nameText: name, numberText: number }));
    }
  };

  const handleDelete = (contactId) => {
    dispatch(delContact(contactId));
  };

  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return filterContactsList;
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        marginLeft: 50,
        fontSize: 20,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} />
      <h2> Contacts </h2>
      <Filter />
      <ContactList contacts={getFilteredContacts()} handleDelete={handleDelete} />
    </div>
  );
};
