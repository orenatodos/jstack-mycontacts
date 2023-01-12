import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { delay } from '../../utils/delay'

import { Loader } from '../../components/Loader'

import arrowIcon from '../../assets/icons/arrow.svg'
import editIcon from '../../assets/icons/edit.svg'
import trashIcon from '../../assets/icons/trash.svg'

import * as Styled from './Home.styles'

export function Home () {
  const [contacts, setContacts] = useState([])
  const [orderBy, setOrderBy] = useState('ASC')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }, [contacts, searchTerm])

  useEffect(() => {
    setIsLoading(true)

    async function loadContacts () {
      try {
        const response = await fetch(`
        http://localhost:3001/contacts?orderBy=${orderBy}
      `)

        await delay()

        const data = await response.json()

        setContacts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadContacts()
  }, [orderBy])

  function handleToggleOrderBy () {
    setOrderBy((prevState) => prevState === 'ASC' ? 'DESC' : 'ASC')
  }

  function handleChangeSearchTerm (event) {
    const { value } = event.target

    setSearchTerm(value)
  }

  return (
    <Styled.Container>
      <Loader isLoading={isLoading} />

      <Styled.InputSearchContainer>
        <input
          type="text"
          placeholder='Pesquisar contato...'
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      </Styled.InputSearchContainer>

      <Styled.Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>

        <Link to="/new">Novo contato</Link>
      </Styled.Header>

      <Styled.ListContainer orderBy={orderBy}>
        {filteredContacts.length > 0 && (
          <header>
            <button type='button' onClick={handleToggleOrderBy}>
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
