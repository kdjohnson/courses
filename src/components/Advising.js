// @flow weak

import React, { Component } from "react"
import RegistrationTypes from "./RegistrationTypes"
import AdvisingCourses from "./AdvisingCourses"
import Typography from "material-ui/Typography"
import { withStyles } from "material-ui/styles"

const styles = theme => ({
  term: {
    marginBottom: "1em",
    fontWeight: "bolder"
  }
})

class Advising extends Component {
  state = {
    regs: {}
  }

  componentDidMount() {
    let set = new Set()
    for (let i = 0; i < this.props.courses.length; i++) {
      set.add(this.props.courses[i].registrationStatusDescription)
    }

    let regs = {}
    for (let type of set) {
      regs[type] = true
    }

    this.setState({ regs })
  }

  getAdvising = () => {
    const classes = this.props.classes
    if (Object.is(this.props.courses, null)) {
      return <div />
    }
    return (
      <div>
        <Typography type="title" className={classes.term}>
          {this.props.currentTermDescription}
        </Typography>
        <RegistrationTypes
          updateRegs={this.updateRegs}
          regs={this.state.regs}
        />
        <AdvisingCourses courses={this.props.courses} regs={this.state.regs} />
      </div>
    )
  }

  updateRegs = newRegs => {
    this.setState({ regs: newRegs })
  }

  render() {
    return (
      <div>
        {this.getAdvising()}
      </div>
    )
  }
}

export default withStyles(styles, { name: "Advising" })(Advising)
