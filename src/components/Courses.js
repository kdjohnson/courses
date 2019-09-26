import React, { useEffect } from 'react'
import CourseDetails from './CourseDetails'
import CourseHeader from './CourseHeader'
import ExpandableCourse from './ExpandableCourse'
import Instructors from './Instructors'
import Meetings from './Meetings'
import WaitlistCourse from './WaitlistCourse'
import { fetch_courses } from './../actions/coursesActions'
import { getBookButton } from './BuyBooks'
import { useSelector, useDispatch } from 'react-redux'

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
  }
}))

export default function Courses(props) {
  const classes = useStyles()
  const current_term = useSelector(state => state.terms.current_term)
  const courses = useSelector(state => state.courses.courses)
  const { mobile } = props
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_courses(current_term))
  }, [dispatch, current_term])

  if (courses === null || courses === []) {
    return (
      <Typography variant="h3" className={classes.empty} tabIndex="0">
        You currently have no courses for this semester.
      </Typography>
    )
  }


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
    } else if (!Object.is(course.waitList, '0')) {
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