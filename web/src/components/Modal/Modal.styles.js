import styled, { css } from 'styled-components'

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(7px);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Container = styled.div`
  ${({ theme, danger }) => css`
    background: #FFF;
    border-radius: 4px;
    padding: 24px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    width: 100%;
    max-width: 450px;

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
