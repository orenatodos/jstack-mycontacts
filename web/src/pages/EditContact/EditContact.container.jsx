import { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction'

import ContactsService from '../../services/ContactsService'

import { toast } from '../../utils/toast'

import { EditContactPresentation } from './EditContact.presentation'

export function EditContactContainer () {
  const [isLoading, setIsLoading] = useState(true)
  const [contactName, setContactName] = useState('')

  const contactFormRef = useRef(null)

  const { id } = useParams()
  const history = useHistory()
  const safeAsyncAction = useSafeAsyncAction()

  useEffect(() => {
    async function loadContact () {
      try {
        const contact = await ContactsService.getContactById(id)

        safeAsyncAction(() => {
          setContactName(contact.name)

          contactFormRef.current.setFieldsValue(contact)

          setIsLoading(false)
        })
      } catch {
        safeAsyncAction(() => {
          history.push('/')

          toast({
            type: 'danger',
            text: 'Contato não encontrado!'
          })

          setIsLoading(false)
        })
      }
    }

    loadContact()
  }, [id, history, safeAsyncAction])

  async function handleSubmit (contact) {
    try {
      const updatedContact = await ContactsService.updateContact(
        id,
        contact
      )

      setContactName(updatedContact.name)

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!'
      })
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!'
      })
    }
  }

  return (
    <EditContactPresentation
      isLoading={isLoading}
      contactName={contactName}
      contactFormRef={contactFormRef}
      onSubmit={handleSubmit}
    />
  )
}
