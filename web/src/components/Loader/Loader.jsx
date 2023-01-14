import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { Spinner } from '../Spinner'

import * as Styled from './Loader.styles'

export function Loader ({ isLoading }) {
  if (!isLoading) {
    return null
  }

  return ReactDOM.createPortal(
    <Styled.Overlay>
      <Spinner size={90} />
    </Styled.Overlay>,
    document.getElementById('fullscreen-root')
  )
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired
}
