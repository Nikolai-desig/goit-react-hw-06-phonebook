import React from 'react';
import PropTypes from 'prop-types';
import css from './Contactlist.module.css';
import { delContact } from 'redux/slice';
import { useSelector, useDispatch } from 'react-redux';

const getContacts = (items, filter) =>
  items.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

const ContactsList = () => {
  const items = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const contacts = getContacts(items, filter);
  const dispatch = useDispatch();

  const onDeleteContact = id => {
    dispatch(delContact(id));
  };

  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={css.item} key={id}>
          <p className={css.names}>
            {name}
            <span className={css.number}>{number}</span>
          </p>
          <button
            onClick={() => onDeleteContact(id)}
            className={css.button}
            type="button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      onDeleteContact: PropTypes.func.isRequired,
    })
  ),
};

export default ContactsList;
