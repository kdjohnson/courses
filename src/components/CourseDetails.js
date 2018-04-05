import React, { Component } from "react"
import List, { ListItem, ListItemText } from "material-ui/List"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog"
import Button from "material-ui/Button"
import Slide from "material-ui/transitions/Slide"
import Typography from "material-ui/Typography"
import { withStyles } from "material-ui/styles"
import PropTypes from "prop-types"
import { translate } from "react-i18next"
import { amber } from "material-ui/colors"

const styles = theme => ({
  button: {
    fontWeight: "bolder"
  },

  dialogHeader: {
    backgroundColor: theme.palette.primary.light
  },

  dialogHeaderWaitList: {
    backgroundColor: amber[200]
  },

  list: {
    color: "rgba(0, 0, 0, 0.68)"
  },

  dialogContent: {
    backgroundColor: "#fafafa",
    background: "#E8EAEE"
  },

  title: {
    fontWeight: 600
  }
})

function Transition(props) {
  return <Slide direction="down" {...props} />
}

class CourseDetails extends Component {
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
    const classes = this.props.classes
    const { t } = this.props
    if (Object.is(this.props.courses, null)) {
      return <div />
    } else {
      return (
        <div aria-labelledby={"openbutton" + this.props.course.crn}>
          <Button
            className={classes.button}
            color="secondary"
            onClick={this.handleOpen}
            id={"openbutton" + this.props.course.crn}
            aria-label="course description"
          >
            {t("description", {})}
          </Button>

          <Dialog
            role="dialog"
            id="dialogbox"
            aria-label="course description"
            tabIndex="0"
            open={this.state.open}
            onClose={this.handleClose}
            transition={Transition}
          >
            <DialogTitle
              className={
                Object.is(this.props.course.waitList, "0") ? (
                  classes.dialogHeader
                ) : (
                  classes.dialogHeaderWaitList
                )
              }
              disableTypography={true}
            >
              <Typography type="title" tabIndex="0" className={classes.title}>
                {this.props.course.courseTitle}
              </Typography>
            </DialogTitle>
            <DialogContent
              className={classes.dialogContent}
              aria-labelledby="dialogbox"
            >
              <List>
                <ListItem tabIndex="0">
                  <ListItemText primary={this.props.course.courseDescription} />
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
                  {t("close", {})}
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

export default withStyles(styles, { name: "CourseDetails" })(
  translate("view", { wait: true })(CourseDetails)
)
