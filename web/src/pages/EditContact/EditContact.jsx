import { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import ContactsService from '../../services/ContactsService'

import { toast } from '../../utils/toast'

import { ContactForm } from '../../components/ContactForm'
import { Loader } from '../../components/Loader'
import { PageHeader } from '../../components/PageHeader'

export function EditContact () {
  const [isLoading, setIsLoading] = useState(true)
  const [contactName, setContactName] = useState('')

  const contactFormRef = useRef(null)

  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    async function loadContact () {
      try {
        const contact = await ContactsService.getContactById(id)

        setContactName(contact.name)

        contactFormRef.current.setFieldsValue(contact)

        setIsLoading(false)
      } catch {
        history.push('/')

        toast({
          type: 'danger',
          text: 'Contato não encontrado!'
        })
      }
    }

    loadContact()
  }, [id, history])

  async function handleSubmit ({
    name,
    email,
    phone,
    categoryId
  }) {
    try {
      const contact = {
        name,
        email,
        phone,
        category_id: categoryId
      }

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
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={
          isLoading
            ? 'Carregando...'
            : `Editar ${contactName}`
        }
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel='Salvar alterações'
        onSubmit={handleSubmit}
      />
    </>
  )
}
