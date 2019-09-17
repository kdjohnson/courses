import React from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  cell: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 'bolder'
  }
}))

const AdvisingMeetings = props => {
  const classes = useStyles()
  const { meetings } = props
  return (
    <Paper className={classes.paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell classes={{ head: classes.cell }}>Meet Type</TableCell>
            <TableCell classes={{ head: classes.cell }} align="right">
              Start / End Time
              </TableCell>
            <TableCell classes={{ head: classes.cell }} align="right">
              Start / End Date
              </TableCell>
            <TableCell classes={{ head: classes.cell }} align="right">
              Days
              </TableCell>
            <TableCell classes={{ head: classes.cell }} align="right">
              Location
              </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetings.map(meet => {
            return (
              <TableRow key={meet.crn + Math.random()}>
                <TableCell>{meet.courseType}</TableCell>
                <TableCell align="right">
                  {meet.startTime + ' - ' + meet.endTime}
                </TableCell>
                <TableCell align="right">
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
                <TableCell align="right">{meet.meetDays}</TableCell>
                <TableCell align="right">{meet.buildingRoom}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default AdvisingMeetings