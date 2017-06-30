import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Card, { CardHeader, CardActions, CardContent } from "material-ui/Card"
import Typography from "material-ui/Typography"
import Instructors from "./Instructors"
import Meetings from "./Meetings"
import ExpandableMeetings from "./ExpandableMeetings"
import CourseDetails from "./CourseDetails"
import { translate, Interpolate } from "react-i18next"
import i18n from "./../utils/i18n"

const styleSheet = createStyleSheet("ExpandableCourse", theme => ({
  card: {
    width: 345,
    backgroundColor: "#fafafa"
  },

  cardMobile: {
    width: "264px",
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

  classHeaderSpanDiv: {
    display: "flex",
    flexDirection: "column"
  },

  classHeaderSpan: {
    fontWeight: 600,
    color: "rgba(0, 0, 0, 0.75)"
  },

  courseTitle: {
    fontSize: 16,
    color: theme.palette.text.primary
  },

  content: {
    paddingTop: 0
  }
}))

class ExpandableCourse extends Component {
  render() {
    const { t } = this.props
    const classes = this.props.classes
    return (
      <div>
        <div style={{ marginTop: "1em" }}>
          <Card
            className={this.props.mobile ? classes.cardMobile : classes.card}
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
                  {this.props.course.courseTitle}
                </Typography>
              }
              key={this.props.course.crn + 0 + 3}
              subheader={
                <div className={classes.classHeaderSpanDiv}>
                  <span tabIndex="0" className={classes.classHeaderSpan}>
                    {this.props.course.subjectCode +
                      "-" +
                      this.props.course.subjectNumber +
                      "-" +
                      this.props.course.section +
                      "-" +
                      this.props.course.crn}
                  </span>
                  <span tabIndex="0" className={classes.classHeaderSpan}>
                    {t("credits", {}) + ": " + this.props.course.credit}
                  </span>
                </div>
              }
            />
            <CardContent className={classes.content}>
              <div style={{ marginTop: "1em" }}>
                <Meetings meetings={this.props.course.meetings} />
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

export default withStyles(styleSheet)(
  translate("view", { wait: true })(ExpandableCourse)
)
