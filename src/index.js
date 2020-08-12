import React from 'react'
import ReactDOM from 'react-dom'
import 'typeface-arimo'
import App from './App'
import store from './store'
import { StylesProvider, createGenerateClassName } from '@material-ui/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Provider } from 'react-redux'

const project_name = 'courses-soffit'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#b89f74',
      main: '#877148',
      dark: '#58461f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#56a2ea',
      main: '#0074b7',
      dark: '#004987',
      contrastText: '#fff',
    },
  },
})

const generateClassName = createGenerateClassName({
  productionPrefix: project_name,
  disableGlobal: true,
})

ReactDOM.render(
  <StylesProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </StylesProvider>,
  document.getElementById(project_name)
)
