import { ThemeProvider } from 'styled-components'

import { Header } from '../Header'

import { GlobalStyles } from '../../assets/styles/global'
import { defaultTheme } from '../../assets/styles/themes'

import * as Styled from './App.styles'

export function App () {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <Styled.Container>
        <Header />
      </Styled.Container>
    </ThemeProvider>
  )
}
