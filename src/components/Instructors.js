import React, { useState } from 'react'
import { getMapUrl } from '../utils/mapLinks'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Domain from '@material-ui/icons/DomainSharp'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import MailOutline from '@material-ui/icons/MailOutline'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  button: {
    fontWeight: 'bolder'
  },

  instructor: {
    fontSize: 16,
    fontWeight: 'bolder',
    color: theme.palette.text.primary
  },

  dialogTitle: {
    backgroundColor: theme.palette.primary.light
  },

  title: {
    fontWeight: 600
  },

  close: {
    fontWeight: 'bolder'
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const  getList = (classes, teachers) => {
    let list = []
    for (let i = 0, total = teachers.length; i < total; i++) {
      if (Object.is(teachers, null) || Object.is(teachers[0], undefined)) {
        return (
          <List
            subheader={
              <ListSubheader
                tabIndex="0"
                classes={classes.instructor}
                disableSticky={true}
              >
                "N/A"
              </ListSubheader>
            }
          >
            <ListItem>
              <ListItemIcon>
                <MailOutline />
              </ListItemIcon>
              <ListItemText secondary="N/A" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Domain />
              </ListItemIcon>
              <ListItemText secondary="N/A" />
            </ListItem>
          </List>
        )
      } else {
        list.push(
          <List
            subheader={
              <ListSubheader
                tabIndex="0"
                className={classes.instructor}
                disableSticky={true}
              >
                {teachers[i].firstName + '  ' + teachers[i].lastName}
              </ListSubheader>
            }
            key={teachers[i].email}
          >
            <ListItem>
              <ListItemIcon>
                <MailOutline />
              </ListItemIcon>
              <ListItemText
                secondary={
                  (!Object.is(teachers[i].email, 'N/A') && (
                    <a
                      href={'mailto:' + teachers[i].email}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {teachers[i].email}
                    </a>
                  )) ||
                  'N/A'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Domain />
              </ListItemIcon>
              <ListItemText
                secondary={
                  (!Object.is(teachers.office, 'N/A') && (
                    <a
                      href={getMapUrl(teachers[i].office, true)}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {teachers[i].office}
                    </a>
                  )) ||
                  'N/A'
                }
              />
            </ListItem>
          </List>
        )
      }
    }
    return list
  }

const Instructors = props => {
  const { teachers } = props
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        color="secondary"
        style={{ fontWeight: 'bolder' }}
      >
        {teachers.length >= 2 && 'Instructors'}
        {teachers.length < 2 && 'Instructor'}
      </Button>
      <Dialog
        open={open}
        id="instructor-dialog"
        tabIndex="0"
        aria-label="instructor information"
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle className={classes.dialogTitle} disableTypography={true}>
          <Typography variant="h6" tabIndex="0" className={classes.title}>
            {teachers.length >= 2 && 'Instructors Information'}
            {teachers.length < 2 && 'Instructor Information'}
          </Typography>
        </DialogTitle>
        <DialogContent>{getList(classes, teachers)}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="secondary"
            className={classes.close}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Instructors