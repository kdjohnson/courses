import React, { useState } from 'react';

import CardContent from '@material-ui/core/CardContent';
import classnames from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { displayLink, getMapUrl } from '../utils/mapLinks';
import { makeStyles } from '@material-ui/core/styles';
import { Course, Meeting } from '../types';

interface MeetingsProps {
  course: Course;
}

interface MeetingProps {
  meetings: Meeting[];
}

const useStyles = makeStyles((theme) => ({
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
    alignSelf: 'center',
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
  text: {
    fontWeight: 'bolder',
    paddingBottom: '0.5em',
  },
}));

const NoMeeting = () => {
  return <Typography>No meeting data to display</Typography>;
};

const MeetingBody = ({ meetings }: MeetingProps) => {
  const classes = useStyles();
  return (
    <>
      {meetings.map((meeting, i) => {
        return (
          <div key={i} className={classes.meetBorder}>
            {displayLink(meeting.location, meeting.campus) ? (
              <a
                className={classes.meetLink}
                tabIndex={0}
                target='_blank'
                // href={getMapUrl(meeting.location, course.instructors)}
                href={getMapUrl(meeting.location, '')}
                rel='noopener noreferrer'
              >
                {`${meeting.location} [${meeting.campus}]`}
              </a>
            ) : (
              <Typography variant='body1' className={classes.meetNoLink} tabIndex={0}>
                {`${meeting.location} [${meeting.campus}]`}
              </Typography>
            )}
            <Typography variant='body1' className={classes.meet} tabIndex={0}>
              {`${meeting.meetDays}`}
            </Typography>
            <Typography variant='body1' className={classes.meet} tabIndex={0}>
              {`${meeting.startTime} - ${meeting.endTime}`}
            </Typography>
            <Typography
              variant='body1'
              className={classes.meet}
              tabIndex={0}
              aria-label={`${meeting.startMonth}-${meeting.startDay}-${meeting.startYear}
             to ${meeting.endMonth}-${meeting.endDay}-${meeting.endYear}`}
            >
              {`${meeting.startMonth}-${meeting.startDay}-${meeting.startYear}
             - ${meeting.endMonth}-${meeting.endDay}-${meeting.endYear}`}
            </Typography>
            <Typography variant='body1' className={classes.meet} tabIndex={0}>
              {meeting.courseType}
            </Typography>
          </div>
        );
      })}
    </>
  );
};

export default function Meetings(props: MeetingsProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { course } = props;

  if (course.meetings === null || course.meetings.length === 0) {
    return <NoMeeting />;
  }

  return (
    <>
      {course.meetings.length === 1 ? (
        <MeetingBody meetings={course.meetings} />
      ) : (
        <div>
          <div className={classes.iconButtonDiv}>
            <MeetingBody meetings={course.meetings.slice(0, 1)} />
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
            <CardContent>
              <MeetingBody meetings={course.meetings.slice(1)} />
            </CardContent>
          </Collapse>
        </div>
      )}
    </>
  );
}
