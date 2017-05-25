import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Typography from "material-ui/Typography"
import Button from "material-ui/Button"
import Menu, { MenuItem } from "material-ui/Menu"
import ExpandableInstructors from "./ExpandableInstructors"

const styleSheet = createStyleSheet("Instructors", theme => ({
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
  }
}))

class Instructors extends Component {
  state = {
    anchorEl: undefined,
    open: false
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  getInstructors() {
    const classes = this.props.classes
    let elements = []
    if (this.props.teachers.length >= 2) {
      return <ExpandableInstructors teachers={this.props.teachers} />
    } else {
      for (let i = 0, total = this.props.teachers.length; i < total; i++) {
        elements.push(
          <div>
            <Typography
              type="headline"
              component="h3"
              className={classes.teacher}
              tabIndex="0"
            >
              {this.props.teachers[i].firstName +
                " " +
                this.props.teachers[i].lastName}
            </Typography>
            <div className={classes.links}>
              <a
                className={classes.link}
                target="_blank"
                href="https://oakland.edu"
                tabIndex="0"
              >
                {this.props.teachers[i].office}
              </a>
              <a target="_blank" href="mailto:https://oakland.edu" tabIndex="0">
                {this.props.teachers[i].email}
              </a>
            </div>
          </div>
        )
      }
    }
    return elements
  }

  render() {
    return (
      <div>
        {this.getInstructors()}
      </div>
    )
  }
}

Instructors.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Instructors)
