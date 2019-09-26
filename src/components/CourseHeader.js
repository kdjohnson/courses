import React from 'react'

import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import amber from '@material-ui/core/colors/amber'
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  classHeader: {
    backgroundColor: theme.palette.primary.light,
    textAlign: 'center'
  },

  classHeaderWaitList: {
    backgroundColor: amber[200],
    textAlign: 'center'
  },

  classHeaderSpanDiv: {
    display: 'flex',
    flexDirection: 'column'
  },

  classHeaderSpanWaitList: {
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.75)'
  },

  subHeaderDiv: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'center'
  },

  subHeaderDivMobile: {
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'center'
  },

  courseTitle: {
    fontWeight: 'bolder'
  },

  courseInfo: {
    fontWeight: '500',
    color: '#000'
  }
}))

export default function CourseHeader(props) {
  const classes = useStyles()
  const { t } = useTranslation()
  const { course } = props

  if (Object.is(course.waitList, '0')) {
    return (
      <CardHeader
        className={classes.classHeader}
        title={
          <Typography
            variant="subtitle1"
            tabIndex="0"
            className={classes.courseTitle}
          >
            {course.courseTitle}
          </Typography>
        }
        subheader={
          <div className={classes.classHeaderSpanDiv}>
            <span tabIndex="0" className={classes.courseInfo}>
              {course.subjectCode +
                '-' +
                course.subjectNumber +
                '-' +
                course.section +
                '-' +
                course.crn}
            </span>
            <span tabIndex="0" className={classes.courseInfo}>
              {t('credits') + ': ' + course.credit}
            </span>
          </div>
        }
      />
    )
  } else {
    return (
      <CardHeader
        className={classes.classHeaderWaitList}
        title={
          <Typography tabIndex="0" className={classes.courseTitle}>
            {course.courseTitle}
          </Typography>
        }
        key={course.crn + 0 + 3}
        subheader={
          <div className={classes.classHeaderSpanDiv}>
            <span tabIndex="0" className={classes.courseInfo}>
              {course.subjectCode +
                '-' +
                course.subjectNumber +
                '-' +
                course.section +
                '-' +
                course.crn}
            </span>
            <div className={classes.subHeaderDiv}>
              <span tabIndex="0" className={classes.courseInfo}>
                {t('credits') + ': ' + course.credit}
              </span>
              <span tabIndex="0" className={classes.courseInfo}>
                {t('waitlist') + ': ' + course.waitList}
              </span>
            </div>
          </div>
        }
      />
    )
  }
}
