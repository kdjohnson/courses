import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import "./index.css"
import { MuiThemeProvider } from "material-ui/styles"

ReactDOM.render(
  <MuiThemeProvider><App /></MuiThemeProvider>,
  document.getElementById("root")
)
registerServiceWorker()
