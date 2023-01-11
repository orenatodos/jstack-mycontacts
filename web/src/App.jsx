import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from './assets/styles/global'
import { defaultTheme } from './assets/styles/themes'

export function App () {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>MyContacts</h1>
      <GlobalStyles />
    </ThemeProvider>
  )
}
