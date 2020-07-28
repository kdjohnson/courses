import React, { useEffect, useState } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import ErrorMessages from './ErrorMessages'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from 'react-redux'
import { fetch_selected_courses } from '../actions/termActions'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  error: {
    display: 'flex',
    justifyContent: 'center'
  },
  cardDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  card: {
    backgroundColor: '#fafafa'
  },
  courseTitle: {
    fontSize: 16,
    color: theme.palette.text.primary
  },
  classHeader: {
    backgroundColor: theme.palette.primary.light
  },
  classHeaderSpan: {
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    paddingTop: 0,
    overflowX: 'scroll'
  },
  tableCell: {
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: 600,
    fontSize: 14,
    width: '33%'
  }
}))

const GradeRow = courses => {
  try {
    let tableArray = []
    for (let i = 0; i < courses.length; i++) {
      let course = courses[i].subjectCode + ' - ' + courses[i].subjectNumber
      let credits = courses[i].grade.credit
      let grade = courses[i].grade.grade

      tableArray.push(
        <TableRow key={i + Math.random()}>
          <TableCell>{course}</TableCell>
          <TableCell>{credits}</TableCell>
          <TableCell>{grade}</TableCell>
        </TableRow>
      )
    }
    return tableArray
  } catch (error) {
    return <TableRow />
  }
}

const getOverallCredits = credits => {
  let rows = []
  let i = 0
  for (let cr of credits) {
    rows.push(
      <TableRow key={i++}>
        <TableCell>{cr.standing}</TableCell>
        <TableCell>{cr.credits}</TableCell>
        <TableCell>{cr.gpa}</TableCell>
      </TableRow>
    )
  }
  return rows
}

const Grades = props => {
  const classes = useStyles()
  const { mobile } = props
  const credits = useSelector(state => state.credits)
  const dispatch = useDispatch()
  const courses = useSelector(state => state.courses)
  const courses_fetched = useSelector(state => state.fetched)
  const courses_error = useSelector(state => state.error)
  const selected_term = useSelector(state => state.selected_term)
  const [term, set_term] = useState(null)

  useEffect(() => {
    if (term === null) {
      set_term(selected_term)
    } else {
      dispatch(fetch_selected_courses(selected_term))
    }
  }, [selected_term, dispatch])

  if (courses_error || credits.length === 0) {
    return (
      <div className={classes.error}>
        <ErrorMessages />
      </div>
    )
  }

  if (credits !== []) {
      return (
        <Card className={classes.card}>
          <CardHeader
            className={classes.classHeader}
            title={
              <Typography
                tabIndex="0"
                variant="h1"
                className={classes.classHeaderSpan}
                style={{ fontSize: '20px' }}
              >
               Grades and Credits 
              </Typography>
            }
          />
          <CardContent className={mobile ? classes.content : null}>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHeader}>
                  <TableCell className={classes.tableCell} scope="col">
                    Level
                  </TableCell>
                  <TableCell className={classes.tableCell} scope="col">
                    Grades
                  </TableCell>
                  <TableCell className={classes.tableCell} scope="col">
                    GPA
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{getOverallCredits(credits)}</TableBody>
            </Table>
            {courses_fetched && (
            <Table>
              <TableHead>
                <TableRow className={classes.tableHeader}>
                  <TableCell className={classes.tableCell} scope="col">
                    Course
                  </TableCell>
                  <TableCell className={classes.tableCell} scope="col">
                    Credits
                  </TableCell>
                  <TableCell className={classes.tableCell} scope="col">
                    Grades
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{GradeRow(courses)}</TableBody>
            </Table>
            )}
          </CardContent>
        </Card>
      )
    } else {
      return <div />
    }
}

export default Grades
