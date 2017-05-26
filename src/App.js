import React, { Component } from "react"
import "./App.css"
import AlertDialog from "./AlertDialog"
import BasicTabs from "./BasicTabs"
import TermsMenu from "./TermsMenu"

class App extends Component {
  render() {
    return (
      <div style={{ padding: "2em" }}>
        <TermsMenu />
        <BasicTabs />
      </div>
    )
  }
}

export default App
