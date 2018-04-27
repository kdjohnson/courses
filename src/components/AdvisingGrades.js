import React, { Component } from 'react'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetch_credits } from './../actions/creditsActions'
import { translate } from 'react-i18next'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  tableHeader: {
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: 600,
    fontSize: 14
  }
})

class AdvisingGrades extends Component {
  state = {
    creditsObj: null
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.props.fetch_credits
  }

  getRows = creditsObj => {
    let rows = []
    let i = 0
    for (let cr of creditsObj) {
      rows.push(
        <TableRow key={i}>
          <TableCell>{cr.level}</TableCell>
          <TableCell>{cr.credits}</TableCell>
          <TableCell>{cr.gpa}</TableCell>
        </TableRow>
      )
      i++
    }
    return rows
  }

  render() {
    //const { creditsObj } = this.state
    const { classes, credits, credits_fetched, t } = this.props
    if (credits_fetched === true) {
      return (
        <Table>
          <TableHead>
            <TableRow className={classes.tableHeader}>
              <TableCell scope="col">{t('level', {})}</TableCell>
              <TableCell scope="col">{t('credits', {})}</TableCell>
              <TableCell scope="col">GPA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.getRows(credits)}</TableBody>
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

const mapStateToProps = state => ({
  credits: state.credits.credits,
  credits_fetched: state.credits.fetched
})

const mapDispatchToProps = dispatch => {
  return {
    fetch_credits: dispatch(fetch_credits())
  }
}

export default withStyles(styles, { name: 'AdvisingGrades' })(
  translate('view', { wait: true })(
    connect(mapStateToProps, mapDispatchToProps)(AdvisingGrades)
  )
)
