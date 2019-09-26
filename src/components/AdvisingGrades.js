import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetch_credits } from './../actions/creditsActions'
import { useTranslation } from 'react-i18next';

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  tableHeader: {
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: 600,
    fontSize: 14
  },
  cell: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 'bolder'
  }
}))

export default function AdvisingGrades() {
  const classes = useStyles()
  const { t } = useTranslation()
  const credits = useSelector(state => state.credits.credits)
  const credits_fetched = useSelector(state => state.credits.fetched)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetch_credits())
  }, [dispatch])

  function getRows() {
    let rows = []
    let i = 0
    for (let cr of credits) {
      rows.push(
        <TableRow key={i}>
          <TableCell>{cr.level}</TableCell>
          <TableCell>{cr.credits}</TableCell>
          <TableCell>{cr.gpa}</TableCell>
        </TableRow>
      )
      i++
    }
    return rows
  }

  return (
    <Table>
      <TableHead>
        <TableRow className={classes.tableHeader}>
          <TableCell classes={{ head: classes.cell }} scope="col">
            {t('level')}
          </TableCell>
          <TableCell classes={{ head: classes.cell }} scope="col">
            {t('credits')}
          </TableCell>
          <TableCell classes={{ head: classes.cell }} scope="col">
            GPA
            </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{credits_fetched && getRows()}</TableBody>
    </Table>
  )
}