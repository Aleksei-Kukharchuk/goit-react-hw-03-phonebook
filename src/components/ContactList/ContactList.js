import PropTypes from 'prop-types'
import s from './ContactList.module.css'

export default function ContactList({ contacts, onDeleteContact }) {
    return ( 
        <ul className={s.list}> 
            {contacts.map(contact => (
                <li key={contact.id} className={s.item}>
                    <span className={s.bullet}/>
                    {contact.name}: {contact.number}
                    <button onClick={ () => onDeleteContact(contact.id)} className={s.button}>Delete</button>
                </li>)
            )} 
        </ul>
    ) 
}

ContactList.propType = {
    contacts: PropTypes.array,
    onDeleteContact: PropTypes.func,
}