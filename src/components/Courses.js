// @flow weak

import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Instructors from "./Instructors"
import ExpandableCourse from "./ExpandableCourse"
import Meetings from "./Meetings"
import CourseDetails from "./CourseDetails"
import { getBookButton } from "./BuyBooks"
import { translate } from "react-i18next"
import WaitlistCourse from "./WaitlistCourse"
import CourseHeader from "./CourseHeader"

const styles = theme => ({
  courseContainer: {
    flex: "1 1 auto",
    padding: "1em"
  },

  coursesDiv: {
    display: "flex",
    flexFlow: "wrap"
  },

  coursesDivMobile: {
    display: "flex",
    flexDirection: "column"
  },

  card: {
    backgroundColor: "#fafafa"
  },

  content: {
    paddingTop: 0,
    display: "flex",
    justifyContent: "center"
  }
})

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
            className={classes.courseContainer}
            key={this.props.courses[i].crn + i + Math.random()}
          >
            <div style={{ marginTop: "1em" }}>
              <Card
                className={classes.card}
                key={this.props.courses[i].crn + i + Math.random()}
              >
                <CourseHeader
                  mobile={this.props.mobile}
                  course={this.props.courses[i]}
                />
                <CardContent
                  className={classes.content}
                  key={this.props.courses[i].crn + i + Math.random()}
                >
                  <div>
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
        <div>
          {getBookButton(
            this.props.books,
            this.props.currentTermDescription,
            this.props.mobile
          )}
          <div
            className={
              this.props.mobile ? classes.coursesDivMobile : classes.coursesDiv
            }
          >
            {this.getCourses()}
          </div>
        </div>
      )
    }
  }
}

Courses.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: "Courses" })(
  translate("view", { wait: true })(Courses)
)
