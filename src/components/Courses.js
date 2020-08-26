import React from 'react'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import CourseDetails from './CourseDetails'
import CourseHeader from './CourseHeader'
import ErrorMessages from './ErrorMessages'
import ExpandableCourse from './ExpandableCourse'
import Instructors from './Instructors'
import Meetings from './Meetings'
import Typography from '@material-ui/core/Typography'
import WaitlistCourse from './WaitlistCourse'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  courseContainer: {
    flex: '1 1 auto',
    padding: '1em',
  },
  card: {
    backgroundColor: '#fafafa',
  },
  content: {
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  empty: {
    textAlign: 'center',
  },
  loading: {
    display: 'flex',
    marginTop: 50,
    justifyContent: 'center',
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    marginTop: '1em',
  },
  actions: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}))

export default function Courses(props) {
  const classes = useStyles()
  const courses = useSelector((state) => state.courses)
  const courses_fetched = useSelector((state) => state.fetched)
  const courses_fetching = useSelector((state) => state.fetching)
  const courses_error = useSelector((state) => state.error)

  if (courses_fetching === true) {
    return (
      <div className={classes.loading}>
        <CircularProgress color='secondary' size={50} />
      </div>
    )
  } else if (courses_fetched === true && courses_error === true) {
    return (
      <div className={classes.error}>
        <ErrorMessages />
      </div>
    )
  } else if (courses === null || courses === []) {
    return (
      <Typography variant='h3' className={classes.empty} tabIndex='0'>
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
          />
        )
      } else if (!Object.is(course.waitlist, '0')) {
        elements.push(
          <WaitlistCourse course={course} key={'waitlist' + Math.random()} />
        )
      } else {
        elements.push(
          <div className={classes.courseContainer} key={course.crn}>
            <div className={classes.container}>
              <Card
                className={classes.card}
                key={course.crn + i + Math.random()}
              >
                <CourseHeader course={course} />
                <CardContent
                  className={classes.content}
                  key={course.crn + i + Math.random()}
                >
                  <div>
                    <div
                      className={classes.container}
                      key={course.crn + i + Math.random()}
                    >
                      <Meetings meetings={course.meetings} />
                    </div>
                  </div>
                </CardContent>
                <CardActions
                  key={course.crn + i + Math.random()}
                  className={classes.actions}
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
    return <div>{elements}</div>
  }
}
