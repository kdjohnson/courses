import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { update_regs } from './../actions/coursesActions'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

export default function RegistrationTypes() {
  const courses_error = useSelector(state => state.courses.error)
  const courses_fetched = useSelector(state => state.courses.fetched)
  const updating = useSelector(state => state.courses.updating)
  const regs = useSelector(state => state.courses.regs)
  const dispatch = useDispatch()

  const handleChange = name => event => {
    let temp = regs
    temp[name] = event.target.checked
    dispatch(update_regs(temp, event.target.checked, name))
  }

   const getSwitches = () => {
    let switches = []
    Object.entries(regs).forEach(([type, value]) => {
      switches.push(
        <FormControlLabel
          key={type}
          control={
            <Switch
              color="secondary"
              checked={regs[type]}
              onChange={handleChange(type)} />
          }
          label={type}
        />
      )
    })

    return switches
  }

  if (
    courses_fetched !== true ||
    updating === true ||
    courses_error === true
  ) {
    return <div />
  } else {
    return <div>{getSwitches()}</div>
  }
}