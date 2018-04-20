import React, { Component } from 'react'
import CoursesTabs from './components/CoursesTabs'
import AdvisingTabs from './components/AdvisingTabs'
import ErrorMessages from './components/ErrorMessages'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import 'iterators-polyfill' // This is for supporting IE 😢
import { connect } from 'react-redux'
import { fetch_terms } from './actions/termsActions'
import { fetch_advising } from './actions/advisingActions'

const calendarObj = {
  url: 'http://localhost:8082/api/calendar',
  credentialsNeeded: false
}

const styles = theme => ({
  root: {
    position: 'relative'
  },

  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },

  loading: {
    display: 'flex',
    justifyContent: 'center'
  }
})

class App extends Component {
  state = {
    width: document.getElementById(this.props.rootElement).clientWidth,
    mobile: false,
  }

  updateWidth = () => {
    this.setState({
      width: document.getElementById(this.props.rootElement).clientWidth
    })
    if (this.state.width < 650) {
      this.setState({ mobile: true })
    } else {
      this.setState({ mobile: false })
    }
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.props.fetch_advising

    // eslint-disable-next-line
    this.props.fetch_terms

    window.addEventListener('resize', this.updateWidth)
    if (document.getElementById(this.props.rootElement).clientWidth < 650) {
      this.setState({ mobile: true })
    }
  }

  getView = () => {
    const {
      advising,
      advisingError,
      classes,
      rootElement,
      terms_fetched,
      terms_fetching,
      termsError
    } = this.props

    const { mobile } = this.state

    if (terms_fetching === true) {
      return (
        <div className={classes.loading}>
          <CircularProgress
            color="secondary"
            className={classes.progress}
            size={50}
          />
        </div>
      )
    } else if (termsError === true || advisingError === true) {
      return (
        <div className={classes.loading}>
          <ErrorMessages />
        </div>
      )
    } else if (advising === false && terms_fetched === true) {
      return (
        <div>
          <CoursesTabs
            mobile={mobile}
            rootElement={rootElement}
            calendarURL={calendarObj}
          />
        </div>
      )
    } else if (advising === true && terms_fetched === true) {
      return (
        <div>
          <AdvisingTabs mobile={mobile} rootElement={rootElement} calendarURL={calendarObj}/>
        </div>
      )
    }
  }

  render() {
    const classes = this.props.classes
    return <div className={classes.root}>{this.getView()}</div>
  }
}

const mapStateToProps = state => ({
  advising: state.advising.advising,
  term_bounds: state.terms.term_bounds,
  terms_fetched: state.terms.fetched,
  terms_fetching: state.terms.fetching
})

const mapDispatchToProps = dispatch => {
  return {
    fetch_advising: dispatch(fetch_advising()),
    fetch_terms: dispatch(fetch_terms())
  }
}

export default withStyles(styles, { name: 'CourseContainer' })(
  connect(mapStateToProps, mapDispatchToProps)(App)
)
