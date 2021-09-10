import React, { useState } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { Term } from '../types';
import { useAppDispatch } from '../hooks';
import { updateTerm } from '../reducers/selectedTermSlice';

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
}));

interface TermSelectProps {
  terms: Term[];
}

export default function TermSelect(props: TermSelectProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { terms } = props;
  const currentTerm = terms.filter((term) => term.current)[0];
  const [selectedTermCode, setSelectedTerm] = useState(currentTerm.code);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    terms.forEach((term) => {
      if (term.code === (event.target.value as number)) {
        setSelectedTerm(term.code);
        dispatch(updateTerm(term));
      }
    });
  };

  return (
    <form className={classes.root} autoComplete='off'>
      <FormControl className={classes.formControl}>
        {
          <Select
            value={selectedTermCode}
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
        }
      </FormControl>
    </form>
  );
}
