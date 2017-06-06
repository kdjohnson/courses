// @flow weak

import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Card, { CardHeader, CardActions, CardContent } from "material-ui/Card"
import Typography from "material-ui/Typography"
import Instructors from "./Instructors"
import ExpandableCourse from "./ExpandableCourse"
import Meetings from "./Meetings"
import CourseDetails from "./CourseDetails"
import { translate, Interpolate } from "react-i18next"
import i18n from "./utils/i18n"

const styleSheet = createStyleSheet("Courses", theme => ({
  cardDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  card: {
    width: 345,
    backgroundColor: "#fafafa"
  },

  courseTitle: {
    fontSize: 16,
    color: theme.palette.text.primary
  },

  classHeader: {
    backgroundColor: theme.palette.primary[400]
  },

  classHeaderSpan: {
    fontWeight: 600,
    color: "rgba(0, 0, 0, 0.75)"
  },

  content: {
    paddingTop: 0
  }
}))

class Courses extends Component {
  componentDidMount() {
    window.addEventListener("resize", this.handleResize)
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
    mobile: false
  }

  getCourses = () => {
    const classes = this.props.classes
    const { t } = this.props
    let elements = []
    for (let i = 0, total = this.props.courses.length; i < total; i++) {
      if (
        this.props.courses[i].meetings.length > 1 ||
        this.props.courses[i].instructors.length > 1
      ) {
        elements.push(
          <ExpandableCourse
            course={this.props.courses[i]}
            key={"expandable" + Math.random()}
          />
        )
      } else {
        elements.push(
          <div key={this.props.courses[i].crn + i + Math.random()}>
            <div style={{ marginTop: "1em" }}>
              <Card
                className={classes.card}
                key={this.props.courses[i].crn + i + Math.random()}
              >
                <CardHeader
                  className={classes.classHeader}
                  title={
                    <Typography
                      tabIndex="0"
                      component="h1"
                      className={classes.classHeaderSpan}
                      style={{ fontSize: "20px" }}
                    >
                      {this.props.courses[i].courseTitle}
                    </Typography>
                  }
                  key={this.props.courses[i].crn + i + Math.random()}
                  subheader={
                    <span tabIndex="0" className={classes.classHeaderSpan}>
                      {this.props.courses[i].subjectCode +
                        "-" +
                        this.props.courses[i].subjectNumber +
                        "-" +
                        this.props.courses[i].section}
                    </span>
                  }
                />
                <CardContent
                  className={classes.content}
                  key={this.props.courses[i].crn + i + Math.random()}
                >
                  <Typography
                    type="headline"
                    component="h2"
                    className={classes.courseTitle}
                    tabIndex="0"
                    key={this.props.courses[i].crn + i + Math.random()}
                  >
                    {t("section", {}) + ": " + this.props.courses[i].section}
                  </Typography>
                  <Typography
                    type="headline"
                    component="h2"
                    className={classes.courseTitle}
                    tabIndex="0"
                    key={this.props.courses[i].crn + i + Math.random()}
                  >
                    {t("crn", {}) + ": " + this.props.courses[i].crn}
                  </Typography>
                  <Typography
                    type="headline"
                    component="h2"
                    className={classes.courseTitle}
                    tabIndex="0"
                    key={this.props.courses[i].crn + i + Math.random()}
                  >
                    {t("credits", {}) +  ": " + this.props.courses[i].credit}
                  </Typography>
                  <div
                    style={{ marginTop: "1em" }}
                    key={this.props.courses[i].crn + i + Math.random()}
                  >
                    <Meetings meetings={this.props.courses[i].meetings} />
                  </div>
                  <div
                    style={{ marginTop: "1em" }}
                    key={this.props.courses[i].crn + i + Math.random()}
                  >
                    <Instructors teachers={this.props.courses[i].instructors} />
                  </div>
                </CardContent>
                <CardActions
                  key={this.props.courses[i].crn + i + Math.random()}
                >
                  <CourseDetails course={this.props.courses[i]} />
                </CardActions>
              </Card>
            </div>
          </div>
        )
      }
    }
    return elements
  }

  render() {
    if (this.props.courses === null) {
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

export default withStyles(styleSheet) (translate("view", { wait: true })(Courses))
