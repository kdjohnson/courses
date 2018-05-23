import React from 'react'

import AdvisingGrade from './AdvisingGrade'
import AdvisingInstructors from './AdvisingInstructors'
import AdvisingMeetings from './AdvisingMeetings'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  header: {
    backgroundColor: theme.palette.primary.light
  },
  body2: {
    fontWeight: 'bolder'
  },
  empty: {
    textAlign: 'center'
  }
})

class AdvisingCourses extends React.Component {
  getCourses() {
    let advisorCourses = []
    const { classes, courses, regs } = this.props
    for (let i = 0; i < courses.length; i++) {
      if (Object.is(regs[courses[i].registrationStatusDescription], true)) {
        advisorCourses.push(
          <Card
            key={courses[i].crn + i + Math.random()}
            style={{ marginBottom: '1em' }}
          >
            <CardHeader
              className={classes.header}
              title={
                <Typography
                  tabIndex="0"
                  component="h1"
                  style={{ fontSize: '20px' }}
                >
                  {courses[i].subjectCode +
                    '-' +
                    courses[i].subjectNumber +
                    ': ' +
                    courses[i].courseTitle +
                    ' [CRN: ' +
                    courses[i].crn +
                    ']'}
                </Typography>
              }
              key={courses[i].crn + i + Math.random()}
              subheader={
                <Typography tabIndex="0">
                  {'Credits: ' + courses[i].credit}
                </Typography>
              }
            />
            <CardContent key={courses[i].crn + i + Math.random()}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    Instructors
                  </Typography>
                  <AdvisingInstructors instructors={courses[i].instructors} />
                </div>
                <div>
                  <Typography
                    variant="body2"
                    classes={{ body2: classes.body2 }}
                  >
                    Grade
                  </Typography>
                  <AdvisingGrade grade={courses[i].grade} />
                </div>
              </div>
              <Typography variant="body2" classes={{ body2: classes.body2 }}>
                Meetings
              </Typography>
              <AdvisingMeetings meetings={courses[i].meetings} />
            </CardContent>
          </Card>
        )
      }
    }
    return advisorCourses
  }

  render() {
    const { courses_error, courses_fetched, classes, updating } = this.props
    if (courses_fetched !== true || updating === true) {
      return <div />
    } else if (courses_error) {
      return (
        <div>
          <Typography variant="display2" className={classes.empty} tabIndex="0">
            No Courses.
          </Typography>
        </div>
      )
    } else {
      return <div>{this.getCourses()}</div>
    }
  }
}

AdvisingCourses.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  courses: state.courses.courses,
  courses_error: state.courses.error,
  courses_fetched: state.courses.fetched,
  current_term: state.terms.current_term,
  regs: state.courses.regs,
  updating: state.courses.updating
})

export default withStyles(styles, { name: 'AdvisingCourses' })(
  connect(mapStateToProps)(AdvisingCourses)
)
