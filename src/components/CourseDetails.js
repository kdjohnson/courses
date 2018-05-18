import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

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
import amber from '@material-ui/core/colors/amber'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    fontWeight: 'bolder'
  },

  dialogHeader: {
    backgroundColor: theme.palette.primary.light
  },

  dialogHeaderWaitList: {
    backgroundColor: amber[200]
  },

  list: {
    color: 'rgba(0, 0, 0, 0.68)'
  },

  dialogContent: {
    backgroundColor: '#fafafa',
    background: '#E8EAEE'
  },

  title: {
    fontWeight: 600
  }
})

function Transition(props) {
  return <Slide direction="down" {...props} />
}

class CourseDetails extends React.Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes, course, courses, t } = this.props
    const { open } = this.state
    if (Object.is(courses, null)) {
      return <div />
    } else {
      return (
        <div aria-labelledby={'openbutton' + course.crn}>
          <Button
            className={classes.button}
            color="secondary"
            onClick={this.handleOpen}
            id={'openbutton' + course.crn}
            aria-label="course description"
          >
            {t('description', {})}
          </Button>

          <Dialog
            role="dialog"
            id="dialogbox"
            aria-label="course description"
            tabIndex="0"
            open={open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
            <DialogTitle
              className={
                Object.is(course.waitList, '0')
                  ? classes.dialogHeader
                  : classes.dialogHeaderWaitList
              }
              disableTypography={true}
            >
              <Typography type="title" tabIndex="0" className={classes.title}>
                {course.courseTitle}
              </Typography>
            </DialogTitle>
            <DialogContent
              className={classes.dialogContent}
              aria-labelledby="dialogbox"
            >
              <List>
                <ListItem tabIndex="0">
                  <ListItemText primary={course.courseDescription} />
                </ListItem>
              </List>

              <DialogActions>
                <Button
                  className={classes.button}
                  onClick={this.handleClose}
                  aria-label="close course information"
                  tabIndex="0"
                  color="secondary"
                >
                  {t('close', {})}
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      )
    }
  }
}

CourseDetails.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: 'CourseDetails' })(
  translate('view', { wait: true })(CourseDetails)
)
