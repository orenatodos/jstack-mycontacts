import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react'
import PropTypes from 'prop-types'

import { useErrors } from '../../hooks/useErrors'
import { useSafeAsyncState } from '../../hooks/useSafeAsyncState'

import { formatPhone } from '../../utils/formatPhone'
import { isEmailValid } from '../../utils/isEmailValid'

import CategoriesService from '../../services/CategoriesService'

import { Button } from '../Button'
import { FormGroup } from '../FormGroup'
import { Select } from '../Select'
import { TextField } from '../TextField'

import * as Styled from './ContactForm.styles'

export const ContactForm = forwardRef((
  {
    buttonLabel,
    onSubmit
  },
  forwardedRef
) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useSafeAsyncState([])
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    errors,
    getErrorMessageByFieldName,
    removeError,
    setError
  } = useErrors()

  const isFormValid = name && !errors.length

  useImperativeHandle(forwardedRef, () => ({
    setFieldsValue: (contact) => {
      setName(contact.name ?? '')
      setEmail(contact.email ?? '')
      setPhone(formatPhone(contact.phone) ?? '')
      setCategoryId(contact.category_id ?? '')
    },
    resetFields: () => {
      setName('')
      setEmail('')
      setPhone('')
      setCategoryId('')
    }
  }), [])

  useEffect(() => {
    async function loadCategories () {
      try {
        const categoryList = await CategoriesService.listCategories()

        setCategories(categoryList)
      } catch {} finally {
        setIsLoadingCategories(false)
      }
    }

    loadCategories()
  }, [setCategories, setIsLoadingCategories])

  function handleNameChange (event) {
    const { value } = event.target

    setName(value)

    const valueIsEmpty = !value.trim()

    if (valueIsEmpty) {
      return setError({
        field: 'name',
        message: 'Nome é obrigatório'
      })
    }

    return removeError('name')
  }

  function handleEmailChange (event) {
    const { value } = event.target

    setEmail(value)

    const emailIsInvalid = value && !isEmailValid(value)

    if (emailIsInvalid) {
      return setError({
        field: 'email',
        message: 'E-mail inválido'
      })
    }

    return removeError('email')
  }

  function handlePhoneChange (event) {
    const { value } = event.target

    setPhone(formatPhone(value))
  }

  function handleCategoryChange (event) {
    setCategoryId(event.target.value)
  }

  async function handleSubmit (event) {
    event.preventDefault()

    setIsSubmitting(true)

    await onSubmit({
      name,
      email,
      phone,
      categoryId
    })

    setIsSubmitting(false)
  }

  return (
    <Styled.Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <TextField
          placeholder="Nome *"
          error={getErrorMessageByFieldName('name')}
          value={name}
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <TextField
          type="email"
          placeholder="E-mail"
          error={getErrorMessageByFieldName('email')}
          value={email}
          onChange={handleEmailChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <TextField
          placeholder="Telefone"
          maxLength={15}
          value={phone}
          onChange={handlePhoneChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={handleCategoryChange}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <Button
        type="submit"
        disabled={!isFormValid}
        isLoading={isSubmitting}
      >
        {buttonLabel}
      </Button>
    </Styled.Form>
  )
})

ContactForm.displayName = 'ContactForm'

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}
