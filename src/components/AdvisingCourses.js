import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import Card, { CardHeader, CardContent } from 'material-ui/Card'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AdvisingMeetings from './AdvisingMeetings'
import AdvisingInstructors from './AdvisingInstructors'
import AdvisingGrade from './AdvisingGrade'
import { connect } from 'react-redux'
const styles = theme => ({
  header: {
    backgroundColor: theme.palette.primary.main
  }
})

class AdvisingCourses extends Component {
  handleChange = (event, checked, type) => {
    let temp = this.props.regs
    temp[type] = checked
    this.props.updateRegs(temp)
  }

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
                  <Typography type="title">Instructors</Typography>
                  <AdvisingInstructors instructors={courses[i].instructors} />
                </div>
                <div>
                  <Typography type="title">Grade</Typography>
                  <AdvisingGrade grade={courses[i].grade} />
                </div>
              </div>
              <Typography type="title">Meetings</Typography>
              <AdvisingMeetings meetings={courses[i].meetings} />
            </CardContent>
          </Card>
        )
      }
    }
    return advisorCourses
  }

  render() {
    const { courses } = this.props
    if (Object.is(courses, null)) {
      return <div />
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
  courses_fetched: state.courses.fetched,
  current_term: state.terms.current_term
})

export default withStyles(styles, { name: 'AdvisingCourses' })(
  connect(mapStateToProps)(AdvisingCourses)
)
