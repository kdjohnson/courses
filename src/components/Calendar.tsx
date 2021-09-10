import React, { useRef, useState } from 'react';
import type { RootState } from './../store';

// This needs to be imported before any plugins
import FullCalendar from '@fullcalendar/react';

import dayGridPlugin from '@fullcalendar/daygrid';
import ErrorMessages from './ErrorMessages';
import listPlugin from '@fullcalendar/list';
import Popover from '@material-ui/core/Popover';
import timeGridPlugin from '@fullcalendar/timegrid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import '../Calendar.css';
import { useGetEventsQuery } from '../api/dataApi';
import { CircularProgress } from '@material-ui/core';

interface CalendarProps {
  mobile: boolean;
  code: number;
  start: string;
  end: string;
}

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px 20px 20px 20px',
    fontFamily: 'Arimo',
    marginBottom: 20,
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
  },
  popover: {
    padding: 20,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bolder',
    paddingBottom: 5,
  },
  empty: {
    textAlign: 'center',
  },
  loading: {
    display: 'flex',
    padding: '1em',
    justifyContent: 'center',
  },
}));

export default function Calendar(props: CalendarProps) {
  const classes = useStyles();

  const [calData, setCalData] = useState(<></>);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const { mobile, code, start, end } = props;
  const { data, isFetching, isError } = useGetEventsQuery(code);

  const initialView = mobile ? 'listWeek' : 'timeGridWeek';

  if (isFetching) {
    return (
      <div className={classes.loading}>
        <CircularProgress className={classes.loading} color='secondary' size={50} />
      </div>
    );
  }

  if (isError || data === undefined) {
    return (
      <div className={classes.error}>
        <ErrorMessages />
      </div>
    );
  }

    console.log(data.events)

  return (
    <>
      <div ref={ref} className={classes.root}>
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
          initialView={initialView}
          headerToolbar={{
            start: 'title',
            center: '',
            end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          }}
          footerToolbar={{
            start: 'today',
            center: '',
            end: 'prev,next',
          }}
          allDaySlot={false}
          views={{
            dayGridMonth: {
              titleFormat: {
                year: 'numeric',
                month: 'long',
              },
            },
            timeGridWeek: {
              titleFormat: {
                month: 'short',
                day: 'numeric',
              },
            },
            timeGridDay: {
              titleFormat: {
                month: 'long',
                day: 'numeric',
              },
            },
            listWeek: {
              titleFormat: {
                month: 'short',
                day: 'numeric',
              },
            },
          }}
          buttonText={{
            today: 'Today',
            dayGridMonth: 'Month',
            timeGridWeek: 'Week',
            timeGridDay: 'Day',
            listWeek: 'List',
          }}
          weekNumbers={true}
          nowIndicator={true}
          events={data.events}
          dayMaxEventRows={true}
          eventClick={(info) => {
            setCalData(
              <div className={classes.popover}>
                <Typography className={classes.title}>{info.event.title}</Typography>
                <Typography>{info.event.extendedProps.desc}</Typography>
                <Typography>
                  {info.event.extendedProps.startTime} -{info.event.extendedProps.endTime}
                </Typography>
                <Typography>{info.event.extendedProps.location}</Typography>
              </div>
            );
            // setAnchorEl(ref.current);
          }}
          validRange={{
            start: start,
            end: end,
          }}
        />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {data}
      </Popover>
    </>
  );
}
