import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'

import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles'
import { AuthProvider } from './hooks/auth'
import GlobalStyle from './styles/global.js'
import theme from './styles/theme.js'


import { Routes } from './Routes/index.jsx'

const muiTheme = createTheme({
  palette: {
    checkbox: {

      primary: {
        main: '#82F3FF',
      },

    }
  },
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>

      <MUIThemeProvider theme={muiTheme}>

        <GlobalStyle />
        <AuthProvider>
          <Routes />
        </AuthProvider>


      </MUIThemeProvider>

    </ThemeProvider>
  </StrictMode>,
)
