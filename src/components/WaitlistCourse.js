import Card, { CardActions, CardContent } from 'material-ui/Card'
import React, { Component } from 'react'

import CourseDetails from './CourseDetails'
import CourseHeader from './CourseHeader'
import Instructors from './Instructors'
import Meetings from './Meetings'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
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
})

class WaitlistCourse extends Component {
  render() {
    const { classes, course, mobile } = this.props
    return (
      <div className={classes.courseContainer}>
        <div style={{ marginTop: '1em' }}>
          <Card className={classes.card}>
            <CourseHeader mobile={mobile} course={course} />
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
}

WaitlistCourse.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: 'WaitlistCourse' })(WaitlistCourse)
