import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import { Header } from '../Header'

import { Routes } from '../../Routes'

import { GlobalStyles } from '../../assets/styles/global'
import { defaultTheme } from '../../assets/styles/themes'

import * as Styled from './App.styles'

export function App () {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />

        <Styled.Container>
          <Header />
          <Routes />
        </Styled.Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}
