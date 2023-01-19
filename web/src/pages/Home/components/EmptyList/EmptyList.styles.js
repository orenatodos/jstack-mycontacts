import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      color: ${theme.colors.gray[200]};
      text-align: center;
      margin-top: 8px;

      strong {
        color: ${theme.colors.primary.main};
      }
    }
  `}
`
