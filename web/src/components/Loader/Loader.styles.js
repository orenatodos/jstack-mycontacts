import styled, { css, keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

export const Overlay = styled.div`
  ${({ isLeaving }) => css`
    background: rgba(246, 245, 252, 0.7);
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${fadeIn} 0.3s;

    ${isLeaving && css`
      animation: ${fadeOut} 0.3s forwards;
    `}
  `}
`
