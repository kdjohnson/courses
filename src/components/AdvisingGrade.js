import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  item: {
    paddingLeft: 0
  },
  itemText: {
    color: 'rgba(0, 0, 0, 0.87)'
  }
}))

const AdvisingGrade = props => {
  const classes = useStyles()
  const { grade } = props

  if (grade === null) {
    return (
      <List>
        <ListItem className={classes.item}>
          <ListItemText
            secondary="N/A"
            classes={{
              secondary: classes.itemText
            }}
          />
        </ListItem>
      </List>
    )
  } else {
    return (
      <List>
        <ListItem className={classes.item}>
          <ListItemText
            secondary={grade.grade}
            classes={{
              secondary: classes.itemText
            }}
          />
        </ListItem>
      </List>
    )
  }
}

export default AdvisingGrade