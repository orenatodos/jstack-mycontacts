import ReactDOM from 'react-dom'

import * as Styled from './Loader.styles'

export function Loader () {
  return ReactDOM.createPortal(
    <Styled.Overlay>
      <Styled.Loader />
    </Styled.Overlay>,
    document.getElementById('fullscreen-root')
  )
}
