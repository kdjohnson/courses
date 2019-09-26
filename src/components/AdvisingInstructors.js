import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  itemText: {
    color: 'rgba(0, 0, 0, 0.87)'
  }
}))

export default function AdvisingInstructors(props) {
  const classes = useStyles()
  let teachers = []
  const { instructors } = props
  for (let [i, instructor] of instructors.entries()) {
    teachers.push(
      <ListItem
        style={{ paddingLeft: 0 }}
        key={instructor.crn + Math.random()}>
        <ListItemText
            classes={{
              secondary: classes.itemText
            }}
            secondary={
              instructor.firstName +
              ' ' +
              instructor.lastName
            }
          />
      </ListItem>
    )
  }

  return (
    <List>{teachers}</List>
  )
}