import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
//import registerServiceWorker from "./registerServiceWorker"
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles"
import "typeface-arimo"
import { I18nextProvider } from "react-i18next"
import i18n from "./utils/i18n"
import { create } from "jss"
import preset from "jss-preset-default"
import { JssProvider } from "react-jss"


const theme = createMuiTheme({
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
      contrastText: '#fff'
    }
  },
})


const rootElement = "root"
const jss = create(preset())

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <JssProvider jss={jss}>
      <MuiThemeProvider theme={theme}>
        <App rootElement={rootElement} />
      </MuiThemeProvider>
    </JssProvider>
  </I18nextProvider>,
  document.getElementById(rootElement)
)
//registerServiceWorker()
