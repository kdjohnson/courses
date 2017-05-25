import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import "./index.css"
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles"
import createPalette from "material-ui/styles/palette"
import createTypography from "material-ui/styles/typography"
import { purple, green, red } from "material-ui/styles/colors"
import "typeface-oxygen"
import "raleway-webfont"

const palette = createPalette({
  type: "light"
})

const theme = createMuiTheme({
  typography: createTypography(palette, {
    fontFamily: "Raleway"
  })
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}><App theme={theme} /></MuiThemeProvider>,
  document.getElementById("root")
)
registerServiceWorker()
