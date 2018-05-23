import React from 'react'

import { connect } from 'react-redux'
import { update_regs } from './../actions/coursesActions'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

class RegistrationTypes extends React.Component {
  handleChange = (event, checked, type) => {
    let temp = this.props.regs
    temp[type] = checked
    this.props.update_regs(temp, checked, type)
  }

  getSwitches() {
    const { regs } = this.props
    console.log(regs)
    let switches = []
    Object.entries(regs).forEach(([type, value]) => {
      switches.push(
        <FormControlLabel
          key={type}
          control={
            <Switch
              color="secondary"
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
    const { courses_error, courses_fetched, updating } = this.props
    if (
      courses_fetched !== true ||
      updating === true ||
      courses_error === true
    ) {
      return <div />
    } else {
      return <div>{this.getSwitches()}</div>
    }
  }
}

const mapStateToProps = state => ({
  courses_error: state.courses.error,
  courses_fetched: state.courses.fetched,
  updating: state.courses.updating,
  regs: state.courses.regs
})

const mapDispatchToProps = dispatch => {
  return {
    update_regs: new_regs => dispatch(update_regs(new_regs))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationTypes)
