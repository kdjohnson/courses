// @flow weak

import React from 'react'

import AdvisingCourses from './AdvisingCourses'
import RegistrationTypes from './RegistrationTypes'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  term: {
    marginBottom: '1em',
    fontWeight: 'bolder'
  },

  empty: {
    textAlign: 'center'
  }
})

class Advising extends React.Component {
  getAdvising = () => {
    const { courses } = this.props
    if (Object.is(courses, null)) {
      return <div />
    }

    return (
      <div>
        <RegistrationTypes />
        <AdvisingCourses />
      </div>
    )
  }

  render() {
    const { classes, courses } = this.props
    if (courses !== null) {
      return <div>{this.getAdvising()}</div>
    } else {
      return (
        <div>
          <Typography variant="h3" className={classes.empty} tabIndex="0">
            No Courses.
          </Typography>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  regs: state.courses.regs,
  courses: state.courses.courses,
  courses_fetched: state.courses.fetched
})

export default withStyles(styles, { name: 'Advising' })(
  connect(mapStateToProps)(Advising)
)
