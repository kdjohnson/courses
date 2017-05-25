import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Typography from "material-ui/Typography"
import Button from "material-ui/Button"
import Collapse from "material-ui/transitions/Collapse"
import IconButton from "material-ui/IconButton"
import ExpandMoreIcon from "material-ui-icons/ExpandMore"
import { CardContent } from "material-ui/Card"
import Divider from "material-ui/Divider"

const styleSheet = createStyleSheet("ExpandableInstructors", theme => ({
  button: {
    paddingLeft: 0
  },
  links: {
    color: "#3344dd",
    display: "flex",
    flexDirection: "column",
    borderLeftStyle: "solid",
    borderLeftColor: "black",
    borderLeftWidth: "0.3em",
    paddingLeft: "1em"
  },
  link: {
    marginBottom: 10
  },
  teacher: {
    fontSize: 16,
    color: theme.palette.text.secondary,
    marginBottom: "0.5em"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  flexGrow: { flex: "1 1 auto" },
  meet: {
    color: "rgba(0, 0, 0, 0.54)"
  }
}))

class ExpandableInstructors extends Component {
  state = { expanded: false }
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }
  getInstructor = () => {
    const classes = this.props.classes
    return (
      <div>
        <Typography
          type="headline"
          component="h3"
          className={classes.teacher}
          tabIndex="0"
        >
          {this.props.teachers[0].firstName +
            " " +
            this.props.teachers[0].lastName}
        </Typography>
        <div className={classes.links}>
          <a
            className={classes.link}
            target="_blank"
            href="https://oakland.edu"
            tabIndex="0"
          >
            {this.props.teachers[0].office}
          </a>
          <a target="_blank" href="mailto:https://oakland.edu" tabIndex="0">
            {this.props.teachers[0].email}
          </a>
        </div>
      </div>
    )
  }

  getExpandedInstructors = () => {
    const classes = this.props.classes
    let elements = []
    this.props.teachers.map(teacher => {
      elements.push(
        <div>
          <Typography
            type="headline"
            component="h3"
            className={classes.teacher}
            tabIndex="0"
          >
            {teacher.firstName + " " + teacher.lastName}
          </Typography>
          <div className={classes.links}>
            <a
              className={classes.link}
              target="_blank"
              href="https://oakland.edu"
              tabIndex="0"
            >
              {teacher.office}
            </a>
            <a target="_blank" href="mailto:https://oakland.edu" tabIndex="0">
              {teacher.email}
            </a>
          </div>
        </div>
      )
    })
    return elements
  }
  render() {
    const classes = this.props.classes
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {this.getInstructor()}
          <IconButton
            className={
              (classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })
            }
            onClick={this.handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
        <div className={classes.flexGrow} />
        <Collapse
          in={this.state.expanded}
          transitionDuration="auto"
          unmountOnExit
        >
          <CardContent>
            {this.getExpandedInstructors()}
          </CardContent>
        </Collapse>
      </div>
    )
  }
}

ExpandableInstructors.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(ExpandableInstructors)
