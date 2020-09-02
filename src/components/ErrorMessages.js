import React from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Error from '@material-ui/icons/Error'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    width: '90%',
  },
  card: {
    backgroundColor: '#fafafa ',
    borderLeftStyle: 'solid',
    borderLeftWidth: '12px',
    borderLeftColor: '#d32f2f',
    display: 'flex',
  },
  icon: {
    fill: '#d32f2f',
    width: 30,
    height: 30,
  },
}))

export default function ErrorMessages() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Error className={classes.icon} />}
          title='We were unable to fetch your data at this time'
          subheader='Please try again later'
        />
      </Card>
    </div>
  )
}
