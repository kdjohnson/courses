import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  item: {
    paddingLeft: 0
  },
  itemText: {
    color: 'rgba(0, 0, 0, 0.87)'
  }
})

class AdvisingGrade extends React.Component {
  getGrade = () => {
    const { classes, grade } = this.props
    if (Object.is(grade, null)) {
      return (
        <ListItem className={classes.item}>
          <ListItemText
            secondary="N/A"
            classes={{
              secondary: classes.itemText
            }}
          />
        </ListItem>
      )
    } else {
      return (
        <ListItem className={classes.item}>
          <ListItemText
            secondary={grade.grade}
            classes={{
              secondary: classes.itemText
            }}
          />
        </ListItem>
      )
    }
  }

  render() {
    return <List>{this.getGrade()}</List>
  }
}

AdvisingGrade.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: 'AdvisingGrade' })(
  translate('view', { wait: true })(AdvisingGrade)
)
