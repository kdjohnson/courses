import React, { Component } from "react"
import { LabelSwitch } from "material-ui/Switch"

class RegistrationTypes extends Component {
  handleChange = (event, checked, type) => {
    let temp = this.props.regs
    temp[type] = checked
    this.props.updateRegs(temp)
  }

  getSwitches() {
    let switches = []
    Object.entries(this.props.regs).forEach(([type, value]) => {
      switches.push(
        <LabelSwitch
          key={type}
          checked={this.props.regs[type]}
          label={type}
          onChange={(event, checked, key) =>
            this.handleChange(event, checked, type)}
        />
      )
    })

    return switches
  }

  render() {
    return (
      <div>
        {this.getSwitches()}
      </div>
    )
  }
}

export default RegistrationTypes
