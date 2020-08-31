import React, { useState, useEffect } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Assignment from '@material-ui/icons/Assignment'
import BuyBooks from './BuyBooks'
import Calendar from './Calendar'
import Courses from './Courses'
import Event from '@material-ui/icons/Event'
import Grades from './Grades'
import Paper from '@material-ui/core/Paper'
import PrintCourses from './PrintCourses'
import PropTypes from 'prop-types'
import Spellcheck from '@material-ui/icons/Spellcheck'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import TermSelect from './TermSelect'
import Toolbar from '@material-ui/core/Toolbar'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { fetch_events } from '../actions/eventsActions'
import { fetch_selected_courses } from '../actions/termActions'
import { makeStyles } from '@material-ui/styles'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useTheme } from '@material-ui/core'

const TabContainer = props => <div style={{ padding: 20 }}>{props.children}</div>

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const useStyles = makeStyles(() => ({
  root: {
    minHeight: 0
  },
  tab: {
    '@media (min-width: 1024px)': {
      minWidth: 72
    }
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

export default function CoursesTabs() {
  const [value, setValue] = useState(0)
  const courses = useSelector(state => state.courses)
  const books = useSelector(state => state.books)
  const selected_term = useSelector(state => state.selected_term)
  const classes = useStyles()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('xs'))
  const [term, set_term] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (term === null) {
      set_term(selected_term)
    } else {
      dispatch(fetch_selected_courses(selected_term))
      dispatch(fetch_events(selected_term.code))
    }
  }, [selected_term, dispatch])

  return (
    <Paper>
      <AppBar position='static'>
        <Toolbar disableGutters={true} className={mobile ? classes.bar : classes.root}>
          {mobile && (
            <Tabs
              className={classes.flex}
              value={value}
              onChange={(_event, value) => setValue(value)}
            >
              <Tab
                aria-label='courses'
                title='Courses'
                className={classes.tab}
                icon={
                  <Assignment
                    className={classes.button}
                    alt='View your courses for the selected term'
                  />
                }
                tabIndex='0'
              />
              <Tab
                aria-label='calendar'
                title='Calendar'
                className={classes.tab}
                icon={<Event className={classes.button} alt='View your calendar events' />}
                tabIndex='0'
              />
              <Tab
                aria-label='grades'
                title='Grades'
                className={classes.tab}
                icon={<Spellcheck className={classes.button} alt='View your grades' />}
                tabIndex='0'
              />
            </Tabs>
          )}
          {!mobile && (
            <Tabs
              className={classes.flex}
              value={value}
              onChange={(event, value) => setValue(value)}
            >
              <Tab label='Courses' tabIndex='0' />
              <Tab label='Calendar' tabIndex='0' />
              <Tab label='Grades' tabIndex='0' />
            </Tabs>
          )}
          <TermSelect />
        </Toolbar>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <div className={classes.btnContainer}>
            <BuyBooks books={books} />
            <PrintCourses courses={courses} selected_term={selected_term} />
          </div>
          <Courses tabIndex='0' mobile={mobile} />
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <Calendar mobile={mobile} />
        </TabContainer>
      )}
      {value === 2 && (
        <TabContainer>
          <Grades tabIndex='0' mobile={mobile} />
        </TabContainer>
      )}
    </Paper>
  )
}
