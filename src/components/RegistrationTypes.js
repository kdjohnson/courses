import React from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

class RegistrationTypes extends React.Component {
  handleChange = (event, checked, type) => {
    let temp = this.props.regs
    temp[type] = checked
    this.props.updateRegs(temp)
  }

  getSwitches() {
    const { regs } = this.props
    let switches = []
    Object.entries(regs).forEach(([type, value]) => {
      switches.push(
        <FormControlLabel
          key={type}
          control={
            <Switch
              checked={regs[type]}
              onChange={(event, checked, key) =>
                this.handleChange(event, checked, type)
              }
            />
          }
          label={type}
        />
      )
    })

    return switches
  }

  render() {
    return <div>{this.getSwitches()}</div>
  }
}

export default RegistrationTypes
