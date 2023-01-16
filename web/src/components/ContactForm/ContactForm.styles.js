import styled, { css } from 'styled-components'

export const Form = styled.form`
  ${({ theme }) => css`
    small {
      display: block;
      color: ${theme.colors.danger.main};
      font-size: 12px;
      margin-top: 8px;
    }

    button[type="submit"]{
      width: 100%;
      margin-top: 24px;
    }
  `}
`
