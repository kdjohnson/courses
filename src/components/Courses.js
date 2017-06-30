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
import i18n from "./../utils/i18n"

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

  cardMobile: {
    width: "264px",
    backgroundColor: "#fafafa"
  },

  courseTitle: {
    fontSize: 16,
    color: theme.palette.text.primary
  },

  classHeader: {
    backgroundColor: theme.palette.primary[400]
  },

  classHeaderSpanDiv: {
    display: "flex",
    flexDirection: "column"
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
            mobile={this.props.mobile}
          />
        )
      } else {
        elements.push(
          <div key={this.props.courses[i].crn + i + Math.random()}>
            <div style={{ marginTop: "1em" }}>
              <Card
                className={
                  this.props.mobile ? classes.cardMobile : classes.card
                }
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
                    <div className={classes.classHeaderSpanDiv}>
                      <span tabIndex="0" className={classes.classHeaderSpan}>
                        {this.props.courses[i].subjectCode +
                          "-" +
                          this.props.courses[i].subjectNumber +
                          "-" +
                          this.props.courses[i].section +
                          "-" +
                          this.props.courses[i].crn}
                      </span>
                      <span tabIndex="0" className={classes.classHeaderSpan}>
                        {t("credits", {}) + ": " + this.props.courses[i].credit}
                      </span>
                    </div>
                  }
                />
                <CardContent
                  className={classes.content}
                  key={this.props.courses[i].crn + i + Math.random()}
                >
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
    console.log(this.props.mobile)
    if (this.props.courses === null) {
      return <div />
    } else {
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
    }
  }
}

Courses.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(
  translate("view", { wait: true })(Courses)
)
