import React from 'react'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CourseDetails from './CourseDetails'
import CourseHeader from './CourseHeader'
import Instructors from './Instructors'
import Meetings from './Meetings'
import { makeStyles } from '@material-ui/styles'

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
  container: {
    marginTop: '1em',
  },
  actions: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}))

export default function WaitlistCourse(props) {
  const classes = useStyles()
  const { course } = props
  return (
    <div className={classes.courseContainer}>
      <div className={classes.container}>
        <Card className={classes.card}>
          <CourseHeader course={course} />
          <CardContent className={classes.content}>
            <div>
              <div className={classes.container}>
                <Meetings meetings={course.meetings} />
              </div>
            </div>
          </CardContent>
          <CardActions className={classes.actions}>
            <CourseDetails course={course} />
            <Instructors teachers={course.instructors} />
          </CardActions>
        </Card>
      </div>
    </div>
  )
}
