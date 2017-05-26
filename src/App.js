import React, { Component } from "react"
import "./App.css"
import AlertDialog from "./AlertDialog"
import BasicTabs from "./BasicTabs"
import TermsMenu from "./TermsMenu"
import { test } from "./fetchData"
import { getTerms, getCourses } from "./fetchData"

class App extends Component {
  state = {
    terms: null,
    currentTermDescription: "",
    currentTermCode: "",
    courses: []
  }

  componentDidMount() {
    getTerms()
      .then(terms => {
        for (let i = 0, total = terms.length; i < total; i++) {
          if (terms[i].current === "true") {
            this.setState({
              currentTermDescription: terms[i].description,
              currentTermCode: terms[i].code
            })
          }
        }
        this.setState({ terms })
      })
      .then(() => {
        getCourses(this.state.currentTermCode).then(courses => {
          console.log(courses)
          this.setState({ courses })
        })
      })
  }

  updateTerm = currentTermCode => {
    getCourses(currentTermCode).then(courses => {
      console.log("update terms")
      console.log(courses)
      this.setState({ courses })
    })
  }

  render() {
    if (this.state.terms === null) {
      return <div />
    } else {
      return (
        <div style={{ padding: "2em" }}>
          <TermsMenu
            terms={this.state.terms}
            currentTermDescription={this.state.currentTermDescription}
            updateTerm={this.updateTerm}
          />
          <BasicTabs
            currentTermCode={this.state.currentTermCode}
            courses={this.state.courses}
          />
        </div>
      )
    }
  }
}

export default App
