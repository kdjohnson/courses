import React, { useEffect } from 'react'
import AdvisingCourses from './AdvisingCourses'
import RegistrationTypes from './RegistrationTypes'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { fetch_courses } from '../actions/coursesActions'

const useStyles = makeStyles(() => ({
  term: {
    marginBottom: '1em',
    fontWeight: 'bolder'
  },

  empty: {
    textAlign: 'center'
  }
}))

export default function Advising() {
  const classes = useStyles()
  const current_term = useSelector(state => state.terms.current_term)
  const courses = useSelector(state => state.courses.courses)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_courses(current_term))
  }, [dispatch, current_term])

  if (courses === null || courses === []) {
    return (
      <Typography variant="h3" className={classes.empty} tabIndex="0">
        This student is not registered for any courses for this semester currently.
      </Typography>
    )
  }

  return (
    <div>
      <RegistrationTypes />
      <AdvisingCourses />
    </div>
  )
}