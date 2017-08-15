import React, { Component } from "react"
import Typography from "material-ui/Typography"
import Card, { CardHeader, CardContent } from "material-ui/Card"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import AdvisingMeetings from "./AdvisingMeetings"
import AdvisingInstructors from "./AdvisingInstructors"
import AdvisingGrade from "./AdvisingGrade"

const styles = theme => ({
  header: {
    backgroundColor: theme.palette.primary[400]
  }
})

class AdvisingCourses extends Component {
  handleChange = (event, checked, type) => {
    let temp = this.props.regs
    temp[type] = checked
    this.props.updateRegs(temp)
  }

  getCourses() {
    let advisorCourses = []
    const classes = this.props.classes
    for (let i = 0; i < this.props.courses.length; i++) {
      if (
        Object.is(
          this.props.regs[this.props.courses[i].registrationStatusDescription],
          true
        )
      ) {
        advisorCourses.push(
          <Card
            key={this.props.courses[i].crn + i + Math.random()}
            style={{ marginBottom: "1em" }}
          >
            <CardHeader
              className={classes.header}
              title={
                <Typography
                  tabIndex="0"
                  component="h1"
                  style={{ fontSize: "20px" }}
                >
                  {this.props.courses[i].subjectCode +
                    "-" +
                    this.props.courses[i].subjectNumber +
                    ": " +
                    this.props.courses[i].courseTitle +
                    " [CRN: " +
                    this.props.courses[i].crn +
                    "]"}
                </Typography>
              }
              key={this.props.courses[i].crn + i + Math.random()}
              subheader={
                <Typography tabIndex="0">
                  {"Credits: " + this.props.courses[i].credit}
                </Typography>
              }
            />
            <CardContent key={this.props.courses[i].crn + i + Math.random()}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div>
                  <Typography type="title">Instructors</Typography>
                  <AdvisingInstructors
                    instructors={this.props.courses[i].instructors}
                  />
                </div>
                <div>
                  <Typography type="title">Grade</Typography>
                  <AdvisingGrade grade={this.props.courses[i].grade} />
                </div>
              </div>
              <Typography type="title">Meetings</Typography>
              <AdvisingMeetings meetings={this.props.courses[i].meetings} />
            </CardContent>
          </Card>
        )
      }
    }
    return advisorCourses
  }

  render() {
    if (Object.is(this.props.courses, null)) {
      return <div />
    } else {
      return (
        <div>
          {this.getCourses()}
        </div>
      )
    }
  }
}

AdvisingCourses.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: "AdvisingCourses" })(AdvisingCourses)
