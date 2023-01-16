import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import ContactsService from '../../services/ContactsService'

import { toast } from '../../utils/toast'

import { Button } from '../../components/Button'
import { Loader } from '../../components/Loader'
import { Modal } from '../../components/Modal'

import arrowIcon from '../../assets/icons/arrow.svg'
import editIcon from '../../assets/icons/edit.svg'
import trashIcon from '../../assets/icons/trash.svg'
import sadImage from '../../assets/images/sad.svg'
import emptyBoxImage from '../../assets/images/empty-box.svg'
import magnifierQuestionImage from '../../assets/images/magnifier-question.svg'

import * as Styled from './Home.styles'

export function Home () {
  const [contacts, setContacts] = useState([])
  const [orderBy, setOrderBy] = useState('ASC')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }, [contacts, searchTerm])

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true)

      const contactList = await ContactsService.listContacts(orderBy)

      setHasError(false)
      setContacts(contactList)
    } catch {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }, [orderBy])

  useEffect(() => {
    loadContacts()
  }, [loadContacts])

  function handleToggleOrderBy () {
    setOrderBy((prevState) => prevState === 'ASC' ? 'DESC' : 'ASC')
  }

  function handleChangeSearchTerm (event) {
    const { value } = event.target

    setSearchTerm(value)
  }

  function handleTryAgain () {
    loadContacts()
  }

  function handleDeleteContact (contact) {
    setContactBeingDeleted(contact)

    setIsDeleteModalVisible(true)
  }

  function handleCloseDeleteModal () {
    setIsDeleteModalVisible(false)
    setContactBeingDeleted(null)
  }

  async function handleConfirmDeleteContact () {
    try {
      setIsLoadingDelete(true)

      await ContactsService.deleteContact(contactBeingDeleted.id)

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!'
      })

      handleCloseDeleteModal()

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id
      ))
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato!!'
      })
    } finally {
      setIsLoadingDelete(false)
    }
  }

  return (
    <Styled.Container>
      <Loader isLoading={isLoading} />

      <Modal
        isVisible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
        danger
        title={
          `Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`
        }
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
      >
        <p>Está ação não poderá ser desfeita!</p>
      </Modal>

      {!!contacts.length && (
        <Styled.InputSearchContainer>
          <input
            type="text"
            placeholder='Pesquisar contato...'
            value={searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </Styled.InputSearchContainer>
      )}

      <Styled.Header
        justifyContent={hasError ? 'flex-end' : (contacts.length ? 'space-between' : 'center')}
      >
        {(!hasError && !!contacts.length) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}

        <Link to="/new">Novo contato</Link>
      </Styled.Header>

      {hasError && (
        <Styled.ErrorContainer>
          <img src={sadImage} alt="Sad" width={84} height={84} />

          <div className="details">
            <strong>
              Ocorreu um erro ao obter os seus contatos!
            </strong>

            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </Styled.ErrorContainer>
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <Styled.EmptyListContainer>
              <img
                src={emptyBoxImage}
                alt="Empty Box"
                width={110}
                height={77}
              />

              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>”Novo contato”</strong> à cima para cadastrar o seu primeiro!
              </p>
            </Styled.EmptyListContainer>
          )}

          {(!!contacts.length && filteredContacts.length < 1) && (
            <Styled.SearchNotFoundContainer>
              <img
                src={magnifierQuestionImage}
                alt="Magnifier question"
                width={58}
                height={58}
              />

              <p>
                Nenhum resultado foi encontrado para <strong>”{searchTerm}”</strong>.
              </p>
            </Styled.SearchNotFoundContainer>
          )}

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

                  <button
                    type="button"
                    onClick={() => handleDeleteContact(contact)}
                  >
                    <img src={trashIcon} alt="Delete" width={20} />
                  </button>
                </div>
              </Styled.Card>
            ))}
          </Styled.ListContainer>
        </>
      )}
    </Styled.Container>
  )
}
