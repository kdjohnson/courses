import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from 'material-ui/List'
import React, { Component } from 'react'

import Button from 'material-ui/Button'
import Domain from 'material-ui-icons/Domain'
import MailOutline from 'material-ui-icons/MailOutline'
import PropTypes from 'prop-types'
import Slide from 'material-ui/transitions/Slide'
import Typography from 'material-ui/Typography'
import { getMapUrl } from '../utils/mapLinks'
import { translate } from 'react-i18next'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
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
})

function Transition(props) {
  return <Slide direction="down" {...props} />
}

class Instructors extends Component {
  state = {
    open: false
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  getInstructors() {
    const { classes, t, teachers } = this.props
    return (
      <div>
        <Button
          onClick={() =>
            this.setState({
              open: true
            })
          }
          color="secondary"
          style={{ fontWeight: 'bolder' }}
        >
          {teachers.length >= 2 && 'Instructors'}
          {teachers.length < 2 && 'Instructor'}
        </Button>
        <Dialog
          open={this.state.open}
          id="instructor-dialog"
          tabIndex="0"
          aria-label="instructor information"
          onClose={this.handleRequestClose}
          transition={Transition}
        >
          <DialogTitle className={classes.dialogTitle} disableTypography={true}>
            <Typography type="title" tabIndex="0" className={classes.title}>
              {teachers.length >= 2 && 'Instructors Information'}
              {teachers.length < 2 && 'Instructor Information'}
            </Typography>
          </DialogTitle>
          <DialogContent>{this.getList()}</DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleRequestClose}
              color="secondary"
              className={classes.close}
            >
              {t('close', {})}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  getList = () => {
    const { classes, teachers } = this.props
    let list = []
    for (let i = 0, total = teachers.length; i < total; i++) {
      if (Object.is(teachers, null) || Object.is(teachers[0], undefined)) {
        return (
          <List
            subheader={
              <ListSubheader tabIndex="0" classes={classes.instructor}>
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
              <ListSubheader tabIndex="0" className={classes.instructor}>
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

  render() {
    return <div>{this.getInstructors()}</div>
  }
}

Instructors.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: 'Instructors' })(
  translate('view', { wait: true })(Instructors)
)
