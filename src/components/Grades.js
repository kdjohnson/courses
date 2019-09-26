import React, { useEffect } from 'react'

import { fetch_credits } from './../actions/creditsActions'
import { useTranslation } from 'react-i18next';

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
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
        <TableCell>{cr.level}</TableCell>
        <TableCell>{cr.credits}</TableCell>
        <TableCell>{cr.gpa}</TableCell>
      </TableRow>
    )
  }
  return rows
}

const Grades = props => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { mobile } = props
  const dispatch = useDispatch();
  const credits = useSelector(state => state.credits.credits)
  const credits_fetched = useSelector(state => state.credits.fetched)
  const courses = useSelector(state => state.courses.courses)
  const courses_fetched = useSelector(state => state.courses.fetched)

  useEffect(() => {
    dispatch(fetch_credits())
  }, [dispatch])

  if (courses_fetched && credits_fetched) {
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
                {t('gac')}
              </Typography>
            }
          />
          <CardContent className={mobile ? classes.content : null}>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHeader}>
                  <TableCell className={classes.tableCell} scope="col">
                    {t('level')}
                  </TableCell>
                  <TableCell className={classes.tableCell} scope="col">
                    {t('grades')}
                  </TableCell>
                  <TableCell className={classes.tableCell} scope="col">
                    GPA
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{getOverallCredits(credits)}</TableBody>
            </Table>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHeader}>
                  <TableCell className={classes.tableCell} scope="col">
                    {t('course')}
                  </TableCell>
                  <TableCell className={classes.tableCell} scope="col">
                    {t('credits')}
                  </TableCell>
                  <TableCell className={classes.tableCell} scope="col">
                    {t('grades')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{GradeRow(courses)}</TableBody>
            </Table>
          </CardContent>
        </Card>
      )
    } else {
      return <div />
    }
}

export default Grades
