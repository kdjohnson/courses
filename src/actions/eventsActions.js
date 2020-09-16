import { get_events } from '../api/api'

const events_url = '/v1/events/'

export function fetch_events(term) {
  return function (dispatch) {
    dispatch({ type: 'FETCH_EVENTS_START', payload: {} })
    get_events(term, events_url)
      .then((data) => {
        dispatch({ type: 'RECEIVE_EVENTS', payload: data })
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_EVENTS_ERROR', payload: err })
      })
  }
}
