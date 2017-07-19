import React, { Component } from "react"
import CoursesTabs from "./components/CoursesTabs"
import AdvisingTabs from "./components/AdvisingTabs"
import TermsDialog from "./components/TermsDialog"
import { getTerms, getCourses } from "./api/api"

const termsURL = "http://localhost:8082/api/terms"
const coursesURL = "http://localhost:8082/api/courses"
const calendarEventsURL = "http://localhost:8082/api/calendar"
const gpaAndCreditsURL = "http://localhost:8082/api/credits"

class App extends Component {
  state = {
    terms: null,
    currentTermDescription: "",
    currentTermCode: "",
    currentTermBounds: "",
    courses: null,
    width: document.getElementById(this.props.rootElement).clientWidth,
    mobile: false,
    advising: false
  }

  updateWidth = () => {
    this.setState({
      width: document.getElementById(this.props.rootElement).clientWidth
    })
    if (this.state.width < 796) {
      this.setState({ mobile: true })
    } else {
      this.setState({ mobile: false })
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth)
    if (document.getElementById(this.props.rootElement).clientWidth < 796) {
      this.setState({ mobile: true })
    }

    getTerms(termsURL)
      .then(terms => {
        for (let i = 0, total = terms.length; i < total; i++) {
          if (Object.is(terms[i].current, "true")) {
            this.setState({
              currentTermDescription: terms[i].description,
              currentTermCode: terms[i].code,
              currentTermBounds: [parseInt(terms[i].start, 10), parseInt(terms[i].end, 10)]
            })
          }
        }
        this.setState({ terms })
      })
      .then(() => {
        getCourses(this.state.currentTermCode, coursesURL).then(courses => {
          this.setState({ courses })
        })
      })
  }

  updateTerm = currentTermCode => {
    getCourses(currentTermCode, coursesURL).then(courses => {
      this.setState({ courses })
    })
  }

  getView = () => {
    if (Object.is(this.state.terms, null)) {
      return <div />
    } else if (!Object.is(this.state.courses, null) && !this.state.advising) {
      return (
        <div>
          <TermsDialog
            terms={this.state.terms}
            currentTermDescription={this.state.currentTermDescription}
            currentTermCode={this.state.currentTermCode}
            updateTerm={this.updateTerm}
            mobile={this.state.mobile}
          />
          <CoursesTabs
            currentTermCode={this.state.currentTermCode}
            courses={this.state.courses}
            mobile={this.state.mobile}
            rootElement={this.props.rootElement}
            calendarURL={calendarEventsURL}
            termBounds={this.state.currentTermBounds}
            gradesURL={gpaAndCreditsURL}
          />
        </div>
      )
    } else {
      if (!this.state.advising) {
        return (
          <div>
            <TermsDialog
              terms={this.state.terms}
              currentTermDescription={this.state.currentTermDescription}
              currentTermCode={this.state.currentTermCode}
              updateTerm={this.updateTerm}
              mobile={this.state.mobile}
            />
            <CoursesTabs
              currentTermCode={this.state.currentTermCode}
              courses={this.state.courses}
              mobile={this.state.mobile}
              gradesURL={gpaAndCreditsURL}
              calendarURL={calendarEventsURL}
              rootElement={this.props.rootElement}
              termBounds={this.state.currentTermBounds}
            />
          </div>
        )
      } else {
        return (
          <div>
            <TermsDialog
              terms={this.state.terms}
              currentTermDescription={this.state.currentTermDescription}
              currentTermCode={this.state.currentTermCode}
              updateTerm={this.updateTerm}
              mobile={this.state.mobile}
            />
            <AdvisingTabs
              currentTermCode={this.state.currentTermCode}
              courses={this.state.courses}
              mobile={this.state.mobile}
              gradesURL={gpaAndCreditsURL}
              calendarURL={calendarEventsURL}
              rootElement={this.props.rootElement}
              termBounds={this.state.currentTermBounds}
            />
          </div>
        )
      }
    }
  }

  render() {
    return (
      <div>
        {this.getView()}
      </div>
    )
  }
}

export default App
