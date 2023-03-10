import PropTypes from 'prop-types'

import { Spinner } from '../Spinner'

import * as Styled from './FormGroup.styles'

export function FormGroup ({ children, error, isLoading }) {
  return (
    <Styled.Container>
      <div className="form-item">
        {children}

        {isLoading && (
          <div className="loader">
            <Spinner size={16} />
          </div>
        )}
      </div>

      {!!error && <small>{error}</small>}
    </Styled.Container>
  )
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool
}

FormGroup.defaultProps = {
  error: null,
  isLoading: false
}
