import styled, { css } from 'styled-components'

const containerVariants = {
  default: (theme) => css`
    background: ${theme.colors.primary.main};
  `,
  danger: (theme) => css`
    background: ${theme.colors.danger.main};
  `,
  success: (theme) => css`
    background: ${theme.colors.success.main};
  `
}

export const Container = styled.div`
  ${({ theme, type }) => css`
    border-radius: 4px;
    box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
    color: #FFF;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    padding: 16px 32px;

    & + & {
      margin-top: 12px;
    }

    ${!!type && containerVariants[type ?? 'default'](theme)};
  `}
`
