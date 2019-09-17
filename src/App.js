import React, { Component } from 'react'
import 'iterators-polyfill' // This is for supporting IE 😢
import AdvisingTabs from './components/AdvisingTabs'
import CircularProgress from '@material-ui/core/CircularProgress'
import CoursesTabs from './components/CoursesTabs'
import ErrorMessages from './components/ErrorMessages'
import { connect } from 'react-redux'
import { fetch_advising } from './actions/advisingActions'
import { fetch_terms } from './actions/termsActions'
import { withStyles } from '@material-ui/core/styles'
// import { makeStyles } from '@material-ui/styles'

const calendar_obj = {
  url: 'http://localhost:8082/api/calendar',
  credentialsNeeded: false
}

const styles = theme => ({
  root: {
    position: 'relative'
  },

  progress: {
    margin: `0 ${theme.spacing(2)}px`
  },

  loading: {
    display: 'flex',
    justifyContent: 'center'
  }
})

class App extends Component {
  state = {
    width: document.getElementById(this.props.root_element).clientWidth,
    mobile: false
  }

  updateWidth = () => {
    this.setState({
      width: document.getElementById(this.props.root_element).clientWidth
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
    if (document.getElementById(this.props.root_element).clientWidth < 650) {
      this.setState({ mobile: true })
    }
  }

  getView = () => {
    const {
      advising,
      advising_error,
      classes,
      root_element,
      terms_fetched,
      terms_fetching,
      terms_error
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
    } else if (terms_fetched === true) {
      if (terms_error === true || advising_error === true) {
        return (
          <div className={classes.loading}>
            <ErrorMessages />
          </div>
        )
      }

      if (advising === false) {
        return (
          <div>
            <CoursesTabs
              mobile={mobile}
              root_element={root_element}
              calendar_url={calendar_obj}
            />
          </div>
        )
      }

      if (advising === true) {
        return (
          <div>
            <AdvisingTabs
              mobile={mobile}
              root_element={root_element}
              calendar_url={calendar_obj}
            />
          </div>
        )
      }
    }
  }

  render() {
    const { classes } = this.props
    return <div className={classes.root}>{this.getView()}</div>
  }
}

const mapStateToProps = state => ({
  advising: state.advising.advising,
  advising_error: state.advising.error,
  term_bounds: state.terms.term_bounds,
  terms_error: state.terms.error,
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
