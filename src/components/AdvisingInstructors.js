import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/List'
import ListItemText from '@material-ui/core/List'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({})

class AdvisingInstructors extends React.Component {
  getInsturctors = () => {
    let teachers = []
    for (let i = 0; i < this.props.instructors.length; i++) {
      teachers.push(
        <ListItem
          style={{ paddingLeft: 0 }}
          key={this.props.instructors[i].crn + Math.random()}
        >
          <ListItemText
            primary={
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

export default withStyles(styles, { name: 'AdvisingInstructors' })(
  translate('view', { wait: true })(AdvisingInstructors)
)
