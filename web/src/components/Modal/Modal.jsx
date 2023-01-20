import PropTypes from 'prop-types'

import { useAnimatedUnmount } from '../../hooks/useAnimatedUnmount'

import { Button } from '../Button'
import { ReactPortal } from '../ReactPortal'

import * as Styled from './Modal.styles'

export function Modal ({
  danger,
  isVisible,
  isLoading,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm
}) {
  const {
    shouldRender,
    animatedElementRef
  } = useAnimatedUnmount(isVisible)

  if (!shouldRender) {
    return null
  }

  return (
    <ReactPortal containerId='modal-root'>
      <Styled.Overlay isLeaving={!isVisible} ref={animatedElementRef}>
        <Styled.Container danger={danger} isLeaving={!isVisible}>
          <h1>{title}</h1>

          <div className="modal-body">
            {children}
          </div>

          <Styled.Footer>
            <button
              type="button"
              className='cancel-button'
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>

            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Styled.Footer>
        </Styled.Container>
      </Styled.Overlay>
    </ReactPortal>
  )
}

Modal.propTypes = {
  danger: PropTypes.bool,
  isVisible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}

Modal.defaultProps = {
  danger: false,
  isLoading: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar'
}
