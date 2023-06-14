
import Form from './form/Form';
import ContactsList from './form/ContactList';
import css from './App.module.css';
import Filter from './form/Filter';

function App () {
    return (
      <div className={css.style}>
        <h1>Phonebook</h1>
        <Form />
        <h2>Contacts</h2>
        <Filter />
        <ContactsList />
      </div>
    );

}

export default App;
