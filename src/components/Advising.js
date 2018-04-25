// @flow weak

import React, { Component } from 'react'

import AdvisingCourses from './AdvisingCourses'
import RegistrationTypes from './RegistrationTypes'
import Typography from 'material-ui/Typography'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  term: {
    marginBottom: '1em',
    fontWeight: 'bolder'
  },

  empty: {
    textAlign: 'center'
  }
})

class Advising extends Component {
  state = {
    regs: {}
  }

  componentDidMount() {
    let set = new Set()
    const { courses, courses_fetched } = this.props
    if (courses_fetched && !Object.is(courses, null)) {
      for (let i = 0; i < courses.length; i++) {
        set.add(courses[i].registrationStatusDescription)
      }

      let regs = {}
      for (let type of set) {
        regs[type] = true
      }

      this.setState({ regs })
    }
  }

  getAdvising = () => {
    const { courses } = this.props
    const { regs } = this.state
    if (Object.is(courses, null)) {
      return <div />
    }

    return (
      <div>
        <RegistrationTypes updateRegs={this.updateRegs} regs={regs} />
        <AdvisingCourses courses={courses} regs={regs} />
      </div>
    )
  }

  updateRegs = newRegs => {
    this.setState({ regs: newRegs })
  }

  render() {
    const { classes, courses } = this.props
    if (courses !== null) {
      return <div>{this.getAdvising()}</div>
    } else {
      return (
        <div>
          <Typography variant="display2" className={classes.empty} tabIndex="0">
            No Courses.
          </Typography>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  courses: state.courses.courses,
  courses_fetched: state.courses.fetched
})

export default withStyles(styles, { name: 'Advising' })(
  connect(mapStateToProps)(Advising)
)
