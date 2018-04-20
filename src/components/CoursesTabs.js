// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Tabs, { Tab } from 'material-ui/Tabs'
import Courses from './Courses'
import Grades from './Grades'
import Calendar from 'reactjs-calendar'
import { translate } from 'react-i18next'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import TermSelect from './TermSelect'
import Assignment from 'material-ui-icons/Assignment'
import Event from 'material-ui-icons/Event'
import Spellcheck from 'material-ui-icons/Spellcheck'
import { connect } from 'react-redux'

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

  tab: {
    '@media (min-width: 1024px)': {
      minWidth: 72
    }
  },

  inner: {
    marginTop: 30,
    width: '100%'
  },
  appBar: {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.primary.contrastText
  },

  flex: {
    flex: 1
  },

  button: {
    color: '#FFFFFF'
  }
})

class CoursesTabs extends Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const {
      books,
      calendarURL,
      classes,
      gradesURL,
      mobile,
      t,
      terms_fetched,
      term_bounds,
      rootElement
    } = this.props
    const { value } = this.state
    if (terms_fetched) {
      return (
        <Paper className={classes.inner}>
          <AppBar position="static">
            <Toolbar disableGutters={true} className={classes.root}>
              {mobile === true && (
                <Tabs
                  className={classes.flex}
                  value={value}
                  onChange={this.handleChange}
                >
                  <Tab
                    aria-label={t('courses', {})}
                    title="Courses"
                    className={classes.tab}
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
                    title="Calendar"
                    className={classes.tab}
                    icon={
                      <Event
                        className={classes.button}
                        alt="View your calendar events"
                      />
                    }
                    tabIndex="0"
                  />
                  <Tab
                    aria-label={t('grades', {})}
                    title="Grades"
                    className={classes.tab}
                    icon={
                      <Spellcheck
                        className={classes.button}
                        alt="View your grades"
                      />
                    }
                    tabIndex="0"
                  />
                </Tabs>
              )}
              {mobile === false && (
                <Tabs
                  className={classes.flex}
                  value={value}
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
          {value === 0 && (
            <TabContainer>
              <div>
                <Courses tabIndex="0" mobile={mobile} books={books} />
              </div>
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              <Calendar
                eventsURLObj={calendarURL}
                termBounds={term_bounds}
                rootID={rootElement}
              />
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer>
              <Grades tabIndex="0" mobile={mobile} gradesURL={gradesURL} />
            </TabContainer>
          )}
        </Paper>
      )
    }
  }
}

CoursesTabs.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  current_term: state.terms.current_term,
  terms_fetched: state.terms.fetched,
  term_bounds: state.terms.term_bounds,
})

export default withStyles(styles, { name: 'CourseTabs' })(
  translate('view', { wait: true })(connect(mapStateToProps)(CoursesTabs))
)
