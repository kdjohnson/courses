import React, { useState, useEffect } from 'react'
import CourseDetails from './CourseDetails'
import CourseHeader from './CourseHeader'
import ExpandableCourse from './ExpandableCourse'
import Instructors from './Instructors'
import Meetings from './Meetings'
import WaitlistCourse from './WaitlistCourse'
import { useSelector, useDispatch } from 'react-redux'
import { fetch_selected_courses } from '../actions/termActions'
import { fetch_courses } from '../actions/coursesActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import ErrorMessages from './ErrorMessages'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  courseContainer: {
    flex: '1 1 auto',
    padding: '1em'
  },
  buttonsDiv: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing()
  },
  rightIcon: {
    marginLeft: theme.spacing()
  },
  coursesDiv: {
    display: 'flex',
    flexFlow: 'wrap'
  },
  coursesDivMobile: {
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    backgroundColor: '#fafafa'
  },
  content: {
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'center'
  },
  empty: {
    textAlign: 'center'
  },
  progress: {
    margin: `0 ${theme.spacing(2)}px`
  },
  loading: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

export default function Courses(props) {
  const classes = useStyles()
  const selected_term = useSelector(state => state.selected_term)
  const courses = useSelector(state => state.courses)
  const [term, set_term] = useState(null)
  const { mobile } = props
  const dispatch = useDispatch()
  const courses_fetched = useSelector(state => state.fetched)
  const courses_fetching = useSelector(state => state.fetching)
  const courses_error = useSelector(state => state.error)
  
  useEffect(() => {
    if(term === null) {
      set_term(selected_term)
    } else {
      dispatch(fetch_selected_courses(selected_term))
      console.log("hello")
    }
  }, [selected_term])

 if (courses_fetching === true) {
    return (
      <div className={classes.loading}>
        <CircularProgress
          color="secondary"
          size={50}
        />
      </div>
    )
  } else if (courses_fetched === true && courses_error === true) {
    return (
      <div className={classes.loading}>
        <ErrorMessages />
      </div>
    )
  } else if (courses === null || courses === []) {
    return (
      <Typography variant="h3" className={classes.empty} tabIndex="0">
        You currently have no courses for this semester.
      </Typography>
    )
  } else {
    let elements = []
    for (let [i, course] of courses.entries()) {
      if (course.meetings.length > 1 || course.instructors.length > 1) {
        elements.push(
          <ExpandableCourse
            course={course}
            key={'expandable' + Math.random()}
            mobile={mobile}
          />
        )
      } else if (!Object.is(course.waitlist, '0')) {
        elements.push(
          <WaitlistCourse
            course={course}
            key={'waitlist' + Math.random()}
            mobile={mobile}
          />
        )
      } else {
        elements.push(
          <div
            className={classes.courseContainer}
            key={course.crn}
          >
            <div style={{ marginTop: '1em' }}>
              <Card
                className={classes.card}
                key={course.crn + i + Math.random()}
              >
                <CourseHeader mobile={mobile} course={course} />
                <CardContent
                  className={classes.content}
                  key={course.crn + i + Math.random()}
                >
                  <div>
                    <div
                      style={{ marginTop: '1em' }}
                      key={course.crn + i + Math.random()}
                    >
                      <Meetings meetings={course.meetings} />
                    </div>
                  </div>
                </CardContent>
                <CardActions
                  key={course.crn + i + Math.random()}
                  style={{ justifyContent: 'center', flexWrap: 'wrap' }}
                >
                  <CourseDetails course={course} />
                  <Instructors teachers={course.instructors} />
                </CardActions>
              </Card>
            </div>
          </div>
        )
      }
    } 
    return (
      <div>
        {elements}
      </div>
    )
  }
}
