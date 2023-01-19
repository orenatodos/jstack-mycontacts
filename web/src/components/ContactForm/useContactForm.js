import { useEffect, useImperativeHandle, useState } from 'react'

import { useSafeAsyncState } from '../../hooks/useSafeAsyncState'
import { useErrors } from '../../hooks/useErrors'

import CategoriesService from '../../services/CategoriesService'

import { formatPhone } from '../../utils/formatPhone'
import { isEmailValid } from '../../utils/isEmailValid'

export function useContactForm (onSubmit, forwardedRef) {
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
      setCategoryId(contact.category.id ?? '')
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

  return {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    handleCategoryChange,
    categories,
    isFormValid
  }
}
