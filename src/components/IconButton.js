// @flow weak

import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import IconButton from "material-ui/IconButton"
import DeleteIcon from "material-ui-icons/Delete"
import AlarmIcon from "material-ui-icons/Alarm"
import AddShoppingCartIcon from "material-ui-icons/AddShoppingCart"

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

export default withStyles(styles, { name: "IconButton" })(IconButtons)
