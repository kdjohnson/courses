import React, { Component } from "react"
import { translate } from "react-i18next"
import { CardHeader } from "material-ui/Card"
import { withStyles } from "material-ui/styles"
import PropTypes from "prop-types"
import Typography from "material-ui/Typography"
import { amber } from "material-ui/colors"

const styles = theme => ({
  classHeader: {
    backgroundColor: theme.palette.primary[400],
    textAlign: "center"
  },

  classHeaderWaitList: {
    backgroundColor: amber[200],
    textAlign: "center"
  },

  classHeaderSpanDiv: {
    display: "flex",
    flexDirection: "column"
  },

  classHeaderSpanWaitList: {
    fontWeight: 600,
    color: "rgba(0, 0, 0, 0.75)"
  },

  subHeaderDiv: {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "center"
  },

  subHeaderDivMobile: {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "center"
  },

  courseTitle: {
    fontWeight: "bolder"
  },

  courseInfo: {
    fontWeight: "500",
    color: "#000"
  }
})

class CourseHeader extends Component {
  getHeader() {
    const classes = this.props.classes
    const { t } = this.props
    if (Object.is(this.props.course.waitList, "0")) {
      return (
        <CardHeader
          className={classes.classHeader}
          title={
            <Typography
              type="subheading"
              tabIndex="0"
              className={classes.courseTitle}
            >
              {this.props.course.courseTitle}
            </Typography>
          }
          subheader={
            <div className={classes.classHeaderSpanDiv}>
              <span tabIndex="0" className={classes.courseInfo}>
                {this.props.course.subjectCode +
                  "-" +
                  this.props.course.subjectNumber +
                  "-" +
                  this.props.course.section +
                  "-" +
                  this.props.course.crn}
              </span>
              <span tabIndex="0" className={classes.courseInfo}>
                {t("credits", {}) + ": " + this.props.course.credit}
              </span>
            </div>
          }
        />
      )
    } else {
      return (
        <CardHeader
          className={classes.classHeaderWaitList}
          title={
            <Typography tabIndex="0" className={classes.courseTitle}>
              {this.props.course.courseTitle}
            </Typography>
          }
          key={this.props.course.crn + 0 + 3}
          subheader={
            <div className={classes.classHeaderSpanDiv}>
              <span tabIndex="0" className={classes.courseInfo}>
                {this.props.course.subjectCode +
                  "-" +
                  this.props.course.subjectNumber +
                  "-" +
                  this.props.course.section +
                  "-" +
                  this.props.course.crn}
              </span>
              <div className={classes.subHeaderDiv}>
                <span tabIndex="0" className={classes.courseInfo}>
                  {t("credits", {}) + ": " + this.props.course.credit}
                </span>
                <span tabIndex="0" className={classes.courseInfo}>
                  {t("waitlist", {}) + ": " + this.props.course.waitList}
                </span>
              </div>
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

export default withStyles(styles, { name: "CourseHeader" })(
  translate("view", { wait: true })(CourseHeader)
)
