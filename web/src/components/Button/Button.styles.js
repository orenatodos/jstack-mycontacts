import styled, { css } from 'styled-components'

export const Button = styled.button`
  ${({ theme, danger }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.primary.main};
    border: 0;
    border-radius: 4px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    color: #FFF;
    font-weight: bold;
    height: 52px;
    outline: 0;
    padding: 0 16px;
    transition: background 0.2s ease-in;

    &:enabled:hover {
      background: ${theme.colors.primary.light};
    }

    &:enabled:active {
      background: ${theme.colors.primary.dark};
    }

    &:disabled {
      background: #CCC;
      cursor: default;
    }

    ${danger && css`
      background: ${theme.colors.danger.main};

      &:enabled:hover {
        background: ${theme.colors.danger.light};
      }

      &:enabled:active {
        background: ${theme.colors.danger.dark};
      }
    `}
  `}
`
