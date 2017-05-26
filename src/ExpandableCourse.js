import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Card, { CardHeader, CardActions, CardContent } from "material-ui/Card"
import Typography from "material-ui/Typography"
import Instructors from "./Instructors"
import Meetings from "./Meetings"
import ExpandableMeetings from "./ExpandableMeetings"
import CourseDetails from "./CourseDetails"

const styleSheet = createStyleSheet("ExpandableCourse", theme => ({
  card: {
    width: 345,
    backgroundColor: "#fafafa"
  },

  courseTitleH1: {
    fontSize: 16,
    fontWeight: 800,
    color: theme.palette.text.secondary
  },

  classHeader: {
    backgroundColor: theme.palette.primary[400]
  },

  classHeaderSpan: {
    fontWeight: 600,
    color: "rgba(0, 0, 0, 0.87)"
  },

  courseTitle: {
    fontSize: 16,
    color: theme.palette.text.secondary
  },

  content: {
    paddingTop: 0
  }
}))

class ExpandableCourse extends Component {
  checkExpandableMeetings = () => {
    if (this.props.course.meetings.length > 2) {
      return <Meetings meetings={this.props.course.meetings} />
    } else {
      return <ExpandableMeetings meetings={this.props.course.meetings} />
    }
  }
  render() {
    const classes = this.props.classes
    return (
      <div>
        <div style={{ marginTop: "1em" }}>
          <Card className={classes.card}>
            <CardHeader
              className={classes.classHeader}
              title={
                <Typography
                  tabIndex="0"
                  component="h1"
                  className={classes.classHeaderSpan}
                  style={{ fontSize: "20px" }}
                >
                  {this.props.course.courseTitle}
                </Typography>
              }
              key={this.props.course.crn + 0 + 3}
              subheader={
                <span tabIndex="0" className={classes.classHeaderSpan}>
                  {this.props.course.subjectCode +
                    "-" +
                    this.props.course.subjectNumber +
                    "-" +
                    this.props.course.section}
                </span>
              }
            />
            <CardContent className={classes.content}>
              <Typography
                type="headline"
                component="h2"
                className={classes.courseTitle}
                tabIndex="0"
              >
                {"Section: " + this.props.course.section}
              </Typography>
              <Typography
                type="headline"
                component="h2"
                className={classes.courseTitle}
                tabIndex="0"
              >
                {" CRN: " + this.props.course.crn}
              </Typography>
              <Typography
                type="headline"
                component="h2"
                className={classes.courseTitle}
                tabIndex="0"
              >
                {"Credits: " + this.props.course.credit}
              </Typography>
              <div style={{ marginTop: "1em" }}>
                {this.checkExpandableMeetings()}
              </div>
              <div style={{ marginTop: "1em" }}>
                <Instructors teachers={this.props.course.instructors} />
              </div>
            </CardContent>
            <CardActions>
              <CourseDetails course={this.props.course} />
            </CardActions>
          </Card>
        </div>
      </div>
    )
  }
}

ExpandableCourse.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(ExpandableCourse)
