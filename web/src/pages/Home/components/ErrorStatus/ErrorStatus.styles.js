import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    margin-top: 16px;
    display: flex;
    align-items: center;
    gap: 24px;

    .details {
      strong {
        font-size: 22px;
        color: ${theme.colors.danger.main};
        display: block;
        margin-bottom: 8px;
      }
    }
  `}
`
