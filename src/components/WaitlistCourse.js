import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Instructors from "./Instructors"
import Meetings from "./Meetings"
import CourseDetails from "./CourseDetails"
import CourseHeader from "./CourseHeader"

const styleSheet = createStyleSheet("WaitlistCourse", theme => ({
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

class WaitlistCourse extends Component {
  render() {
    const classes = this.props.classes
    return (
      <div className={this.props.mobile ? classes.courseContainer : null}>
        <div style={{ marginTop: "1em" }}>
          <Card
            className={this.props.mobile ? classes.cardMobile : classes.card}
          >
            <CourseHeader
              mobile={this.props.mobile}
              course={this.props.course}
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

WaitlistCourse.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(WaitlistCourse)
