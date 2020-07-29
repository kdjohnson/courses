import React from 'react'
import CourseDetails from './CourseDetails'
import CourseHeader from './CourseHeader'
import Instructors from './Instructors'
import Meetings from './Meetings'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  courseContainer: {
    flex: '1 1 auto',
    padding: '1em'
  },

  coursesDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    flexFlow: 'wrap'
  },

  coursesDivMobile: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },

  cardDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  card: {
    backgroundColor: '#fafafa'
  },

  courseTitle: {
    fontSize: 16,
    color: theme.palette.primary.contrastText
  },

  infoContainer: {
    marginLeft: '2em'
  },

  content: {
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'center'
  },

  contentMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  actions: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

export default function WaitlistCourse(props) {
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
