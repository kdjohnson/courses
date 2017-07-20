import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Typography from "material-ui/Typography"
import Collapse from "material-ui/transitions/Collapse"
import IconButton from "material-ui/IconButton"
import ExpandMoreIcon from "material-ui-icons/ExpandMore"
import { CardContent } from "material-ui/Card"
import classnames from "classnames"

const styleSheet = createStyleSheet("ExpandableInstructors", theme => ({
  button: {
    paddingLeft: 0
  },
  links: {
    color: "#3344dd",
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

  link: {
    marginBottom: 10
  },

  teacher: {
    fontSize: 16,
    color: theme.palette.text.primary,
    marginBottom: "0.5em"
  },

  expand: {
    marginTop: "-0.5em",
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
            rel="noopener noreferrer"
          >
            {this.props.teachers[0].office}
          </a>
          <a
            target="_blank"
            href={"mailto:" + this.props.teachers[0].email}
            tabIndex="0"
            rel="noopener noreferrer"
            className={classes.link}
          >
            {this.props.teachers[0].email}
          </a>
        </div>
      </div>
    )
  }

  getExpandedInstructors = () => {
    const classes = this.props.classes
    let elements = []
    for (let i = 1, total = this.props.teachers.length; i < total; i++) {
      elements.push(
        <div key={this.props.teachers[0].lastName + Math.random() + 1}>
          <Typography
            type="headline"
            component="h3"
            className={classes.teacher}
            tabIndex="0"
            key={this.props.teachers[0].lastName + Math.random() + 2}
          >
            {this.props.teachers[i].firstName +
              " " +
              this.props.teachers[i].lastName}
          </Typography>
          <div
            className={classes.links}
            key={this.props.teachers[0].lastName + Math.random() + 3}
          >
            <a
              className={classes.link}
              target="_blank"
              href="https://oakland.edu"
              rel="noopener noreferrer"
              tabIndex="0"
              key={this.props.teachers[0].lastName + Math.random() + 4}
            >
              {this.props.teachers[i].office}
            </a>
            <a
              target="_blank"
              href="mailto:https://oakland.edu"
              tabIndex="0"
              rel="noopener noreferrer"
              key={this.props.teachers[0].lastName + Math.random() + 5}
            >
              {this.props.teachers[i].email}
            </a>
          </div>
        </div>
      )
    }
    return elements
  }
  render() {
    const classes = this.props.classes
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {this.getInstructor()}
          <IconButton
            aria-label={
              this.state.expanded
                ? "Close more instructors"
                : "Open more instructors"
            }
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
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
