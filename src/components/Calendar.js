import React, { useRef, useState } from 'react'

// This needs to be imported before any plugins
import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'
import ErrorMessages from './ErrorMessages'
import listPlugin from '@fullcalendar/list'
import Popover from '@material-ui/core/Popover'
import timeGridPlugin from '@fullcalendar/timegrid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import '../Calendar.css'

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
}))

export default function Calendar(props) {
  const classes = useStyles()

  const [data, set_data] = useState(null)
  const [anchor, set_anchor] = useState(null)
  const events = useSelector((state) => state.events)
  const events_error = useSelector((state) => state.error)
  const term_bounds = useSelector((state) => state.term_bounds)
  const ref = useRef()
  const { mobile } = props

  const initialView = mobile ? 'listWeek' : 'timeGridWeek'
  const open = Boolean(anchor)

  if (events_error) {
    return (
      <div className={classes.error}>
        <ErrorMessages />
      </div>
    )
  } else if (events.length === 0) {
    return <Typography className={classes.empty}>No events to display</Typography>
  }

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
          events={events}
          dayMaxEventRows={true}
          eventClick={(info) => {
            set_data(
              <div className={classes.popover}>
                <Typography className={classes.title}>{info.event.title}</Typography>
                <Typography>{info.event.extendedProps.desc}</Typography>
                <Typography>
                  {info.event.extendedProps.startTime} -{info.event.extendedProps.endTime}
                </Typography>
                <Typography>{info.event.extendedProps.location}</Typography>
              </div>
            )
            set_anchor(ref.current)
          }}
          validRange={{
            start: term_bounds[0],
            end: term_bounds[1],
          }}
        />
      </div>
      <Popover
        open={open}
        anchorEl={anchor}
        onClose={() => set_anchor(null)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        {data}
      </Popover>
    </>
  )
}
