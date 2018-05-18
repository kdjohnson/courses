// @flow weak

import React from 'react'
import { connect } from 'react-redux'
import { fetch_courses } from './../actions/coursesActions'
import { set_current_term } from './../actions/termsActions'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import { withStyles } from '@material-ui/core/styles'

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
        borderBottomColor: 'white'
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
      borderBottomColor: 'white'
    },

    '&:after': {
      borderBottomColor: 'white'
    }
  }
})

class TermSelect extends React.Component {
  state = {
    selected: '',
    selectedValue: '',
    open: false
  }
  componentDidMount() {
    const { current_term } = this.props
    this.setState({
      selected: current_term.description,
      selectedValue: current_term.code
    })
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
    const { terms } = this.props
    let new_term = null
    for (const term of terms) {
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

    this.props.set_current_term(new_term)
    this.props.fetch_courses(new_term)
  }

  render() {
    const { classes, terms } = this.props
    const { selectedValue } = this.state
    if (Object.is(terms, null)) {
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
                  icon: classes.selectIcon
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

const mapStateToProps = state => ({
  current_term: state.terms.current_term,
  terms: state.terms.terms
})

const mapDispatchToProps = dispatch => {
  return {
    fetch_courses: new_term => dispatch(fetch_courses(new_term)),
    set_current_term: new_term => dispatch(set_current_term(new_term))
  }
}

export default withStyles(styles, { name: 'TermSelect' })(
  translate('view', { wait: true })(
    connect(mapStateToProps, mapDispatchToProps)(TermSelect)
  )
)
