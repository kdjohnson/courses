import React, { useState } from 'react'

import amber from '@material-ui/core/colors/amber'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  dialogHeader: {
    backgroundColor: theme.palette.primary.light,
    padding: 16,
  },
  dialogHeaderWaitList: {
    backgroundColor: amber[200],
    padding: 16,
  },
  dialogContent: {
    backgroundColor: '#fafafa',
    background: '#E8EAEE',
    padding: 5,
  },
  title: {
    fontWeight: 600,
    paddingTop: 3,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function CourseDetails(props) {
  const [open, setOpen] = useState(false)
  const { course } = props
  const classes = useStyles()

  if (course === null) {
    return <div />
  }

  return (
    <div aria-labelledby={'openbutton' + course.crn}>
      <Button
        color='secondary'
        onClick={() => setOpen(true)}
        id={'openbutton' + course.crn}
        aria-label='course description'
      >
        Description
      </Button>
      <Dialog
        role='dialog'
        id='dialogbox'
        aria-label='course description'
        tabIndex='0'
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle
          className={course.waitlist === '0' ? classes.dialogHeader : classes.dialogHeaderWaitList}
          disableTypography={true}
        >
          <Typography variant='h6' tabIndex='0' className={classes.title}>
            {course.courseTitle}
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent} aria-labelledby='dialogbox'>
          <List>
            <ListItem tabIndex='0'>
              <ListItemText primary={course.courseDescription} />
            </ListItem>
          </List>
          <DialogActions>
            <Button
              onClick={() => setOpen(false)}
              aria-label='close course information'
              tabIndex='0'
              color='secondary'
            >
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  )
}
