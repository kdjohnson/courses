import React, { useState } from 'react'

import Popover from '@material-ui/core/Popover'
import ErrorMessages from './ErrorMessages'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'

import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'

import '../Calendar.css'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '10px 20px 20px 20px',
    fontFamily: 'Arimo',
    marginBottom: 20
  },
  error: {
    display: 'flex',
    justifyContent: 'center'
  },
  popover: {
    padding: 20,
    textAlign: 'center'
  },
  title: {
    fontWeight: 'bolder',
    paddingBottom: 5
  }
}))

export default function Calendar(props) {
  const classes = useStyles()

  const [data, set_data] = useState(null)
  const [open, set_open] = useState(false)
  const events = useSelector(state => state.events)
  const events_error = useSelector(state => state.error)
  const term_bounds = useSelector(state => state.term_bounds)
  const { mobile } = props

  const initialView = mobile ? "listWeek" : "timeGridWeek"

  if (events.length === 0 || events_error) {
    return (
      <div className={classes.error}>
        <ErrorMessages />
      </div>
    )
  }

  return (
    <>
    <div className={classes.root}>
      <FullCalendar
        plugins={[ dayGridPlugin, listPlugin, timeGridPlugin ]}
        initialView={initialView}
        headerToolbar={{
          start: 'title',
          center: '',
          end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        footerToolbar={{
          start: 'today',
          center: '',
          end: 'prev,next'
        }}
        allDaySlot={false}
        views={{
          dayGridMonth: {
            titleFormat: {
              year: 'numeric',
              month: 'long'
            }
          },
          timeGridWeek: {
            titleFormat: {
              month: 'short',
              day: 'numeric'
            }
          },
          timeGridDay: {
            titleFormat: {
              month: 'long',
              day: 'numeric'
            }
          },
          listWeek: {
            titleFormat: {
              month: 'short',
              day: 'numeric'
            }
          }
        }}
        buttonText={{
          today: 'Today',
          dayGridMonth: 'Month',
          timeGridWeek: 'Week',
          timeGridDay: 'Day',
          listWeek: 'List'
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
                {info.event.extendedProps.startTime} - 
                {info.event.extendedProps.endTime}
              </Typography>
              <Typography>{info.event.extendedProps.location}</Typography>
            </div>
          )
          set_open(true)
        }}
        validRange={{
          start: term_bounds[0],
          end: term_bounds[1]
        }}
      />
    </div>
    <Popover
      open={open}
      onClose={() => set_open(false)}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center'
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
