import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'

const styles = theme => ({
  item: {
    paddingLeft: 0
  }
})

class AdvisingGrade extends Component {
  getGrade = () => {
    const { classes, credits } = this.props
    if (Object.is(credits, null)) {
      return (
        <ListItem className={classes.item}>
          <ListItemText primary="N/A" />
        </ListItem>
      )
    } else {
      return (
        <ListItem className={classes.item}>
          <ListItemText primary={credits.grade} />
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

const mapStateToProps = state => ({
  credits: state.credits.credits
})

export default withStyles(styles, { name: 'AdvisingGrade' })(
  translate('view', { wait: true })(connect(mapStateToProps)(AdvisingGrade))
)
