import PropTypes from 'prop-types'

import { useAnimatedUnmount } from '../../hooks/useAnimatedUnmount'

import { Spinner } from '../Spinner'
import { ReactPortal } from '../ReactPortal'

import * as Styled from './Loader.styles'

export function Loader ({ isLoading }) {
  const {
    shouldRender,
    animatedElementRef
  } = useAnimatedUnmount(isLoading)

  if (!shouldRender) {
    return null
  }

  return (
    <ReactPortal containerId='loader-root'>
      <Styled.Overlay
        isLeaving={!isLoading}
        ref={animatedElementRef}
      >
        <Spinner size={90} />
      </Styled.Overlay>
    </ReactPortal>
  )
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired
}
