import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Typography from "material-ui/Typography"
import Collapse from "material-ui/transitions/Collapse"
import IconButton from "material-ui/IconButton"
import ExpandMoreIcon from "material-ui-icons/ExpandMore"
import { CardContent } from "material-ui/Card"
import {getMapUrl} from "../utils/mapLinks"
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
    color: theme.palette.text.primary
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
        <div className={classes.expandedDiv}>
          <a
            type="body2"
            tabIndex="0"
            target="_blank"
            href={getMapUrl(this.props.meetings[i].buildingRoom, false)}
            rel="noopener noreferrer"
          >
            {this.props.meetings[i].buildingRoom +
              " [" +
              this.props.meetings[i].campus +
              "]"}
          </a>
          <Typography type="body2" className={classes.meet} tabIndex="0">
            {`${this.props.meetings[0].meetDays} `}
          </Typography>
          <Typography type="body2" className={classes.meet} tabIndex="0">
            {this.props.meetings[i].courseType}
          </Typography>
          <Typography
            type="body2"
            className={classes.meet}
            tabIndex="0"
            aria-label={
              this.props.meetings[i].startDay +
              "-0" +
              this.props.meetings[i].startMonth +
              "-" +
              this.props.meetings[i].startYear +
              " to " +
              this.props.meetings[i].endDay +
              "-0" +
              this.props.meetings[i].endMonth +
              "-" +
              this.props.meetings[i].endYear
            }
          >
            {this.props.meetings[i].startDay +
              "/" +
              this.props.meetings[i].startMonth +
              "/" +
              this.props.meetings[i].startYear +
              " - " +
              this.props.meetings[i].endDay +
              "/" +
              this.props.meetings[i].endMonth +
              "/" +
              this.props.meetings[i].endYear}
          </Typography>
        </div>
      )
    }
    return elements
  }

  getMeeting = () => {
    const classes = this.props.classes
    const meeting = this.props.meetings[0]
    return (
      <div key={meeting.endDate + Math.random()}>
        <a
          type="body2"
          tabIndex="0"
          target="_blank"
          href={getMapUrl(meeting.buildingRoom, true)}
          rel="noopener noreferrer"
          key={meeting.endDate + Math.random()}
        >
          {meeting.buildingRoom +
            " [" +
            meeting.campus +
            " ] "}
        </a>
        <Typography type="body2" className={classes.meet} tabIndex="0">
          {`${meeting.meetDays} `}
        </Typography>
        <Typography
          type="body2"
          className={classes.meet}
          tabIndex="0"
          key={meeting.endDate + Math.random()}
        >
          {meeting.courseType}
        </Typography>
        <Typography
          type="body2"
          className={classes.meet}
          tabIndex="0"
          key={meeting.endDate + Math.random()}
        >
          {meeting.startTime +
            " - " +
            meeting.endTime}
        </Typography>
        <Typography
          type="body2"
          className={classes.meet}
          tabIndex="0"
          aria-label={
            meeting.startDayOfMonth +
            "-0" +
            meeting.startMonth +
            "-" +
            meeting.startYear +
            " to " +
            meeting.endDayOfMonth +
            "-0" +
            meeting.endMonth +
            "-" +
            meeting.endYear
          }
        >
          {meeting.startDayOfMonth +
            "/" +
            meeting.startMonth +
            "/" +
            meeting.startYear +
            " - " +
            meeting.endDayOfMonth +
            "/" +
            meeting.endMonth +
            "/" +
            meeting.endYear}
        </Typography>
        <Typography
          type="body2"
          className={classes.meet}
          tabIndex="0"
          key={meeting.endDate + Math.random()}
        >
          {meeting.courseType}
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
