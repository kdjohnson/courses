import React from 'react'
import ReactDOM from 'react-dom'
import 'typeface-arimo'
import App from './App'
import i18n from './utils/i18n'
import store from './store'
import { I18nextProvider } from 'react-i18next'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#b89f74',
      main: '#877148',
      dark: '#58461f',
      contrastText: '#fff'
    },
    secondary: {
      light: '#56a2ea',
      main: '#0074b7',
      dark: '#004987',
      contrastText: '#fff'
    },
  }
})

const root_element = 'root'

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App root_element={root_element} />
        </Provider>
      </ThemeProvider>
  </I18nextProvider>,
  document.getElementById(root_element)
)
