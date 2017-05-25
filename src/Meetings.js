import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Typography from "material-ui/Typography"
import Button from "material-ui/Button"

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
    let elements = []
    if (Object.is(this.props.meetings, null)) {
      return <div key={"emptyDiv" + 2} />
    } else {
      this.props.meetings.map((meet, i) => {
        elements.push(
          <div key={meet.endDate + i + 1}>
            <a
              type="body2"
              tabIndex="0"
              target="_blank"
              href="https://oakland.edu"
              key={meet.endDate + i + 2}
            >
              {meet.buildingRoom + " [" + meet.campus + " ] "}
            </a>
            <Typography
              type="body2"
              className={classes.meet}
              tabIndex="0"
              key={meet.endDate + i + 3}
            >
              {meet.courseType}
            </Typography>
            <Typography
              type="body2"
              className={classes.meet}
              tabIndex="0"
              key={meet.endDate + i + 4}
            >
              {meet.startTime + " - " + meet.endTime}
            </Typography>
          </div>
        )
      })
    }
    return elements
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
