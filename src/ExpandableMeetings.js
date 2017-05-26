import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Typography from "material-ui/Typography"
import Collapse from "material-ui/transitions/Collapse"
import IconButton from "material-ui/IconButton"
import ExpandMoreIcon from "material-ui-icons/ExpandMore"
import { CardContent } from "material-ui/Card"
import classnames from "classnames"

const styleSheet = createStyleSheet("ExpandableMeetings", theme => ({
  card: { maxWidth: 400 },
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
  },

  iconButtonDiv: {
    display: "flex",
    justifyContent: "space-between"
  },

  expandedDiv: {
    color: "#3344dd",
    display: "flex",
    flexDirection: "column",
    borderLeftStyle: "solid",
    borderLeftColor: theme.palette.accent[400],
    borderLeftWidth: "0.3em",
    paddingLeft: "1em"
  }
}))

class ExpandableMeetings extends Component {
  state = { expanded: false }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  getExpandedMeetings = () => {
    let elements = []
    const classes = this.props.classes
    for (let i = 1, total = this.props.meetings.length; i < total; i++) {
      elements.push(
        <div
          key={this.props.meetings[i].endDate + i + Math.random()}
          className={classes.expandedDiv}
        >
          <a
            type="body2"
            tabIndex="0"
            target="_blank"
            href="https://oakland.edu"
            rel="noopener noreferrer"
            key={this.props.meetings[i].endDate + i + Math.random()}
          >
            {this.props.meetings[i].buildingRoom +
              " [" +
              this.props.meetings[i].campus +
              " ] "}
          </a>
          <Typography
            type="body2"
            className={classes.meet}
            tabIndex="0"
            key={this.props.meetings[i].endDate + i + Math.random()}
          >
            {this.props.meetings[i].courseType}
          </Typography>
          <Typography
            type="body2"
            className={classes.meet}
            tabIndex="0"
            key={this.props.meetings[i].endDate + i + Math.random()}
          >
            {this.props.meetings[i].startTime +
              " - " +
              this.props.meetings[i].endTime}
          </Typography>
        </div>
      )
    }
    return elements
  }

  getMeeting = () => {
    const classes = this.props.classes
    return (
      <div key={this.props.meetings[0].endDate + Math.random()}>
        <a
          type="body2"
          tabIndex="0"
          target="_blank"
          href="https://oakland.edu"
          rel="noopener noreferrer"
          key={this.props.meetings[0].endDate + Math.random()}
        >
          {this.props.meetings[0].buildingRoom +
            " [" +
            this.props.meetings[0].campus +
            " ] "}
        </a>
        <Typography
          type="body2"
          className={classes.meet}
          tabIndex="0"
          key={this.props.meetings[0].endDate + Math.random()}
        >
          {this.props.meetings[0].courseType}
        </Typography>
        <Typography
          type="body2"
          className={classes.meet}
          tabIndex="0"
          key={this.props.meetings[0].endDate + Math.random()}
        >
          {this.props.meetings[0].startTime +
            " - " +
            this.props.meetings[0].endTime}
        </Typography>
      </div>
    )
  }

  render() {
    const classes = this.props.classes
    return (
      <div>
        <div className={classes.iconButtonDiv}>
          {this.getMeeting()}
          <IconButton
            aria-label={
              this.state.expanded ? "Close more meetings" : "Open more meetings"
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
            {this.getExpandedMeetings()}
          </CardContent>
        </Collapse>
      </div>
    )
  }
}

ExpandableMeetings.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(ExpandableMeetings)
