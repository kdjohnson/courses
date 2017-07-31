import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Card, { CardHeader, CardActions, CardContent } from "material-ui/Card"
import Typography from "material-ui/Typography"
import Instructors from "./Instructors"
import Meetings from "./Meetings"
import CourseDetails from "./CourseDetails"
import { translate } from "react-i18next"

const styleSheet = createStyleSheet("ExpandableCourse", theme => ({
  courseContainer: {
    width: "100%"
  },

  card: {
    width: 345,
    backgroundColor: "#fafafa"
  },

  cardMobile: {
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

  classHeaderMobile: {
    backgroundColor: theme.palette.primary[400],
    textAlign: "center"
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
  },

  contentMobile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  actions: {
    display: "flex",
    justifyContent: "center"
  },

  infoContainer: {
    marginLeft: "2em"
  }
}))

class ExpandableCourse extends Component {
  render() {
    const { t } = this.props
    const classes = this.props.classes
    return (
      <div className={this.props.mobile ? classes.courseContainer : null}>
        <div style={{ marginTop: "1em" }}>
          <Card
            className={this.props.mobile ? classes.cardMobile : classes.card}
          >
            <CardHeader
              className={
                this.props.mobile
                  ? classes.classHeaderMobile
                  : classes.classHeader
              }
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
            <CardContent
              className={
                this.props.mobile ? classes.contentMobile : classes.content
              }
            >
              <div className={this.props.mobile ? classes.infoContainer : null}>
                <div style={{ marginTop: "1em" }}>
                  <Meetings meetings={this.props.course.meetings} />
                </div>
                <div style={{ marginTop: "1em" }}>
                  <Instructors teachers={this.props.course.instructors} />
                </div>
              </div>
            </CardContent>
            <CardActions className={this.props.mobile ? classes.actions : null}>
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
