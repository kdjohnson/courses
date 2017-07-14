import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table"
import Paper from "material-ui/Paper"
import { translate } from "react-i18next"

const styleSheet = createStyleSheet("AdvisingMeetings", theme => ({
  paper: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  }
}))

class AdvisingMeetings extends Component {
  render() {
    const classes = this.props.classes
    const { t } = this.props
    return (
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Meet Type</TableCell>
              <TableCell numeric>Start / End Time</TableCell>
              <TableCell numeric>Start / End Date</TableCell>
              <TableCell numeric>Days</TableCell>
              <TableCell numeric>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.meetings.map(meet => {
              return (
                <TableRow key={meet.crn + Math.random()}>
                  <TableCell compact>
                    {meet.courseType}
                  </TableCell>
                  <TableCell compact>
                    {meet.startTime + "-" + meet.endTime}
                  </TableCell>
                  <TableCell compact>
                    {meet.startDay +
                      "/" +
                      meet.startMonth +
                      "/" +
                      meet.startYear +
                      "-" +
                      meet.endDay +
                      "/" +
                      meet.endMonth +
                      "/" +
                      meet.endYear}
                  </TableCell>
                  <TableCell compact>
                    {meet.meetDays}
                  </TableCell>
                  <TableCell compact>
                    {meet.buildingRoom}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

AdvisingMeetings.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(
  translate("view", { wait: true })(AdvisingMeetings)
)