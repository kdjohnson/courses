import { get_courses } from '../api/api'
const courses_url = 'http://localhost:8082/api/courses'

export function fetch_courses(new_term) {
  return function(dispatch) {
    dispatch({ type: 'FETCH_COURSES_START', payload: {} })
    get_courses(new_term, courses_url)
      .then(courses => {
        dispatch({ type: 'RECEIVE_COURSES', payload: courses })
      })
      .catch(err => {
        dispatch({ type: 'FETCH_COURSES_ERROR', payload: err })
      })
  }
}