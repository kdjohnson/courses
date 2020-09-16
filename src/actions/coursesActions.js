import { get_courses } from '../api/api'

const courses_url = '/v1/courses/'

export function fetch_courses(term) {
  return function (dispatch) {
    dispatch({ type: 'FETCH_COURSES_START', payload: {} })
    get_courses(term, courses_url)
      .then((data) => {
        dispatch({ type: 'RECEIVE_COURSES', payload: data })
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_COURSES_ERROR', payload: err })
      })
  }
}
