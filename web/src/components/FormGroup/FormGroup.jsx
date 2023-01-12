import PropTypes from 'prop-types'

import * as Styled from './FormGroup.styles'

export function FormGroup ({ children, error }) {
  return (
    <Styled.Container>
      {children}

      {!!error && <small>{error}</small>}
    </Styled.Container>
  )
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string
}

FormGroup.defaultProps = {
  error: null
}
