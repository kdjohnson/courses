import React from 'react';

import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/Print';
import { generate_pdf } from '../api/api';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector } from '../hooks';

const useStyles = makeStyles(() => ({
  icon: {
    paddingLeft: 5,
    marginTop: -6,
  },
  button: {
    paddingTop: 10,
    marginLeft: '1em',
  },
}));

export default function PrintCourses() {
  const classes = useStyles();
  const { code } = useAppSelector((state) => state.selectedTerm);

  const handleClick = () => {
    console.log(code);
    generate_pdf(code);
  };

  return (
    <Button
      color='secondary'
      title='Print Courses'
      variant='contained'
      tabIndex='0'
      className={classes.button}
      onClick={handleClick}
    >
      Print Courses
      <PrintIcon className={classes.icon} />
    </Button>
  );
}
