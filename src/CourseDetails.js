import React, { Component } from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
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
import styles from "material-ui/styles"

class CourseDetails extends Component {
  constructor() {
    super()
    this.state = {
      courses: null,
      open: false
    }
  }

  componentDidMount() {
    fetch("http://localhost:8082/api/courses")
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        this.setState({ courses: data.courses })
      })
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    console.log(this.state.courses)
    console.log(this.state.open)
    if (this.state.courses === null) return <div />
    else {
      return (
        <div aria-labelledby="openbutton">
          <Button
            onClick={this.handleOpen}
            id="openbutton"
            aria-label="more course information"
            style={{
              background: "#1B365D",
              color: "white",
              fontWeight: "medium",
              borderRadius: 5
            }}
          >
            COURSE INFO
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
              style={{
                background: "#1B365D"
              }}
            >
              <Typography type="title" style={{ color: "white" }}>
                Course Information
              </Typography>

            </DialogTitle>
            <DialogContent
              style={{
                background: "#E8EAEE"
              }}
              aria-labelledby="dialogbox"
            >
              <List>
                <ListItem tabIndex="0">
                  <ListItemText
                    primary="Course title"
                    secondary={this.state.courses[0].courseTitle}
                  />
                </ListItem>

                <ListItem tabIndex="0">
                  <ListItemText
                    primary="CRN"
                    secondary={this.state.courses[0].crn}
                  />
                </ListItem>

                <ListItem tabIndex="0">
                  <ListItemText
                    primary="Department"
                    secondary={this.state.courses[0].departmentDescription}
                  />
                </ListItem>

                <ListItem tabIndex="0">
                  <ListItemText
                    primary="Grade"
                    secondary={this.state.courses[0].grade.grade}
                  />
                </ListItem>

                <ListItem tabIndex="0">
                  <ListItemText
                    primary="Description"
                    secondary={this.state.courses[0].courseDescription}
                  />
                </ListItem>
              </List>

              <DialogActions>
                <Button
                  onClick={this.handleClose}
                  aria-label="close course information"
                  tabIndex="0"
                  style={{
                    background: "#1B365D",
                    color: "white",
                    fontWeight: "medium",
                    borderRadius: 5
                  }}
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
export default CourseDetails
