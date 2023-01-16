import { useCallback, useEffect, useState } from 'react'

import { toastEventManager } from '../../../utils/toast'

import { ToastMessage } from '../ToastMessage/ToastMessage'

import * as Styled from './ToastContainer.styles'

export function ToastContainer () {
  const [messages, setMessages] = useState([])

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) => prevState.filter((message) => {
      return message.id !== id
    }))
  }, [])

  useEffect(() => {
    function handleAddToast ({ type, text, duration }) {
      // const { type, text } = event.detail

      setMessages((prevState) => [...prevState, {
        id: Math.random(),
        type,
        text,
        duration
      }])
    }

    toastEventManager.on('addtoast', handleAddToast)
    // document.addEventListener('addtoast', handleAddToast)

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast)
      // removeEventListener('addtoast', handleAddToast)
    }
  }, [])

  return (
    <Styled.Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Styled.Container>
  )
}
