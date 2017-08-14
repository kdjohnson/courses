import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Typography from "material-ui/Typography"
import ExpandableInstructors from "./ExpandableInstructors"
import { getMapUrl } from "../utils/mapLinks"

const styleSheet = createStyleSheet("Instructors", theme => ({
  button: {
    paddingLeft: 0
  },

  links: {
    display: "flex",
    flexDirection: "column",
    borderLeftStyle: "solid",
    borderLeftColor: theme.palette.accent[400],
    borderLeftWidth: "0.3em",
    paddingLeft: "1em",
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Arimo"
  },

  linksMobile: {
    color: "#3344dd",
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Arimo"
  },

  divider: {
    height: "2px",
    marginBottom: "0.2em"
  },

  link: {
    color: "#3344dd",
    marginBottom: 10
  },

  noLink: {
    marginBottom: 10
  },

  teacher: {
    fontSize: 16,
    color: theme.palette.text.primary,
    marginBottom: "0.5em"
  },

  teacherMobile: {
    fontSize: 16,
    color: theme.palette.text.primary
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

  getInstructor() {
    const classes = this.props.classes
    if (this.props.teachers.length >= 2) {
      return <ExpandableInstructors teachers={this.props.teachers} />
    } else if (
      Object.is(this.props.teachers, null) ||
      Object.is(this.props.teachers[0], undefined)
    ) {
      return (
        <div>
          <Typography
            className={
              this.props.mobile ? classes.teacherMobile : classes.teacher
            }
            type="headline"
            component="h3"
            tabIndex="0"
          >
            N/A
          </Typography>
          <div
            className={this.props.mobile ? classes.linksMobile : classes.links}
          >
            <Typography className={classes.noLink}>N/A</Typography>
            <Typography className={classes.noLink}>N/A</Typography>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <Typography
            type="headline"
            component="h3"
            className={
              this.props.mobile ? classes.teacherMobile : classes.teacher
            }
            tabIndex="0"
          >
            {this.props.teachers[0].firstName +
              " " +
              this.props.teachers[0].lastName}
          </Typography>
          <div
            className={this.props.mobile ? classes.linksMobile : classes.links}
          >
            {!Object.is(this.props.teachers[0].office, "N/A") &&
              <a
                className={classes.link}
                target="_blank"
                href={getMapUrl(this.props.teachers[0].office, true)}
                tabIndex="0"
                rel="noopener noreferrer"
                aria-label={
                  this.props.teachers[0].firstName +
                  " office is " +
                  this.props.teachers[0].office
                }
              >
                {this.props.teachers[0].office}
              </a>}
            {Object.is(this.props.teachers[0].office, "N/A") &&
              <Typography
                className={classes.noLink}
                aria-label={
                  "Speak with " +
                  this.props.teachers[0].firstName +
                  " for office information"
                }
              >
                {this.props.teachers[0].office}
              </Typography>}
            {!Object.is(this.props.teachers[0].email, "N/A") &&
              <a
                className={classes.link}
                target="_blank"
                href={"mailto:" + this.props.teachers[0].email}
                tabIndex="0"
                rel="noopener noreferrer"
              >
                {this.props.teachers[0].email}
              </a>}
            {Object.is(this.props.teachers[0].email, "N/A") &&
              <Typography className={classes.noLink}>
                {this.props.teachers[0].email}
              </Typography>}
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.getInstructor()}
      </div>
    )
  }
}

Instructors.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Instructors)
