import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  itemText: {
    color: 'rgba(0, 0, 0, 0.87)'
  }
})

class AdvisingInstructors extends React.Component {
  getInsturctors = () => {
    const { classes } = this.props
    let teachers = []
    for (let i = 0; i < this.props.instructors.length; i++) {
      teachers.push(
        <ListItem
          style={{ paddingLeft: 0 }}
          key={this.props.instructors[i].crn + Math.random()}
        >
          <ListItemText
            classes={{
              secondary: classes.itemText
            }}
            secondary={
              this.props.instructors[i].firstName +
              ' ' +
              this.props.instructors[i].lastName
            }
          />
        </ListItem>
      )
    }
    return teachers
  }
  render() {
    return <List> {this.getInsturctors()}</List>
  }
}

AdvisingInstructors.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: 'AdvisingInstructors' })(AdvisingInstructors)
