import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    margin-top: 16px;
    display: flex;
    align-items: start;
    gap: 24px;

    p {
      color: ${theme.colors.gray[200]};
      word-break: break-word;
    }
  `}
`
