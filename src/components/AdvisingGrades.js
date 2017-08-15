import React, { Component } from "react"
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table"
import { withStyles } from "material-ui/styles"
import { getCredits } from "./../api/api"
import PropTypes from "prop-types"
import { translate } from "react-i18next"

const styles = theme => ({
  tableHeader: {
    color: "rgba(0, 0, 0, 1)",
    fontWeight: 600,
    fontSize: 14
  }
})

class AdvisingGrades extends Component {
  state = {
    creditsObj: null
  }

  componentDidMount() {
    getCredits(this.props.gradesURL).then(credits => {
      this.setState({ creditsObj: credits })
    })
  }

  getRows = creditsObj => {
    let rows = []
    let i = 0
    for (let cr of creditsObj) {
      rows.push(
        <TableRow key={i}>
          <TableCell>
            {cr.level}
          </TableCell>
          <TableCell>
            {cr.credits}
          </TableCell>
          <TableCell>
            {cr.gpa}
          </TableCell>
        </TableRow>
      )
      i++
    }
    return rows
  }

  render() {
    if (!Object.is(this.state.creditsObj, null)) {
      const { t } = this.props
      const classes = this.props.classes
      return (
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeader}>
              <TableCell scope="col">
                {t("level", {})}
              </TableCell>
              <TableCell scope="col">
                {t("credits", {})}
              </TableCell>
              <TableCell scope="col">GPA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.getRows(this.state.creditsObj)}
          </TableBody>
        </Table>
      )
    } else {
      return <div />
    }
  }
}

AdvisingGrades.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: "AdvisingGrades" })(
  translate("view", { wait: true })(AdvisingGrades)
)
