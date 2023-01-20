import styled, { css, keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

const scaleIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`

const scaleOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0); }
`

export const Overlay = styled.div`
  ${({ isLeaving }) => css`
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(7px);
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

export const Container = styled.div`
  ${({ theme, danger, isLeaving }) => css`
    background: #FFF;
    border-radius: 4px;
    padding: 24px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    width: 100%;
    max-width: 450px;
    animation: ${scaleIn} 0.3s;

    ${isLeaving && css`
      animation: ${scaleOut} 0.3s forwards;
    `}

    & > h1 {
      color: ${danger ? theme.colors.danger.main : theme.colors.gray[900]};
      font-size: 22px;
      margin-bottom: 8px;
    }

    .modal-body {
      margin-top: 32px;
    }
  `}
`

export const Footer = styled.footer`
  ${({ theme }) => css`
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 24px;

    .cancel-button {
      background: transparent;
      border: 0;
      color: ${theme.colors.gray[200]};

      &:disabled {
        cursor: default;
      }
    }
  `}
`
