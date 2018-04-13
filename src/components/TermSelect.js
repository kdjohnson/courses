// @flow weak

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { withStyles } from 'material-ui/styles'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
import Input, { InputLabel } from 'material-ui/Input'

const styles = theme => ({
  text: {
    color: '#FFFFFF'
  },

  button: {
    marginRight: '1em',
    color: '#FFFFFF'
  },

  header: {
    backgroundColor: theme.palette.primary.main
  },

  title: {
    fontWeight: 600,
    color: theme.palette.primary.contrastText
  },

  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },

  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },

  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },

  inputRoot: {
    color: 'white',
    underline: {
      '&before': {
        backgroundColor: 'white'
      }
    }
  },

  select: {
    '&:focus': {
      color: 'white'
    }
  },

  selectIcon: {
    color: 'white'
  },

  underline: {
    '&:before': {
      backgroundColor: 'white'
    },

    '&:after': {
      backgroundColor: 'white'
    }
  }
})

class TermSelect extends Component {
  componentDidMount() {
    this.setState({
      selected: this.props.currentTermDescription,
      selectedValue: this.props.currentTermCode
    })
  }
  state = {
    selected: this.props.currentTermDescription,
    selectedValue: this.props.currentTermCode,
    open: false
  }

  getTerms = () => {
    const { terms } = this.props
    let items = terms.map(term => {
      return (
        <MenuItem key={term.code} value={term.code}>
          {term.description}
        </MenuItem>
      )
    })
    return items
  }

  handleChange = event => {
    let new_term = null
    for (const term of this.props.terms) {
      if (Object.is(term.code, event.target.value)) {
        new_term = term
        this.setState({
          selected: term.description,
          selectedValue: event.target.value,
          open: false
        })
        new_term = term
      }
    }
    this.props.updateTerm(new_term)
  }

  render() {
    const classes = this.props.classes
    const { selectedValue } = this.state
    if (Object.is(this.props.terms, null)) {
      return <div />
    } else {
      return (
        <div>
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <Select
                value={selectedValue}
                onChange={this.handleChange}
                autoWidth={true}
                classes={{
                  select: classes.select,
                  icon: classes.selectIcon,
                  underline: classes.selectUnderline
                }}
                input={
                  <Input
                    id="terms-dropdown"
                    name="terms"
                    classes={{
                      root: classes.inputRoot,
                      underline: classes.underline
                    }}
                  />
                }
              >
                {this.getTerms()}
              </Select>
            </FormControl>
          </form>
        </div>
      )
    }
  }
}

TermSelect.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: 'TermSelect' })(
  translate('view', { wait: true })(TermSelect)
)
