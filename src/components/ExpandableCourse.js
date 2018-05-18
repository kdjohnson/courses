import React from 'react'

import CourseDetails from './CourseDetails'
import CourseHeader from './CourseHeader'
import Instructors from './Instructors'
import Meetings from './Meetings'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
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
})

class ExpandableCourse extends React.Component {
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

ExpandableCourse.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: 'ExpandableCourse' })(
  ExpandableCourse
)
