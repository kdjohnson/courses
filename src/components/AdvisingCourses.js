import React from 'react'

import AdvisingGrade from './AdvisingGrade'
import AdvisingInstructors from './AdvisingInstructors'
import AdvisingMeetings from './AdvisingMeetings'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.primary.light
  },
  body2: {
    fontWeight: 'bolder'
  },
  empty: {
    textAlign: 'center'
  }
}))

export default function AdvisingCourses() {
  const classes = useStyles()
  const courses = useSelector(state => state.courses.courses)
  const courses_error = useSelector(state => state.courses.error)
  const courses_fetched = useSelector(state => state.courses.fetched)
  const regs = useSelector(state => state.courses.regs)
  const updating = useSelector(state => state.courses.updating)

  const getCourses = () => {
    let advisorCourses = []
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
                  variant="h1"
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
                    variant="body1"
                    classes={{ body2: classes.body2 }}
                  >
                    Instructors
                  </Typography>
                  <AdvisingInstructors instructors={courses[i].instructors} />
                </div>
                <div>
                  <Typography
                    variant="body1"
                    classes={{ body2: classes.body2 }}
                  >
                    Grade
                  </Typography>
                  <AdvisingGrade grade={courses[i].grade} />
                </div>
              </div>
              <Typography variant="body1" classes={{ body2: classes.body2 }}>
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

  if (courses_fetched !== true || updating === true) {
    return <div />
  } else if (courses_error) {
    return (
      <div>
        <Typography variant="h3" className={classes.empty} tabIndex="0">
          No Courses.
        </Typography>
      </div>
    )
  } else {
    return <div>{getCourses()}</div>
  } 
}