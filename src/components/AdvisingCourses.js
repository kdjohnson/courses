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
    backgroundColor: theme.palette.primary.main
  }
})

class AdvisingCourses extends React.Component {
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
