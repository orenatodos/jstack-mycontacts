import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import arrowIcon from '../../assets/icons/arrow.svg'
import editIcon from '../../assets/icons/edit.svg'
import trashIcon from '../../assets/icons/trash.svg'

import * as Styled from './Home.styles'

export function Home () {
  const [contacts, setContacts] = useState([])
  const [orderBy, setOrderBy] = useState('ASC')

  useEffect(() => {
    async function loadContacts () {
      const response = await fetch(`
        http://localhost:3001/contacts?orderBy=${orderBy}
      `)

      const data = await response.json()

      return setContacts(data)
    }

    loadContacts()
  }, [orderBy])

  function handleToggleOrderBy () {
    setOrderBy((prevState) => prevState === 'ASC' ? 'DESC' : 'ASC')
  }

  return (
    <Styled.Container>
      <Styled.InputSearchContainer>
        <input type="text" placeholder='Pesquisar contato...'/>
      </Styled.InputSearchContainer>

      <Styled.Header>
        <strong>
          {contacts.length === 1 ? ' contato' : ' contatos'}
        </strong>

        <Link to="/new">Novo contato</Link>
      </Styled.Header>

      <Styled.ListContainer orderBy={orderBy}>
        <header>
          <button type='button' onClick={handleToggleOrderBy}>
            Nome

            <img src={arrowIcon} alt="Arrow" width={15} />
          </button>
        </header>

        {contacts.map((contact) => (
          <Styled.Card key={contact.id}>
            <div className='info'>
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category_name && (
                  <small>{contact.category_name}</small>
                )}
              </div>

              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>

            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={editIcon} alt="Edit" width={20} />
              </Link>

              <button type="button">
                <img src={trashIcon} alt="Delete" width={20} />
              </button>
            </div>
          </Styled.Card>
        ))}
      </Styled.ListContainer>
    </Styled.Container>
  )
}
