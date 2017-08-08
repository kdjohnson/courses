import React, { Component } from "react"
import CoursesTabs from "./components/CoursesTabs"
import AdvisingTabs from "./components/AdvisingTabs"
import ErrorMessages from "./components/ErrorMessages"
import { getTerms, getCourses } from "./api/api"
import { withStyles, createStyleSheet } from "material-ui/styles"
import { CircularProgress } from "material-ui/Progress"

const termsURL = "http://localhost:8082/api/terms"
const coursesURL = "http://localhost:8082/api/courses"

const calendarEventsURL = {
  url: "http://localhost:8082/api/calendar",
  credentialsNeeded: false
}

const gpaAndCreditsURL = "http://localhost:8082/api/credits"

const styleSheet = createStyleSheet("CircularIndeterminate", theme => ({
  root: {
    position: "relative"
  },

  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },

  loading: {
    display: "flex",
    justifyContent: "center"
  }
}))

class App extends Component {
  state = {
    terms: null,
    currentTermBounds: [],
    currrentTerm: null,
    courses: null,
    width: document.getElementById(this.props.rootElement).clientWidth,
    mobile: false,
    advising: false,
    books: null,
    error: false,
    loading: true
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
        if (!(terms instanceof Error)) {
          for (let i = 0, total = terms.length; i < total; i++) {
            if (Object.is(terms[i].current, "true")) {
              this.setState({
                currentTerm: terms[i],
                currentTermBounds: [
                  parseInt(terms[i].start, 10),
                  parseInt(terms[i].end, 10)
                ]
              })
            }
          }
          this.setState({ terms, loading: false })
        } else {
          this.setState({ error: true })
        }
      })
      .then(() => {
        getCourses(this.state.currentTerm, coursesURL).then(courses => {
          if (!(courses instanceof Error)) {
            this.setState({ courses: courses.courses, books: courses.bookXML })
          } else {
            this.setState({ error: true })
          }
        })
      })
  }

  updateTerm = currentTerm => {
    const termBounds = [
      parseInt(currentTerm.start, 10),
      parseInt(currentTerm.end, 10)
    ]
    getCourses(currentTerm, coursesURL).then(courses => {
      this.setState({
        courses: courses.courses,
        currentTermBounds: termBounds,
        books: courses.bookXML
      })
    })
  }

  getView = () => {
    const classes = this.props.classes
    if (Object.is(this.state.loading, true)) {
      return (
        <div className={classes.loading}>
          <CircularProgress
            color="accent"
            className={classes.progress}
            size={50}
          />
        </div>
      )
    } else if (
      Object.is(this.state.error, true) ||
      Object.is(this.state.terms, null) ||
      Object.is(this.state.currentTerm, null) ||
      Object.is(this.state.currentTerm, undefined)
    ) {
      return (
        <div className={classes.loading}>
          <ErrorMessages />
        </div>
      )
    } else if (!Object.is(this.state.courses, null) && !this.state.advising) {
      return (
        <div>
          <CoursesTabs
            courses={this.state.courses}
            mobile={this.state.mobile}
            rootElement={this.props.rootElement}
            calendarURL={calendarEventsURL}
            termBounds={this.state.currentTermBounds}
            gradesURL={gpaAndCreditsURL}
            terms={this.state.terms}
            currentTermDescription={this.state.currentTerm.description}
            currentTermCode={this.state.currentTerm.code}
            updateTerm={this.updateTerm}
            currentTerm={this.state.currentTerm}
            books={this.state.books}
          />
        </div>
      )
    } else {
      if (!this.state.advising) {
        return (
          <div>
            <CoursesTabs
              courses={this.state.courses}
              mobile={this.state.mobile}
              gradesURL={gpaAndCreditsURL}
              calendarURL={calendarEventsURL}
              rootElement={this.props.rootElement}
              termBounds={this.state.currentTermBounds}
              terms={this.state.terms}
              currentTermDescription={this.state.currentTerm.description}
              currentTermCode={this.state.currentTerm.code}
              currentTerm={this.state.currentTerm}
              updateTerm={this.updateTerm}
              books={this.state.books}
            />
          </div>
        )
      } else {
        return (
          <div>
            <AdvisingTabs
              courses={this.state.courses}
              mobile={this.state.mobile}
              gradesURL={gpaAndCreditsURL}
              calendarURL={calendarEventsURL}
              rootElement={this.props.rootElement}
              termBounds={this.state.currentTermBounds}
              terms={this.state.terms}
              currentTermDescription={this.state.currentTerm.description}
              currentTermCode={this.state.currentTerm.code}
              updateTerm={this.updateTerm}
              currentTerm={this.state.currentTerm}
            />
          </div>
        )
      }
    }
  }

  render() {
    const classes = this.props.classes
    return (
      <div className={classes.root}>
        {this.getView()}
      </div>
    )
  }
}

export default withStyles(styleSheet)(App)
