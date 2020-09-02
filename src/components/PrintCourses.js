import React from 'react'

import Button from '@material-ui/core/Button'
import PrintIcon from '@material-ui/icons/Print'
import { generate_pdf } from '../api/api'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  icon: {
    paddingLeft: 5,
    marginTop: -6,
  },
  button: {
    paddingTop: 10,
    marginLeft: '1em',
  },
}))

export default function PrintCourses(props) {
  const classes = useStyles()
  const { selected_term } = props

  const handleClick = () => {
    generate_pdf(selected_term.code)
  }

  return (
    <Button
      color='secondary'
      title='Print Courses'
      variant='contained'
      tabIndex='0'
      className={classes.button}
      onClick={handleClick}
    >
      Print Courses
      <PrintIcon className={classes.icon} />
    </Button>
  )
}
