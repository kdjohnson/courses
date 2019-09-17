import React from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  cell: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 'bolder'
  }
})

class AdvisingMeetings extends React.Component {
  render() {
    const { classes, meetings } = this.props
    return (
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell classes={{ head: classes.cell }}>Meet Type</TableCell>
              <TableCell classes={{ head: classes.cell }} numeric>
                Start / End Time
              </TableCell>
              <TableCell classes={{ head: classes.cell }} numeric>
                Start / End Date
              </TableCell>
              <TableCell classes={{ head: classes.cell }} numeric>
                Days
              </TableCell>
              <TableCell classes={{ head: classes.cell }} numeric>
                Location
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetings.map(meet => {
              return (
                <TableRow key={meet.crn + Math.random()}>
                  <TableCell>{meet.courseType}</TableCell>
                  <TableCell numeric>
                    {meet.startTime + ' - ' + meet.endTime}
                  </TableCell>
                  <TableCell numeric>
                    {meet.startMonth +
                      '/' +
                      meet.startDay +
                      '/' +
                      meet.startYear +
                      ' - ' +
                      meet.endMonth +
                      '/' +
                      meet.endDay +
                      '/' +
                      meet.endYear}
                  </TableCell>
                  <TableCell numeric>{meet.meetDays}</TableCell>
                  <TableCell numeric>{meet.buildingRoom}</TableCell>
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

export default withStyles(styles, { name: 'AdvisingMeetings' })(
  AdvisingMeetings
)
