import React, { Component } from "react"
import { translate } from "react-i18next"
import { CardHeader } from "material-ui/Card"
import { withStyles, createStyleSheet } from "material-ui/styles"
import PropTypes from "prop-types"
import Typography from "material-ui/Typography"
import { amber } from "material-ui/colors"

const styleSheet = createStyleSheet("CourseHeader", theme => ({
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

  classHeaderWaitList: {
    backgroundColor: amber[200]
  },

  classHeaderMobileWaitList: {
    backgroundColor: amber[200],
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

  classHeaderSpanWaitList: {
    fontWeight: 600,
    color: "rgba(0, 0, 0, 0.75)"
  },

  courseTitle: {
    fontSize: 16,
    color: theme.palette.text.primary
  }
}))

class CourseHeader extends Component {
  getHeader() {
    const classes = this.props.classes
    const { t } = this.props
    if (Object.is(this.props.course.waitList, "0")) {
      return (
        <CardHeader
          className={
            this.props.mobile ? classes.classHeaderMobile : classes.classHeader
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
      )
    } else {
      return (
        <CardHeader
          className={
            this.props.mobile
              ? classes.classHeaderMobileWaitList
              : classes.classHeaderWaitList
          }
          title={
            <Typography
              tabIndex="0"
              component="h1"
              className={classes.classHeaderSpanWaitList}
              style={{ fontSize: "20px" }}
            >
              {this.props.course.courseTitle}
            </Typography>
          }
          key={this.props.course.crn + 0 + 3}
          subheader={
            <div className={classes.classHeaderSpanDiv}>
              <span tabIndex="0" className={classes.classHeaderSpanWaitList}>
                {this.props.course.subjectCode +
                  "-" +
                  this.props.course.subjectNumber +
                  "-" +
                  this.props.course.section +
                  "-" +
                  this.props.course.crn}
              </span>
              <span tabIndex="0" className={classes.classHeaderSpanWaitList}>
                {t("credits", {}) + ": " + this.props.course.credit}
              </span>
              <span tabIndex="0" className={classes.classHeaderSpanWaitList}>
                {t("waitlist", {}) + ": " + this.props.course.waitList}
              </span>
            </div>
          }
        />
      )
    }
  }
  render() {
    return (
      <div>
        {this.getHeader()}
      </div>
    )
  }
}

CourseHeader.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(
  translate("view", { wait: true })(CourseHeader)
)
