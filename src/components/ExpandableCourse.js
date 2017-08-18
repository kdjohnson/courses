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
    flex: "1 1 auto",
    padding: "1em"
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

class ExpandableCourse extends Component {
  render() {
    const classes = this.props.classes
    return (
      <div className={classes.courseContainer}>
        <div style={{ marginTop: "1em" }}>
          <Card className={classes.card}>
            <CourseHeader
              mobile={this.props.mobile}
              course={this.props.course}
            />
            <CardContent className={classes.content}>
              <div>
                <div style={{ marginTop: "1em" }}>
                  <Meetings meetings={this.props.course.meetings} />
                </div>
                <div style={{ marginTop: "1em" }}>
                  <Instructors teachers={this.props.course.instructors} />
                </div>
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

export default withStyles(styles, { name: "ExpandableCourse" })(
  ExpandableCourse
)
