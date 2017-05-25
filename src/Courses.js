// @flow weak

import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Card, { CardHeader, CardActions, CardContent } from "material-ui/Card"
import Button from "material-ui/Button"
import Typography from "material-ui/Typography"
import { getCourses } from "./fetchData"
import Instructors from "./Instructors"
import ExpandableCourse from "./ExpandableCourse"
import Meetings from "./Meetings"

const styleSheet = createStyleSheet("Courses", theme => ({
  cardDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  card: {
    width: 345
  },

  courseTitleH1: {
    fontSize: 16,
    fontWeight: 800,
    color: theme.palette.text.secondary
  },

  courseTitle: {
    fontSize: 16,
    color: theme.palette.text.secondary
  },

  content: {
    paddingTop: 0
  }
}))

class Courses extends Component {
  componentDidMount() {
    window.addEventListener("resize", this.handleResize)
    getCourses().then(courses => {
      console.log(courses)
      this.setState({ courses })
    })
  }

  handleResize = () => {
    if (window.innerWidth <= 790) {
      this.setState({
        mobile: true
      })
    } else {
      this.setState({
        mobile: false
      })
    }
  }

  state = {
    courses: null,
    mobile: false
  }

  getCourses = () => {
    const classes = this.props.classes
    let elements = []
    this.state.courses.map((course, i) => {
      if (course.meetings.length >= 2 || course.instructors.length >= 2) {
        elements.push(
          <ExpandableCourse course={course} key={"expandable" + i} />
        )
      } else {
        elements.push(
          <div key={course.crn + i}>
            <div style={{ marginTop: "1em" }}>
              <Card className={classes.card} key={course.crn + i + 1}>
                <CardHeader
                  title={
                    <span tabIndex="0" style={{ fontSize: "20px" }}>
                      {course.courseTitle}
                    </span>
                  }
                  key={course.crn + i + 2}
                  subheader={
                    <span tabIndex="0">
                      {course.subjectCode +
                        "-" +
                        course.subjectNumber +
                        "-" +
                        course.section}
                    </span>
                  }
                />
                <CardContent
                  className={classes.content}
                  key={course.crn + i + 3}
                >
                  <Typography
                    type="headline"
                    component="h2"
                    className={classes.courseTitle}
                    tabIndex="0"
                    key={course.crn + i + 4}
                  >
                    {"Section: " + course.section}
                  </Typography>
                  <Typography
                    type="headline"
                    component="h2"
                    className={classes.courseTitle}
                    tabIndex="0"
                    key={course.crn + i + 5}
                  >
                    {" CRN: " + course.crn}
                  </Typography>
                  <Typography
                    type="headline"
                    component="h2"
                    className={classes.courseTitle}
                    tabIndex="0"
                    key={course.crn + i + 6}
                  >
                    {"Credits: " + course.credit}
                  </Typography>
                  <div style={{ marginTop: "1em" }} key={course.crn + i + 7}>
                    <Meetings meetings={course.meetings} />
                  </div>
                  <div style={{ marginTop: "1em" }} key={course.crn + i + 8}>
                    <Instructors teachers={course.instructors} />
                  </div>
                </CardContent>
                <CardActions key={course.crn + i + 9}>
                  <Button compact key={course.crn + i + 10}>
                    Course Details
                  </Button>
                </CardActions>
              </Card>
            </div>
          </div>
        )
      }
    })
    return elements
  }

  render() {
    if (this.state.courses === null) {
      return <div />
    } else if (!this.state.mobile) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexFlow: "wrap"
          }}
        >
          {this.getCourses()}
        </div>
      )
    } else {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          {this.getCourses()}
        </div>
      )
    }
  }
}

Courses.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Courses)
