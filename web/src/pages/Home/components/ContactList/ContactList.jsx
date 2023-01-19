import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import arrowIcon from '../../../../assets/icons/arrow.svg'
import editIcon from '../../../../assets/icons/edit.svg'
import trashIcon from '../../../../assets/icons/trash.svg'

import * as Styled from './ContactList.styles'

export function ContactList ({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact
}) {
  return (
    <>
      <Styled.Container orderBy={orderBy}>
        {filteredContacts.length > 0 && (
          <header>
            <button type='button' onClick={onToggleOrderBy}>
              Nome

              <img src={arrowIcon} alt="Arrow" width={15} />
            </button>
          </header>
        )}

        {filteredContacts.map((contact) => (
          <Styled.Card key={contact.id}>
            <div className='info'>
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category.name && (
                  <small>{contact.category.name}</small>
                )}
              </div>

              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>

            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={editIcon} alt="Edit" width={20} />
              </Link>

              <button
                type="button"
                onClick={() => onDeleteContact(contact)}
              >
                <img src={trashIcon} alt="Delete" width={20} />
              </button>
            </div>
          </Styled.Card>
        ))}
      </Styled.Container>
    </>
  )
}

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string
    })
  })).isRequired,
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired
}

ContactList.defaultProps = {
  contactBeingDeleted: null
}
