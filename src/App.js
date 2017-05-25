import React, { Component } from "react"
import "./App.css"
import AlertDialog from "./AlertDialog"
import BasicTabs from "./BasicTabs"
import SimpleMenu from "./TermsMenu"

class App extends Component {
  render() {
    return (
      <div style={{ padding: "2em" }}>
        <SimpleMenu />
        <BasicTabs />
        <AlertDialog />
      </div>
    )
  }
}

export default App
