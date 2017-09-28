import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import Typography from "material-ui/Typography"
import { getMapUrl, displayLink } from "../utils/mapLinks"
import ExpandableMeetings from "./ExpandableMeetings"

const styles = theme => ({
  meet: {
    color: theme.palette.text.primary
  },
  meetLink: {
    color: "#3344dd",
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Arimo"
  },

  meetNoLink: {
    color: theme.palette.text.primary,
    lineHeight: 1.42857143,
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "Arimo"
  },

  stuff: {
    borderLeftStyle: "solid",
    borderLeftColor: theme.palette.secondary[400],
    borderLeftWidth: "0.3em",
    paddingLeft: "1em"
  }
})

class Meetings extends Component {
  getMeetings = () => {
    const classes = this.props.classes
    if (Object.is(this.props.meetings, null)) {
      return <div key={"emptyDiv" + Math.random()} />
    } else if (this.props.meetings.length === 0) {
      return (
        <div>
          <Typography type="body2" className={classes.meetNoLink} tabIndex="0">
            N/A
          </Typography>
          <Typography type="body2" className={classes.meet} tabIndex="0">
            N/A
          </Typography>
          <Typography type="body2" className={classes.meet} tabIndex="0">
            N/A
          </Typography>
          <Typography type="body2" className={classes.meet} tabIndex="0">
            N/A
          </Typography>
          <Typography type="body2" className={classes.meet} tabIndex="0">
            N/A
          </Typography>
        </div>
      )
    } else {
      if (this.props.meetings.length >= 2) {
        return <ExpandableMeetings meetings={this.props.meetings} />
      } else {
        return (
          <div className={classes.stuff}>
            {displayLink(
              this.props.meetings[0].buildingRoom,
              this.props.meetings[0].campus
            ) && (
              <a
                className={classes.meetLink}
                tabIndex="0"
                target="_blank"
                href={getMapUrl(this.props.meetings[0].buildingRoom, false)}
                rel="noopener noreferrer"
              >
                {this.props.meetings[0].buildingRoom +
                  " [" +
                  this.props.meetings[0].campus +
                  "]"}
              </a>
            )}
            {!displayLink(
              this.props.meetings[0].buildingRoom,
              this.props.meetings[0].campus
            ) && (
              <Typography
                type="body2"
                className={classes.meetNoLink}
                tabIndex="0"
              >
                {this.props.meetings[0].buildingRoom +
                  " [" +
                  this.props.meetings[0].campus +
                  "]"}
              </Typography>
            )}
            <Typography type="body2" className={classes.meet} tabIndex="0">
              {`${this.props.meetings[0].meetDays} `}
            </Typography>
            <Typography type="body2" className={classes.meet} tabIndex="0">
              {this.props.meetings[0].startTime +
                " - " +
                this.props.meetings[0].endTime}
            </Typography>
            <Typography
              type="body2"
              className={classes.meet}
              tabIndex="0"
              aria-label={
                this.props.meetings[0].startMonth +
                "-" +
                this.props.meetings[0].startDay +
                "-" +
                this.props.meetings[0].startYear +
                " to " +
                this.props.meetings[0].endMonth +
                "-" +
                this.props.meetings[0].endDay +
                "-" +
                this.props.meetings[0].endYear
              }
            >
              {this.props.meetings[0].startMonth +
                "/" +
                this.props.meetings[0].startDay +
                "/" +
                this.props.meetings[0].startYear +
                " - " +
                this.props.meetings[0].endMonth +
                "/" +
                this.props.meetings[0].endDay +
                "/" +
                this.props.meetings[0].endYear}
            </Typography>
            <Typography type="body2" className={classes.meet} tabIndex="0">
              {this.props.meetings[0].courseType}
            </Typography>
          </div>
        )
      }
    }
  }

  render() {
    return (
      <div>
        <Typography
          tabIndex="0"
          style={{ fontWeight: "bolder", paddingBottom: "0.5em" }}
        >
          CLASS INFORMATION
        </Typography>
        {this.getMeetings()}
      </div>
    )
  }
}

Meetings.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: "Meetings" })(Meetings)
