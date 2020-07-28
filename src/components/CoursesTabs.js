import React, { useState } from 'react'
import Calendar from 'reactjs-calendar'
import Courses from './Courses'
import Grades from './Grades'
import BuyBooks from './BuyBooks'
import PrintCourses from './PrintCourses'
import PropTypes from 'prop-types'
import TermSelect from './TermSelect'
import { useSelector } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Assignment from '@material-ui/icons/Assignment'
import Event from '@material-ui/icons/Event'
import Paper from '@material-ui/core/Paper'
import Spellcheck from '@material-ui/icons/Spellcheck'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/styles';

const TabContainer = props => (
  <div style={{ padding: 20 }}>{props.children}</div>
)

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const useStyles = makeStyles(theme => ({
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  flex: {
    flex: 1
  },
  button: {
    color: '#FFFFFF'
  },
  bar: {
    flexDirection: 'column'
  },
  btnContainer: {
    display: 'flex'
  }
}))

export default function CoursesTabs(props) {
  const [value, setValue] = useState(0)
  const courses = useSelector(state => state.courses)
  const books = useSelector(state => state.books)
  const term_bounds = useSelector(state => state.term_bounds)
  const { mobile } = props
  const classes = useStyles()

  return (
    <Paper>
      <AppBar position="static">
        <Toolbar disableGutters={true} className={mobile ? classes.bar : classes.root}>
          {mobile === true && (
            <Tabs
              className={classes.flex}
              value={value}
              onChange={(_event, value) => setValue(value)}
            >
              <Tab
                aria-label="courses"
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
                aria-label="calendar"
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
                aria-label="grades"
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
              onChange={(event, value) => setValue(value)}
            >
              <Tab label="Courses" tabIndex="0" />
              <Tab label="Calendar" tabIndex="0" />
              <Tab label="Grades" tabIndex="0" />
            </Tabs>
          )}
          <TermSelect mobile={mobile} />
        </Toolbar>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <div>
            <div className={classes.btnContainer}>
              <BuyBooks
                books={books}
                mobile={mobile}
              />
              <PrintCourses
                courses={courses}
                mobile={mobile}
              />
            </div>
            <Courses tabIndex="0" mobile={mobile} />
          </div>
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <Calendar
            eventsURLObj={props.calendar_url}
            termBounds={term_bounds}
            rootID={props.root_element}
          />
        </TabContainer>
      )}
      {value === 2 && (
        <TabContainer>
          <Grades tabIndex="0" mobile={mobile} />
        </TabContainer>
      )}
    </Paper>
  )
}
