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
})

class ExpandableCourse extends Component {
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

ExpandableCourse.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: "ExpandableCourse" })(
  ExpandableCourse
)
