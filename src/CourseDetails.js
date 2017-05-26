import React, { Component } from "react"
import List, { ListItem, ListItemIcon, ListItemText } from "material-ui/List"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog"
import Button from "material-ui/Button"
import Slide from "material-ui/transitions/Slide"
import Typography from "material-ui/Typography"
import { withStyles, createStyleSheet } from "material-ui/styles"

const styleSheet = createStyleSheet("CourseDetails", theme => ({
  dialogHeader: {
    backgroundColor: theme.palette.primary[400]
  },

  list: {
    color: "rgba(0, 0, 0, 0.68)"
  },

  dialogBackground: {
    background: "#E8EAEE"
  }
}))

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
    if (this.state.courses === null) return <div />
    else {
      return (
        <div aria-labelledby="openbutton">
          <Button
            raised
            accent
            onClick={this.handleOpen}
            id="openbutton"
            aria-label="more course information"
          >
            course details
          </Button>

          <Dialog
            role="dialog"
            id="dialogbox"
            aria-label="my courses information"
            tabIndex="0"
            open={this.state.open}
            onRequestClose={this.handleClose}
            transition={<Slide direction="down" />}
          >

            <DialogTitle className={classes.dialogHeader}>
              <Typography type="title" tabIndex="0">
                {this.props.course.courseTitle}
              </Typography>

            </DialogTitle>
            <DialogContent
              className={classes.dialogBackground}
              aria-labelledby="dialogbox"
            >
              <List>
                <ListItem tabIndex="0">
                  <ListItemText
                    primary="Course title"
                    secondary={
                      <p className={classes.list}>
                        {this.props.course.courseTitle}
                      </p>
                    }
                  />
                </ListItem>

                <ListItem tabIndex="0">
                  <ListItemText
                    primary="CRN"
                    secondary={
                      <p className={classes.list}>{this.props.course.crn}</p>
                    }
                  />
                </ListItem>

                <ListItem tabIndex="0">
                  <ListItemText
                    primary="Department"
                    secondary={
                      <p className={classes.list}>
                        {this.props.course.departmentDescription}
                      </p>
                    }
                  />
                </ListItem>

                <ListItem tabIndex="0">
                  <ListItemText
                    primary="Grade"
                    secondary={
                      <p className={classes.list}>
                        {this.props.course.grade.grade}
                      </p>
                    }
                  />
                </ListItem>

                <ListItem tabIndex="0">
                  <ListItemText
                    primary="Description"
                    secondary={
                      <p className={classes.list}>
                        {this.props.course.courseDescription}
                      </p>
                    }
                  />
                </ListItem>
              </List>

              <DialogActions>
                <Button
                  onClick={this.handleClose}
                  aria-label="close course information"
                  tabIndex="0"
                  raised
                  accent
                >
                  Close
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

        </div>
      )
    }
  }
}
export default withStyles(styleSheet)(CourseDetails)
