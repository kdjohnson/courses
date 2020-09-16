import React, { useState, useEffect } from 'react'

import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/styles'
import { update_term } from './../actions/termActions'
import { useSelector, useDispatch } from 'react-redux'
import { fetch_events } from '../actions/eventsActions'
import { fetch_selected_courses } from '../actions/termActions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(),
    minWidth: 120,
  },
  input: {
    paddingBottom: 2,
    paddingLeft: 10,
  },
  inputRoot: {
    color: 'white',
    underline: {
      '&before': {
        borderBottomColor: 'white',
      },
    },
  },
  select: {
    '&:focus': {
      color: 'white',
    },
  },
  selectIcon: {
    color: 'white',
  },
  underline: {
    '&:before': {
      borderBottomColor: 'white',
    },
    '&:after': {
      borderBottomColor: 'white',
    },
  },
}))

export default function TermSelect() {
  const selected_term = useSelector((state) => state.selected_term)
  const terms = useSelector((state) => state.terms)
  const [selectedTerm, setSelectedTerm] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    if (selected_term !== null) {
      setSelectedTerm(selected_term)
    }
  }, [selected_term])

  const handleChange = (event) => {
    terms.forEach((term) => {
      if (term.code === event.target.value) {
        dispatch(update_term(term))
        setSelectedTerm(term)
        dispatch(fetch_selected_courses(term))
        dispatch(fetch_events(term.code))
      }
    })
  }

  return (
    <div>
      <form className={classes.root} autoComplete='off'>
        <FormControl className={classes.formControl}>
          {selectedTerm && (
            <Select
              value={selectedTerm.code}
              onChange={handleChange}
              autoWidth={true}
              classes={{
                select: classes.select,
                icon: classes.selectIcon,
                root: classes.input,
              }}
              input={
                <Input
                  id='terms-dropdown'
                  name='terms'
                  classes={{
                    root: classes.inputRoot,
                    underline: classes.underline,
                  }}
                />
              }
            >
              {terms.map((term) => (
                <MenuItem key={term.code} value={term.code}>
                  {term.description}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      </form>
    </div>
  )
}
