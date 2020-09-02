import { get_courses } from '../api/api'

const courses_url = '/v1/courses/'

export function fetch_selected_courses(selected_term) {
  return function (dispatch) {
    dispatch({ type: 'FETCH_SELECTED_COURSES_START', payload: {} })
    get_courses(selected_term.code, courses_url)
      .then((data) => {
        dispatch({
          type: 'RECEIVE_SELECTED_COURSES',
          payload: { data, selected_term },
        })
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_SELECTED_COURSES_ERROR', payload: err })
      })
  }
}

export function update_term(selected_term) {
  return function (dispatch) {
    dispatch({ type: 'UPDATE_TERM', payload: selected_term })
  }
}
