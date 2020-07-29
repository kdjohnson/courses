import React from 'react'

import CourseDetails from './CourseDetails'
import CourseHeader from './CourseHeader'
import Instructors from './Instructors'
import Meetings from './Meetings'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  courseContainer: {
    flex: '1 1 auto',
    padding: '1em'
  },

  card: {
    backgroundColor: '#fafafa'
  },

  content: {
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'center'
  }
}))

const ExpandableCourse = props => {
  const classes = useStyles()
  const { course } = props

  return (
    <div className={classes.courseContainer}>
    <div style={{ marginTop: '1em' }}>
      <Card className={classes.card}>
        <CourseHeader course={course} />
        <CardContent className={classes.content}>
          <div>
            <div style={{ marginTop: '1em' }}>
              <Meetings meetings={course.meetings} />
            </div>
          </div>
        </CardContent>
        <CardActions style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
          <CourseDetails course={course} />
          <Instructors teachers={course.instructors} />
        </CardActions>
      </Card>
    </div>
  </div>  
  )
}

export default ExpandableCourse
