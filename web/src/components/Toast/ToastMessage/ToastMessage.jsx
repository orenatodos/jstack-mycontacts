import { useEffect } from 'react'
import PropTypes from 'prop-types'

import * as Styled from './ToastMessage.styles'

import xCircleIcon from '../../../assets/icons/x-circle.svg'
import checkCircleIcon from '../../../assets/icons/check-circle.svg'

const typeIcons = {
  danger: xCircleIcon,
  success: checkCircleIcon
}

export function ToastMessage ({ message, onRemoveMessage }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id)
    }, message.duration || 5000)

    return () => clearTimeout(timeoutId)
  }, [message, onRemoveMessage])

  function handleRemoveToast () {
    onRemoveMessage(message.id)
  }

  return (
    <Styled.Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {message.type !== 'default' && (
        <img src={typeIcons[message.type]} width={24} height={24} />
      )}
      <strong>{message.text}</strong>
    </Styled.Container>
  )
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    duration: PropTypes.number
  }),
  onRemoveMessage: PropTypes.func.isRequired
}
