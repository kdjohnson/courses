import React, { useState } from 'react';
import { useAppSelector } from '../hooks';

import AppBar from '@material-ui/core/AppBar';
import Assignment from '@material-ui/icons/Assignment';
import BuyBooks from './BuyBooks';
import Calendar from './Calendar';
import Courses from './Courses';
import Event from '@material-ui/icons/Event';
import Grades from './Grades';
import Paper from '@material-ui/core/Paper';
import PrintCourses from './PrintCourses';
import Spellcheck from '@material-ui/icons/Spellcheck';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TermSelect from './TermSelect';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, useTheme } from '@material-ui/core';

import { useGetDataQuery } from '../api/dataApi';
import ErrorMessages from './ErrorMessages';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: 0,
  },
  tab: {
    '@media (min-width: 1024px)': {
      minWidth: 72,
    },
  },
  flex: {
    flex: 1,
  },
  button: {
    color: '#FFFFFF',
  },
  bar: {
    flexDirection: 'column',
  },
  btnContainer: {
    display: 'flex',
  },

  loading: {
    display: 'flex',
    padding: '1em',
    justifyContent: 'center',
  },
}));

export default function CoursesTabs() {
  const [value, setValue] = useState(0);
  const { code, start, end } = useAppSelector((state) => state.selectedTerm);

  const { data, isFetching, isError } = useGetDataQuery(code);

  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  if (isError) {
    return <ErrorMessages />;
  }

  return (
    <Paper>
      <AppBar position='static'>
        <Toolbar disableGutters={true} className={mobile ? classes.bar : classes.root}>
          {mobile && (
            <Tabs
              className={classes.flex}
              value={value}
              onChange={(_event, value) => setValue(value)}
            >
              <Tab
                aria-label='courses'
                title='Courses'
                className={classes.tab}
                icon={
                  <Assignment
                    htmlColor={classes.button}
                    titleAccess='View your courses for the selected term'
                  />
                }
                tabIndex={0}
              />
              <Tab
                aria-label='calendar'
                title='Calendar'
                className={classes.tab}
                icon={<Event htmlColor={classes.button} titleAccess='View your calendar events' />}
                tabIndex={0}
              />
              <Tab
                aria-label='grades'
                title='Grades'
                className={classes.tab}
                icon={<Spellcheck htmlColor={classes.button} titleAccess='View your grades' />}
                tabIndex={0}
              />
            </Tabs>
          )}
          {!mobile && (
            <Tabs
              className={classes.flex}
              value={value}
              onChange={(_event, value) => setValue(value)}
            >
              <Tab label='Courses' tabIndex={0} />
              <Tab label='Calendar' tabIndex={0} />
              <Tab label='Grades' tabIndex={0} />
            </Tabs>
          )}
          {data !== undefined && <TermSelect terms={data.terms} />}
        </Toolbar>
      </AppBar>
      <>
        {isFetching && (
          <div className={classes.loading}>
            <CircularProgress className={classes.loading} color='secondary' size={50} />
          </div>
        )}
        {value === 0 && (
          <>
            {!isFetching && data !== undefined && (
              <>
                <div className={classes.btnContainer}>
                  <BuyBooks books={data.books} />
                  <PrintCourses />
                </div>
                <div className={classes.loading}>
                  <Courses courses={data.courses} />
                </div>
              </>
            )}
          </>
        )}
        {value === 1 && <Calendar mobile={mobile} code={code} start={start} end={end} />}
        {value === 2 && (
          <>
            {!isFetching && data !== undefined && (
              <>
                <Grades courses={data.courses} credits={data.credits} />
              </>
            )}
          </>
        )}
      </>
    </Paper>
  );
}
