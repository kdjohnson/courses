// @flow weak

import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Instructors from "./Instructors"
import ExpandableCourse from "./ExpandableCourse"
import Meetings from "./Meetings"
import CourseDetails from "./CourseDetails"
import { getBookButton } from "./BuyBooks"
import { translate } from "react-i18next"
import WaitlistCourse from "./WaitlistCourse"
import CourseHeader from "./CourseHeader"

const styleSheet = createStyleSheet("Courses", theme => ({
  courseContainer: {
    width: "100%"
  },

  coursesDiv: {
    display: "flex",
    justifyContent: "space-between",
    flexFlow: "wrap"
  },

  coursesDivMobile: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },

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
    backgroundColor: "#fafafa"
  },

  courseTitle: {
    fontSize: 16,
    color: theme.palette.text.primary
  },

  infoContainer: {
    marginLeft: "2em"
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
  }
}))

class Courses extends Component {
  getCourses = () => {
    const classes = this.props.classes
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
      } else if (!Object.is(this.props.courses[i].waitList, "0")) {
        elements.push(
          <WaitlistCourse
            course={this.props.courses[i]}
            key={"waitlist" + Math.random()}
            mobile={this.props.mobile}
          />
        )
      } else {
        elements.push(
          <div
            className={this.props.mobile ? classes.courseContainer : null}
            key={this.props.courses[i].crn + i + Math.random()}
          >
            <div style={{ marginTop: "1em" }}>
              <Card
                className={
                  this.props.mobile ? classes.cardMobile : classes.card
                }
                key={this.props.courses[i].crn + i + Math.random()}
              >
                <CourseHeader
                  mobile={this.props.mobile}
                  course={this.props.courses[i]}
                />
                <CardContent
                  className={
                    this.props.mobile ? classes.contentMobile : classes.content
                  }
                  key={this.props.courses[i].crn + i + Math.random()}
                >
                  <div
                    className={this.props.mobile ? classes.infoContainer : null}
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
                      <Instructors
                        teachers={this.props.courses[i].instructors}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardActions
                  className={this.props.mobile ? classes.actions : null}
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
    const classes = this.props.classes
    if (Object.is(this.props.courses, null)) {
      return <div />
    } else {
      return (
        <div
          className={
            this.props.mobile ? classes.coursesDivMobile : classes.coursesDiv
          }
        >
          {this.getCourses()}
          {getBookButton(this.props.books)}
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
