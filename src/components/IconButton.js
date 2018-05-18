// @flow weak

import React from 'react'
import PropTypes from 'prop-types'

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import AlarmIcon from '@material-ui/icons/Alarm'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
})

function IconButtons(props) {
  const classes = props.classes
  return (
    <div>
      <IconButton className={classes.button}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}

IconButtons.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: 'IconButton' })(IconButtons)
