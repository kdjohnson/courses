import React from 'react'
import { displayLink, getMapUrl } from '../utils/mapLinks'
import ExpandableMeetings from './ExpandableMeetings'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  meet: {
    color: 'black'
  },
  meetLink: {
    color: '#3344dd',
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: 'Arimo'
  },

  meetNoLink: {
    color: 'black',
    lineHeight: 1.42857143,
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: 'Arimo'
  },

  meetBorder: {
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.secondary.main,
    borderLeftWidth: '0.3em',
    paddingLeft: '1em'
  }
}))

// TODO: Maybe this branching can be reduced? 
export default function Meetings(props) {
  const classes = useStyles()
  const { meetings } = props

  function getMeetings() {
    if (Object.is(meetings, null)) {
      return <div key={'emptyDiv' + Math.random()} />
    } else if (meetings.length === 0) {
      return (
        <div>
          <Typography variant="body1" className={classes.meetNoLink} tabIndex="0">
            N/A
          </Typography>
          <Typography variant="body1" className={classes.meet} tabIndex="0">
            N/A
          </Typography>
          <Typography variant="body1" className={classes.meet} tabIndex="0">
            N/A
          </Typography>
          <Typography variant="body1" className={classes.meet} tabIndex="0">
            N/A
          </Typography>
          <Typography variant="body1" className={classes.meet} tabIndex="0">
            N/A
          </Typography>
        </div>
      )
    } else {
      if (meetings.length >= 2) {
        return <ExpandableMeetings meetings={meetings} />
      } else {
        return (
          <div className={classes.meetBorder}>
            {displayLink(meetings[0].buildingRoom, meetings[0].campus) && (
              <a
                className={classes.meetLink}
                tabIndex="0"
                target="_blank"
                href={getMapUrl(meetings[0].buildingRoom, false)}
                rel="noopener noreferrer"
              >
                {meetings[0].buildingRoom + ' [' + meetings[0].campus + ']'}
              </a>
            )}
            {!displayLink(meetings[0].buildingRoom, meetings[0].campus) && (
              <Typography
                variant="body1"
                className={classes.meetNoLink}
                tabIndex="0"
              >
                {meetings[0].buildingRoom + ' [' + meetings[0].campus + ']'}
              </Typography>
            )}
            <Typography variant="body1" className={classes.meet} tabIndex="0">
              {`${meetings[0].meetDays} `}
            </Typography>
            <Typography varaint="body1" className={classes.meet} tabIndex="0">
              {meetings[0].startTime + ' - ' + meetings[0].endTime}
            </Typography>
            <Typography
              variant="body1"
              className={classes.meet}
              tabIndex="0"
              aria-label={
                meetings[0].startMonth +
                '-' +
                meetings[0].startDay +
                '-' +
                meetings[0].startYear +
                ' to ' +
                meetings[0].endMonth +
                '-' +
                meetings[0].endDay +
                '-' +
                meetings[0].endYear
              }
            >
              {meetings[0].startMonth +
                '/' +
                meetings[0].startDay +
                '/' +
                meetings[0].startYear +
                ' - ' +
                meetings[0].endMonth +
                '/' +
                meetings[0].endDay +
                '/' +
                meetings[0].endYear}
            </Typography>
            <Typography variant="body1" className={classes.meet} tabIndex="0">
              {meetings[0].courseType}
            </Typography>
          </div>
        )
      }
    }
  }

  return (
    <div>
      <Typography
        tabIndex="0"
        style={{ fontWeight: 'bolder', paddingBottom: '0.5em' }}
      >
        CLASS INFORMATION
    </Typography>
      {getMeetings()}
    </div>
  )
}
