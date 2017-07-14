// @flow weak

import React, { Component } from "react"
import RegistrationTypes from "./RegistrationTypes"
import AdvisingCourses from "./AdvisingCourses"

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
    return (
      <div>
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
    if (!Object.is(this.props.courses, null)) {
      return (
        <div>
          {this.getAdvising()}
        </div>
      )
    } else {
      return <div />
    }
  }
}

export default Advising
