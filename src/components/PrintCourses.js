import React from 'react'

import PrintIcon from '@material-ui/icons/Print'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  icon: {
    paddingLeft: 5,
    marginTop: -6
  },
  button: {
    paddingTop: 10,
    marginLeft: '1em'
  }
}))

export default function PrintCourses() {
  const classes = useStyles()

  return (
    <Button
      color="secondary"
      title="Print Courses"
      variant="contained"
      tabIndex="0"
      className={classes.button}
    >
      Print Courses
      <PrintIcon className={classes.icon} />
    </Button>
  )
}
