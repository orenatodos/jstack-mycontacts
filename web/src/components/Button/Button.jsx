import PropTypes from 'prop-types'

import { Spinner } from '../Spinner'

import * as Styled from './Button.styles'

export function Button ({
  children,
  disabled,
  isLoading,
  danger,
  ...props
}) {
  return (
    <Styled.Button
      type="button"
      danger={danger}
      disabled={disabled || isLoading}
      {...props}
    >
      {!isLoading && children}
      {isLoading && <Spinner size={16} /> }
    </Styled.Button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  danger: PropTypes.bool
}

Button.defaultProps = {
  isDisabled: false,
  isLoading: false,
  danger: false
}
