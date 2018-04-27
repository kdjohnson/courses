import React, { Component } from 'react'
import { displayLink, getMapUrl } from '../utils/mapLinks'

import { CardContent } from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from 'material-ui/IconButton'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import classnames from 'classnames'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  card: { maxWidth: 400 },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },

  flexGrow: { flex: '1 1 auto' },

  iconButtonDiv: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  expandedDiv: {
    marginTop: '1em',
    display: 'flex',
    flexDirection: 'column',
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.secondary.main,
    borderLeftWidth: '0.3em',
    paddingLeft: '1em'
  },

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
})

class ExpandableMeetings extends Component {
  state = { expanded: false }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  getExpandedMeetings = () => {
    let elements = []
    const { classes, meetings } = this.props
    for (let i = 1, total = meetings.length; i < total; i++) {
      elements.push(
        <div key={i} className={classes.expandedDiv}>
          {displayLink(meetings[i].buildingRoom, meetings[i].campus) && (
            <a
              className={classes.meetLink}
              tabIndex="0"
              target="_blank"
              href={getMapUrl(meetings[i].buildingRoom, false)}
              rel="noopener noreferrer"
            >
              {meetings[i].buildingRoom + ' [' + meetings[i].campus + ']'}
            </a>
          )}
          {!displayLink(meetings[i].buildingRoom, meetings[i].campus) && (
            <Typography
              type="body2"
              className={classes.meetNoLink}
              tabIndex="0"
            >
              {meetings[i].buildingRoom + ' [' + meetings[i].campus + ']'}
            </Typography>
          )}
          <Typography type="body2" className={classes.meet} tabIndex="0">
            {`${meetings[i].meetDays} `}
          </Typography>
          <Typography
            type="body2"
            className={classes.meet}
            tabIndex="0"
            key={meetings[i].endDate + Math.random()}
          >
            {meetings[i].startTime + ' - ' + meetings[i].endTime}
          </Typography>
          <Typography
            type="body2"
            className={classes.meet}
            tabIndex="0"
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
          <Typography type="body2" className={classes.meet} tabIndex="0">
            {meetings[i].courseType}
          </Typography>
        </div>
      )
    }
    return elements
  }

  getMeeting = () => {
    const { classes, meetings } = this.props
    const meeting = meetings[0]
    return (
      <div key={meeting.endDate + Math.random()} className={classes.meetBorder}>
        {displayLink(meeting.buildingRoom, meeting.campus) && (
          <a
            className={classes.meetLink}
            tabIndex="0"
            target="_blank"
            href={getMapUrl(meeting.buildingRoom, false)}
            rel="noopener noreferrer"
          >
            {meeting.buildingRoom + ' [' + meeting.campus + ']'}
          </a>
        )}
        {!displayLink(meeting.buildingRoom, meeting.campus) && (
          <Typography type="body2" className={classes.meetNoLink} tabIndex="0">
            {meeting.buildingRoom + ' [' + meeting.campus + ']'}
          </Typography>
        )}
        <Typography type="body2" className={classes.meet} tabIndex="0">
          {`${meeting.meetDays} `}
        </Typography>
        <Typography
          type="body2"
          className={classes.meet}
          tabIndex="0"
          key={meeting.endDate + Math.random()}
        >
          {meeting.startTime + ' - ' + meeting.endTime}
        </Typography>
        <Typography
          type="body2"
          className={classes.meet}
          tabIndex="0"
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
        <Typography type="body2" className={classes.meet} tabIndex="0">
          {meeting.courseType}
        </Typography>
      </div>
    )
  }

  render() {
    const { classes } = this.props
    const { expanded } = this.state
    return (
      <div>
        <div className={classes.iconButtonDiv}>
          {this.getMeeting()}
          <IconButton
            aria-label={
              expanded ? 'Close more meetings' : 'Open more meetings'
            }
            className={classnames(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={this.handleExpandClick}
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
        <div className={classes.flexGrow} />
        <Collapse in={expanded} unmountOnExit>
          <CardContent>{this.getExpandedMeetings()}</CardContent>
        </Collapse>
      </div>
    )
  }
}

ExpandableMeetings.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: 'ExpandableMeetings' })(
  ExpandableMeetings
)
