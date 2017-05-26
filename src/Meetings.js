import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Typography from "material-ui/Typography"

const styleSheet = createStyleSheet("Meetings", theme => ({
  meet: {
    color: "rgba(0, 0, 0, 0.54)"
  },
  meetLink: {
    color: "#3344dd"
  }
}))

class Meetings extends Component {
  getMeetings = () => {
    const classes = this.props.classes
    if (Object.is(this.props.meetings, null)) {
      return <div key={"emptyDiv" + 2} />
    } else {
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
  }

  render() {
    return (
      <div>
        {this.getMeetings()}
      </div>
    )
  }
}

Meetings.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Meetings)
