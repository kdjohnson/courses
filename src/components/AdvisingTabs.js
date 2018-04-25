// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react'
import Tabs, { Tab } from 'material-ui/Tabs'

import Advising from './Advising'
import AdvisingGrades from './AdvisingGrades'
import AppBar from 'material-ui/AppBar'
import Assignment from 'material-ui-icons/Assignment'
import Calendar from 'reactjs-calendar'
import Event from 'material-ui-icons/Event'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import TermSelect from './TermSelect'
import Toolbar from 'material-ui/Toolbar'
import { connect } from 'react-redux'
import { fetch_courses } from './../actions/coursesActions'
import { translate } from 'react-i18next'
import { withStyles } from 'material-ui/styles'

const TabContainer = props => (
  <div style={{ padding: 20 }}>{props.children}</div>
)

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const styles = theme => ({
  root: {
    minHeight: 0
  },

  inner: {
    marginTop: 30,
    width: '100%'
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },

  flex: {
    flex: 1
  },

  button: {
    color: '#FFFFFF'
  }
})

class AdvisingTabs extends Component {
  componentDidMount() {
    const { current_term } = this.props
    this.props.fetch_courses(current_term)
  }
  state = {
    position: 0
  }

  handleChange = (event, position) => {
    this.setState({ position })
  }

  render() {
    const {
      calendarURL,
      classes,
      courses_fetched,
      mobile,
      rootElement,
      t,
      term_bounds
    } = this.props
    const { position } = this.state
    return (
      <Paper className={classes.inner}>
        <AppBar position="static">
          <Toolbar disableGutters={true} className={classes.root}>
            {mobile === true && (
              <Tabs
                className={classes.flex}
                value={position}
                onChange={this.handleChange}
              >
                <Tab
                  aria-label={t('courses', {})}
                  icon={
                    <Assignment
                      className={classes.button}
                      alt="View your courses for the selected term"
                    />
                  }
                  tabIndex="0"
                />
                <Tab
                  aria-label={t('calendar', {})}
                  icon={<Event className={classes.button} />}
                  alt="View your calendar events"
                  tabIndex="0"
                />
              </Tabs>
            )}
            {mobile === false && (
              <Tabs
                className={classes.flex}
                value={position}
                onChange={this.handleChange}
              >
                <Tab label={t('courses', {})} tabIndex="0" />
                <Tab label={t('calendar', {})} tabIndex="0" />
                <Tab label={t('grades', {})} tabIndex="0" />
              </Tabs>
            )}
            <TermSelect mobile={mobile} />
          </Toolbar>
        </AppBar>
        {position === 0 && (
          <TabContainer>
            {courses_fetched && (
              <div>
                <Advising tabIndex="0" mobile={mobile} />
              </div>
            )}
          </TabContainer>
        )}
        {position === 1 && (
          <TabContainer>
            <Calendar
              eventsURLObj={calendarURL}
              termBounds={term_bounds}
              rootID={rootElement}
            />
          </TabContainer>
        )}
        {position === 2 && (
          <TabContainer>
            <AdvisingGrades />
          </TabContainer>
        )}
      </Paper>
    )
  }
}

AdvisingTabs.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  courses: state.courses.courses,
  current_term: state.terms.current_term,
  term_bounds: state.terms.term_bounds,
  courses_fetched: state.courses.fetched
})

const mapDispatchToProps = dispatch => {
  return {
    fetch_courses: current_term => dispatch(fetch_courses(current_term))
  }
}

export default withStyles(styles, { name: 'AdvisingTabs' })(
  translate('view', { wait: true })(
    connect(mapStateToProps, mapDispatchToProps)(AdvisingTabs)
  )
)
