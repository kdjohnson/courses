import React, { useState } from 'react'

import CardContent from '@material-ui/core/CardContent'
import classnames from 'classnames'
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { displayLink, getMapUrl } from '../utils/mapLinks'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  iconButtonDiv: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    display: 'flex',
    alignSelf: 'center',
  },
  expandedDiv: {
    marginTop: '1em',
    display: 'flex',
    flexDirection: 'column',
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.secondary.main,
    borderLeftWidth: '0.3em',
    paddingLeft: '1em',
  },
  meet: {
    color: 'black',
  },
  meetLink: {
    color: '#3344dd',
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: 'Arimo',
  },
  meetNoLink: {
    color: 'black',
    lineHeight: 1.42857143,
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: 'Arimo',
  },
  meetBorder: {
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.secondary.main,
    borderLeftWidth: '0.3em',
    paddingLeft: '1em',
  },
}))

export default function ExpandableMeetings(props) {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const { meetings } = props

  function getMeeting() {
    const meeting = meetings[0]
    return (
      <div key={meeting.endDate + Math.random()} className={classes.meetBorder}>
        {displayLink(meeting.location, meeting.campus) && (
          <a
            className={classes.meetLink}
            tabIndex='0'
            target='_blank'
            href={getMapUrl(meeting.location, false)}
            rel='noopener noreferrer'
          >
            {meeting.location + ' [' + meeting.campus + ']'}
          </a>
        )}
        {!displayLink(meeting.location, meeting.campus) && (
          <Typography
            variant='body1'
            className={classes.meetNoLink}
            tabIndex='0'
          >
            {meeting.location + ' [' + meeting.campus + ']'}
          </Typography>
        )}
        <Typography variant='body1' className={classes.meet} tabIndex='0'>
          {`${meeting.meetDays} `}
        </Typography>
        <Typography
          variant='body1'
          className={classes.meet}
          tabIndex='0'
          key={meeting.endDate + Math.random()}
        >
          {meeting.startTime + ' - ' + meeting.endTime}
        </Typography>
        <Typography
          variant='body1'
          className={classes.meet}
          tabIndex='0'
          aria-label={
            meeting.startMonth +
            '-' +
            meeting.startDay +
            '-' +
            meeting.startYear +
            ' to ' +
            meeting.endMonth +
            '-0' +
            meeting.endDay +
            '-' +
            meeting.endYear
          }
        >
          {meeting.startMonth +
            '/' +
            meeting.startDay +
            '/' +
            meeting.startYear +
            ' - ' +
            meeting.endMonth +
            '/' +
            meeting.endDay +
            '/' +
            meeting.endYear}
        </Typography>
        <Typography variant='body1' className={classes.meet} tabIndex='0'>
          {meeting.courseType}
        </Typography>
      </div>
    )
  }

  function getExpandedMeetings() {
    let elements = []
    for (let i = 1, total = meetings.length; i < total; i++) {
      elements.push(
        <div key={i} className={classes.expandedDiv}>
          {displayLink(meetings[i].location, meetings[i].campus) && (
            <a
              className={classes.meetLink}
              tabIndex='0'
              target='_blank'
              href={getMapUrl(meetings[i].location, false)}
              rel='noopener noreferrer'
            >
              {meetings[i].location + ' [' + meetings[i].campus + ']'}
            </a>
          )}
          {!displayLink(meetings[i].location, meetings[i].campus) && (
            <Typography
              variant='body1'
              className={classes.meetNoLink}
              tabIndex='0'
            >
              {meetings[i].location + ' [' + meetings[i].campus + ']'}
            </Typography>
          )}
          <Typography variant='body1' className={classes.meet} tabIndex='0'>
            {`${meetings[i].meetDays} `}
          </Typography>
          <Typography
            variant='body1'
            className={classes.meet}
            tabIndex='0'
            key={meetings[i].endDate + Math.random()}
          >
            {meetings[i].startTime + ' - ' + meetings[i].endTime}
          </Typography>
          <Typography
            variant='body1'
            className={classes.meet}
            tabIndex='0'
            aria-label={
              meetings[i].startMonth +
              '-' +
              meetings[i].startDay +
              '-' +
              meetings[i].startYear +
              ' to ' +
              meetings[i].endMonth +
              '-' +
              meetings[i].endDay +
              '-' +
              meetings[i].endYear
            }
          >
            {meetings[i].startMonth +
              '/' +
              meetings[i].startDay +
              '/' +
              meetings[i].startYear +
              ' - ' +
              meetings[i].endMonth +
              '/' +
              meetings[i].endDay +
              '/' +
              meetings[i].endYear}
          </Typography>
          <Typography variant='body1' className={classes.meet} tabIndex='0'>
            {meetings[i].courseType}
          </Typography>
        </div>
      )
    }
    return elements
  }
  return (
    <div>
      <div className={classes.iconButtonDiv}>
        {getMeeting()}
        <div className={classes.icon}>
          <IconButton
            aria-label={expanded ? 'Close more meetings' : 'Open more meetings'}
            className={classnames(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() => setExpanded(!expanded)}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.flexGrow} />
      <Collapse in={expanded} unmountOnExit>
        <CardContent>{getExpandedMeetings()}</CardContent>
      </Collapse>
    </div>
  )
}
