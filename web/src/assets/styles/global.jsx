import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: ${theme.colors.background};
      color: ${theme.colors.gray[900]};
    }

    body,
    button,
    input,
    select,
    textarea {
      font-family: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 16px;
    }

    button {
      cursor: pointer;
    }
  `}
`
