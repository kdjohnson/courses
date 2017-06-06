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
import { withStyles, createStyleSheet } from "material-ui/styles"
import { translate, Interpolate } from "react-i18next"
import i18n from "./utils/i18n"

const styleSheet = createStyleSheet("CourseDetails", theme => ({
  dialogHeader: {
    backgroundColor: theme.palette.primary[400]
  },

  list: {
    color: "rgba(0, 0, 0, 0.68)"
  },

  dialogBackground: {
    background: "#E8EAEE"
  },

  title: {
    fontWeight: 600
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
    const { t } = this.props
    if (this.props.courses === null) return <div />
    else {
      return (
        <div aria-labelledby={"openbutton" + this.props.course.crn}>
          <Button
            raised
            accent
            onClick={this.handleOpen}
            id={"openbutton" + this.props.course.crn}
            aria-label="more course information"
          >
          {t("courseDetails", {})}
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

            <DialogTitle
              className={classes.dialogHeader}
              disableTypography={true}
            >
              <Typography type="title" tabIndex="0" className={classes.title}>
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
                    primary={t("courseTitle", {})}
                    secondary={
                      <p className={classes.list}>
                        {this.props.course.courseTitle}
                      </p>
                    }
                  />
                </ListItem>

                <ListItem tabIndex="0">
                  <ListItemText
                    primary={t("crn", {})}
                    secondary={
                      <p className={classes.list}>{this.props.course.crn}</p>
                    }
                  />
                </ListItem>

                <ListItem tabIndex="0">
                  <ListItemText
                    primary={t("department", {})}
                    secondary={
                      <p className={classes.list}>
                        {this.props.course.departmentDescription}
                      </p>
                    }
                  />
                </ListItem>

                <ListItem tabIndex="0">
                  <ListItemText
                    primary={t("grade", {})}
                    secondary={
                      <p className={classes.list}>
                        {this.props.course.grade.grade}
                      </p>
                    }
                  />
                </ListItem>

                <ListItem tabIndex="0">
                  <ListItemText
                    primary={t("description", {})}
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
export default withStyles(styleSheet) (translate("view", { wait: true })(CourseDetails))