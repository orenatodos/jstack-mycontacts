import { useCallback, useEffect, useMemo, useState } from 'react'

import ContactsService from '../../services/ContactsService'

import { toast } from '../../utils/toast'

export function useHome () {
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

  return {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    handleTryAgain,
    filteredContacts,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact
  }
}
