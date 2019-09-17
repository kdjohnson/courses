import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetch_courses } from './../actions/coursesActions'
import { set_current_term } from './../actions/termsActions'

import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
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
    margin: theme.spacing(),
    minWidth: 120
  },

  selectEmpty: {
    marginTop: theme.spacing(2)
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
}))

const getTerms = terms => {
  let items = terms.map(term => {
    return (
      <MenuItem key={term.code} value={term.code}>
        {term.description}
      </MenuItem>
    )
  })
  return items
}


export default function TermSelect() {
  const current_term = useSelector(state => state.terms.current_term)
  const terms = useSelector(state => state.terms.terms)
  const [selectedValue, setSelectedValue] = useState('')
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    if (current_term !== null) {
      setSelectedValue(current_term.code)
    }
  }, [current_term])


  function handleChange(event) {
    let new_term = null

    // only update as needed
    if (event.target.value !== selectedValue) {
      for (let [_index, term] of terms.entries()) {
        if (term.code === event.target.value) {
          setSelectedValue(oldValues => ({
            ...oldValues,
            [event.target.value]: event.target.value
          }));
          new_term = term
        }
      }

      dispatch(fetch_courses(new_term))
      dispatch(set_current_term(new_term))
    }
  }

  return (
    <div>
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            value={selectedValue}
            onChange={handleChange}
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
            {getTerms(terms)}
          </Select>
        </FormControl>
      </form>
    </div>
  )
}