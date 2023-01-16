import PropTypes from 'prop-types'

import { Spinner } from '../Spinner'
import { ReactPortal } from '../ReactPortal'

import * as Styled from './Loader.styles'

export function Loader ({ isLoading }) {
  if (!isLoading) {
    return null
  }

  return (
    <ReactPortal containerId='loader-root'>
      <Styled.Overlay>
        <Spinner size={90} />
      </Styled.Overlay>
    </ReactPortal>
  )
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired
}
