import React, { Component } from "react"
import "./App.css"
import BasicTabs from "./components/BasicTabs"
import TermsMenu from "./components/TermsMenu"
import { getTerms, getCourses } from "./api/api"

class App extends Component {
  state = {
    terms: null,
    currentTermDescription: "",
    currentTermCode: "",
    courses: [],
    width: document.getElementById("root").clientWidth,
    mobile: false
  }

  updateWidth = () => {
    this.setState({
      width: document.getElementById("root").clientWidth
    })
    if (this.state.width < 796) {
      this.setState({ mobile: true })
    } else {
      this.setState({ mobile: false })
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth)
    if (document.getElementById("root").clientWidth < 796) {
      this.setState({ mobile: true })
    }

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
          this.setState({ courses })
        })
      })
  }

  updateTerm = currentTermCode => {
    getCourses(currentTermCode).then(courses => {
      this.setState({ courses })
    })
  }

  render() {
    console.log(this.props.theme)
    if (this.state.terms === null) {
      return <div />
    } else {
      return (
        <div>
          <TermsMenu
            terms={this.state.terms}
            currentTermDescription={this.state.currentTermDescription}
            updateTerm={this.updateTerm}
          />
          <BasicTabs
            currentTermCode={this.state.currentTermCode}
            courses={this.state.courses}
            mobile={this.state.mobile}
          />
        </div>
      )
    }
  }
}

export default App
