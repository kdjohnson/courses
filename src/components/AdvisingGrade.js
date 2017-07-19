import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import List, { ListItem, ListItemText } from "material-ui/List"
import { translate } from "react-i18next"
const styleSheet = createStyleSheet("AdvisingGrade", theme => ({
  root: {
    color: "tomato"
  }
}))

class AdvisingGrade extends Component {
  getGrade = () => {
    if (Object.is(this.props.grade, null)) {
      return (
        <ListItem style={{ paddingLeft: 0 }}>
          <ListItemText primary="N/A" />
        </ListItem>
      )
    } else {
      return (
        <ListItem style={{ paddingLeft: 0 }}>
          <ListItemText primary={this.props.grade.grade} />
        </ListItem>
      )
    }
  }

  render() {
    return (
      <List>
        {" "}{this.getGrade()}
      </List>
    )
  }
}

AdvisingGrade.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(
  translate("view", { wait: true })(AdvisingGrade)
)
