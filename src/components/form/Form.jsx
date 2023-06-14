import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Form.module.css';
import { nanoid } from 'nanoid';
import { addContact } from 'redux/slice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Phonebook() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSumbit = e => {
    const id = nanoid();
    e.preventDefault();
    for (let i = 0; i < contacts.length; i++) {
      const element = contacts[i];

      if (element.name === name) {
        toast(`${name} is already in contacts.`);
        return;
      }
    }
    dispatch(addContact({ name, number, id }));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSumbit}>
      <label className={css.label}>
        Name
        <input
          className={css.submit}
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Enter Name"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={css.label}>
        Number
        <input
          className={css.submit}
          type="tel"
          value={number}
          onChange={handleChange}
          placeholder="Enter Number"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css.button} type="submit" disabled={!name || !number}>
        Add contact
      </button>
      <ToastContainer />
    </form>
  );
}

Phonebook.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Phonebook;
