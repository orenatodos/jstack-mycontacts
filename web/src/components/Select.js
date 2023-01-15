import styled, { css } from 'styled-components'

export const Select = styled.select`
  ${({ theme }) => css`
    appearance: none;
    width: 100%;
    background: #FFF;
    border: 2px solid transparent;
    border-radius: 4px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    color: ${theme.colors.gray[200]};
    height: 52px;
    outline: 0;
    padding: 0 16px;
    transition: border-color 0.2s ease-in;

    &:focus {
      border-color: ${theme.colors.primary.main};
    }

    &:disabled {
      background: ${theme.colors.gray[100]};
      border-color: ${theme.colors.gray[200]};
      cursor: default;
      opacity: 1;
    }
  `}
`
