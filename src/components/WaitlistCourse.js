import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Instructors from "./Instructors"
import Meetings from "./Meetings"
import CourseDetails from "./CourseDetails"
import CourseHeader from "./CourseHeader"

const styles = theme => ({
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
    color: theme.palette.primary.contrastText
  },

  infoContainer: {
    marginLeft: "2em"
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
})

class WaitlistCourse extends Component {
  render() {
    const { classes, course, mobile } = this.props
    return (
      <div className={mobile ? classes.courseContainer : null}>
        <div style={{ marginTop: "1em" }}>
          <Card
            className={mobile ? classes.cardMobile : classes.card}
          >
            <CourseHeader
              mobile={mobile}
              course={course}
            />
            <CardContent
              className={
                mobile ? classes.contentMobile : classes.content
              }
            >
              <div className={mobile ? classes.infoContainer : null}>
                <div style={{ marginTop: "1em" }}>
                  <Meetings meetings={course.meetings} />
                </div>
                <div style={{ marginTop: "1em" }}>
                  <Instructors teachers={course.instructors} />
                </div>
              </div>
            </CardContent>
            <CardActions className={mobile ? classes.actions : null}>
              <CourseDetails course={course} />
            </CardActions>
          </Card>
        </div>
      </div>
    )
  }
}

WaitlistCourse.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: "WaitlistCourse" })(WaitlistCourse)
